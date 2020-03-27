var countryModel = require('../models/countries.models');
var playerModel = require('../models/players.models');
var teamModel = require('../models/teams.models');
var venueModel = require('../models/venue.models');
var matchModel = require('../models/matches.models');
var resultModel = require('../models/result.models');
var _ = require('underscore');

var CustomError = require('../constant/CustomError');

var matchController = (function (){
    return{
        addCountry: function(country){
            return countryModel.find({"country" : country})
            .then( function (result){
                if(result && result.length > 0) throw new CustomError('this Country is already been added');

                let countryN = {
                    "country" : country
                }

                return new countryModel(countryN).save();
            })
            .then( function(data){
                return data
            })
        },

        getCountry: function(){
            return countryModel.find({})
            .then(function (result){
                return result
            })
        },

        addTeam : function (teamObj){
            return teamModel.findOne({"teamName": teamObj.teamName, "country" : teamObj.country})
            .then( function(data){
                if (data) throw new CustomError ('This team already exist');

                let teamObjData = {
                    "country": teamObj.country,
                    "teamRank": teamObj.teamRank,
                    "teamName": teamObj.teamName,
                    "played": teamObj.played,
                    "won": teamObj.won,
                    "lost": teamObj.lost,
                    "point": teamObj.point
                }

                return new teamModel(teamObjData).save();
            }).then( function (result){
                return result
            })
        },

        getTeamAll : function (isParticipate){
            let param = ""
            if(isParticipate == 'all'){
                param = {}
            }else{
                param = {'isParticipating' : isParticipate }
            }
           
            return teamModel.find(param)
            .populate('country')
            .then( function (teams) {
                return teams;
            })
        },

        addPlayer: function (dataObj){
            return playerModel.findOne({playerNo: dataObj.playerNo, team: dataObj.team})
            .then(function(result){
                if(result) throw new CustomError('player is already been added')

                let newPlayer = {
                    "name": dataObj.name,
                    "team": dataObj.team,
                    "playerNo": dataObj.playerNo,
                    "age": dataObj.age,
                    "playingType": dataObj.playingType,
                    "totalRun": dataObj.totalRun,
                    "wicketTaken": dataObj.wicketTaken,
                    "runRate": dataObj.runRate,
                    "matchPlayed": dataObj.matchPlayed
                }

                return new playerModel(newPlayer).save()
            }).then(function (player){
                return player
            })
        },

        getPlayer: function(teamId, playerId){
            let param = "";
            if(teamId) param = playerModel.find({"team" : teamId});
            if(playerId) param = playerModel.findOne({"_id" : playerId});

            return param
            .populate({path: 'userId'})
            .then( function (result){
                return result
            })
        },

        addVenue: function(venueObj){
            return venueModel.findOne({"venueName": venueObj.venueName, "country": venueObj.country})
            .then(function (data){
                if(data && data.length > 0) throw new CustomError(' thie venue is already been added')

                let venueData = {
                    "venueName": venueObj.venueName,
                    "country" : venueObj.country,
                    "venuePlace" : venueObj.venuePlace,
                    "capacity": venueObj.capacity
                }

                return new venueModel(venueData).save()
            }).then( function(result){
                return result
            })
        },

        getVenue: function(){
            return venueModel.find()
            .then(function (result){
                return result;
            })
        },

        createMatches: function (matchObj){
            return matchModel.find({"matchNo": matchObj.matchNo, "time": matchObj.time, "venue": matchObj.venue})
            .then( function (data){
                if(data && data.length > 0) throw new CustomError('The Match no. laready exist');

                let matchData = {
                    "venue": matchObj.venue,
                    "matchNo": matchObj.matchNo,
                    "team1": {
                        "team" : matchObj.team1,
                    }, 
                    "team2": {
                        "team" : matchObj.team2,
                    }, 
                    "time": matchObj.time,
                    "summary": matchObj.summary
                }

                return new matchModel(matchData).save()
            })
            .then( function (result){
                return result
            })
        },

        updateMatchesScore: function (id, matchUObj){
            return matchModel.findOne({'_id' : id, 'isCompleted' : { $ne: 1 }})
            .then(function (data){
                if(!data) throw new CustomError ('No matches found for this Id');
                if(matchUObj.team1.playing == matchUObj.team2.playing) throw new CustomError ('error have set the same inings for noth team');

                var matchData = {
                    "team1.playing": matchUObj.team1.playing ,
                    "team1.score": matchUObj.team1.score,
                    "team1.players":  matchUObj.team1.players,
                    "team2.playing": matchUObj.team2.playing,
                    "team2.score": matchUObj.team2.score,
                    "team2.players":  matchUObj.team2.players,
                    "isCompleted": 2,
                }
                return  matchModel.findOneAndUpdate({ _id: id },{$set: matchData}, { new: true })
            }).then( function (result){
                    return result
            })
        },

        getMatches: function (isCompleted){
            let param = "";
            if(isCompleted) param = {"isCompleted" : isCompleted}
            else param = {}

            return matchModel.find(param)
            .populate({
                path: 'team1.team',
                select: 'teamName teamRank'
            })
            .populate({
                path: 'team2.team',
                select: 'teamName teamRank'
            })
            .populate('venue')
            .then( function (result){
                return result
            })
        },

        endMatch: function (id){
            return matchModel.findOne({'_id' : id, 'isCompleted' : 0})
            .then(function (data){
                if(!data) throw new CustomError ('No matches found for this Id or the match result have been saved');
                
                return  matchModel.findOneAndUpdate({ _id: id },{$set: {isCompleted: 1}}, { new: true })
            }).then( function (result){
                function operationPlay(){
                    if(result.team1.score > result.team2.score) {var teamW = result.team1.score; var winingteam =  result.team1.team; var win1 = 1; var loss1 = 0; var point1 = 2}else  {var losingTeam =  result.team1.team; var win1 = 0; var loss1 = 1; var point1 = 0}
                    if(result.team1.score < result.team2.score) {var teamW = result.team2.score;  var winingteam =  result.team2.team; var win2 = 1; var loss2 = 0; var point2 = 2}else  {var losingTeam =  result.team2.team; var win2 = 0; var loss2 = 1;var point2 = 0}

                    teamModel.updateOne({ _id: result.team1.team}, { $inc: {won:  win1, lost: loss1, point: point1, played: 1}}, {new:true}).then( function (data){ console.log(data)});
                    teamModel.updateOne({ _id: result.team2.team}, { $inc: {won:  win2, lost: loss2, point: point2, played: 1}}, {new:true}).then( function (data){ console.log(data)});

                    let resultData = {
                        "matchNo": result._id,
                        "winingTeam": winingteam, //add +2 in point in Team
                        "losingTeam": losingTeam, // add 0 in point in Team
                        "winingTeamScore": teamW
                    }

                    resultModel(resultData).save().then( function (data){ console.log(data)}); // creating result Data

                    _.forEach(result.team1.players, function (players1) {
                        console.log(players1.player)
                        playerModel.updateOne({ _id: players1.player}, { $inc: {totalRun:  players1.run}}, {new:true}).then( function (data){ console.log(data)});
                    })
                    
                    _.forEach(result.team2.players, function (players2) {
                        console.log(players2.player)
                        playerModel.updateOne({_id: players2.player}, { $inc: {totalRun:  players2.run, wicketTaken: players2.wickets}}, {new:true}).then( function (data){ console.log(data)});
                    })
                }
                
               operationPlay();
            })
        },
    
        getmatchResult: function (){
            return resultModel.find()
            .populate('matchNo')
            .populate('winingTeam')
            .populate('losingTeam')
            .then( function (result){
                return result
            })
        }
    }
})();

module.exports = matchController