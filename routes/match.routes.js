var matchController = require('../controllers/match.controller');
var errorCodeList = (require('../constant/error.constant').ERROR_CODE_LIST);
var errorHelper = require('../constant/error.helper');
var CustomError = require('../constant/CustomError');

var mainMatch = (function (){
    return {
        createCountry: function (req, res){
            try{
                var country = req.body.country;

                // console.log(name)
                if(!country) throw new InvalidValueError("country", "null", errorCodeList.InvalidValueError);

                return matchController.addCountry(country)
                .then(function (result) {
                    res.status(200).json({
                        status: "Success",
                        data: result
                    });
                })
                .then(undefined, function (err) {
                    if (err) console.log(err);
                    res.status(400).json(errorHelper.formatError(err));
                })
            } catch (err) {
                if (err) console.log(err);
                res.status(400).json(errorHelper.formatError(err));
            }
        },

        getCountry: function (req, res){
            try{
                return matchController.getCountry()
                .then(function (result) {
                    res.status(200).json({
                        status: "Success",
                        data: result
                    });
                })
                .then(undefined, function (err) {
                    if (err) console.log(err);
                    res.status(400).json(errorHelper.formatError(err));
                })
            }catch{
                if (err) console.log(err);
                res.status(400).json(errorHelper.formatError(err));
            }
        },

        addTeam: function(req, res){
            try{
               var teamObj = req.body;

               if(!teamObj.teamName) throw new InvalidValueError("teamName", "null", errorCodeList.InvalidValueError);
               if(!teamObj.country) throw new InvalidValueError("country", "null", errorCodeList.InvalidValueError);

               return matchController.addTeam(teamObj)
               .then(function (result) {
                   res.status(200).json({
                       status: "Success",
                       data: result
                   });
               })
               .then(undefined, function (err) {
                if (err) console.log(err);
                res.status(400).json(errorHelper.formatError(err));
               })
            }catch{
                if (err) console.log(err);
                res.status(400).json(errorHelper.formatError(err));
            }
        },

        getTeamAll: function(req, res){
            try{

                var isParticipate = req.query.isParticipating;
                
                return matchController.getTeamAll(isParticipate)
                .then(function (result) {
                    res.status(200).json({
                        status: "Success",
                        data: result
                    });
                })
                .then(undefined, function (err) {
                    if (err) console.log(err);
                    res.status(400).json(errorHelper.formatError(err));
                })
            }catch{
                if (err) console.log(err);
                res.status(400).json(errorHelper.formatError(err));
            }
        },

        addPlayer: function(req, res){
            try{
                var playerObj = req.body;

                if(!playerObj.name) throw new InvalidValueError("palyer name", "null", errorCodeList.InvalidValueError);
                if(!playerObj.team) throw new InvalidValueError("team", "null", errorCodeList.InvalidValueError);
 
                return matchController.addPlayer(playerObj)
                .then(function (result) {
                    res.status(200).json({
                        status: "Success",
                        data: result
                    });
                })
                .then(undefined, function (err) {
                    if (err) console.log(err);
                    res.status(400).json(errorHelper.formatError(err));
                })
            }catch{
                if (err) console.log(err);
                res.status(400).json(errorHelper.formatError(err));
            }
        },

        getPlayer: function(req, res){
            try{
                var teamId = req.query.teamId;
                var playerId = req.query.playerId;

                return matchController.getPlayer(teamId, playerId)
                .then(function (result) {
                    res.status(200).json({
                        status: "Success",
                        data: result
                    });
                })
                .then(undefined, function (err) {
                    if (err) console.log(err);
                    res.status(400).json(errorHelper.formatError(err));
                })
            }catch{
                if (err) console.log(err);
                res.status(400).json(errorHelper.formatError(err));
            }
        },

        addVenue: function(req, res){
            try{
                var venueObj = req.body;

                if(!venueObj.venueName) throw new InvalidValueError("venue name", "null", errorCodeList.InvalidValueError);

                return matchController.addVenue(venueObj)
                .then(function (result) {
                    res.status(200).json({
                        status: "Success",
                        data: result
                    });
                })
                .then(undefined, function (err) {
                    if (err) console.log(err);
                    res.status(400).json(errorHelper.formatError(err));
                })
            }catch{
                if (err) console.log(err);
                res.status(400).json(errorHelper.formatError(err));
            }
        },

        getVenue: function(req, res){
            try{
                return matchController.getVenue()
                .then(function (result) {
                    res.status(200).json({
                        status: "Success",
                        data: result
                    });
                })
                .then(undefined, function (err) {
                    if (err) console.log(err);
                    res.status(400).json(errorHelper.formatError(err));
                })
            }catch{
                if (err) console.log(err);
                res.status(400).json(errorHelper.formatError(err));
            }
        },

        createMatches: function(req, res){
            try{
                var matchesObj = req.body;

                if(!matchesObj.team1) throw new InvalidValueError("Team 1", "null", errorCodeList.InvalidValueError);
                if(!matchesObj.team2) throw new InvalidValueError("Team 2", "null", errorCodeList.InvalidValueError);
                if(!matchesObj.venue) throw new InvalidValueError("venue name", "null", errorCodeList.InvalidValueError);

                return matchController.createMatches(matchesObj)
                .then(function (result) {
                    res.status(200).json({
                        status: "Success",
                        data: result
                    });
                })
                .then(undefined, function (err) {
                    if (err) console.log(err);
                    res.status(400).json(errorHelper.formatError(err));
                })
            }catch{
                if (err) console.log(err);
                res.status(400).json(errorHelper.formatError(err));
            }
        },

        updateMatchesScore: function(req, res){
            try{
                var id = req.body.id;
                var matchesObj = req.body;

                if(!id) throw new InvalidValueError("Id", "null", errorCodeList.InvalidValueError);

                return matchController.updateMatchesScore(id, matchesObj)
                .then(function (result) {
                    res.status(200).json({
                        status: "Success",
                        data: result
                    });
                })
                .then(undefined, function (err) {
                    if (err) console.log(err);
                    res.status(400).json(errorHelper.formatError(err));
                })
            }catch{
                if (err) console.log(err);
                res.status(400).json(errorHelper.formatError(err));
            }
        },

        getMatches: function (req, res){
            try{
              var isCompleted = req.query.isCompleted;

                return matchController.getMatches(isCompleted)
                .then(function (result) {
                    res.status(200).json({
                        status: "Success",
                        data: result
                    });
                })
                .then(undefined, function (err) {
                    if (err) console.log(err);
                    res.status(400).json(errorHelper.formatError(err));
                })
            }catch{
                if (err) console.log(err);
                res.status(400).json(errorHelper.formatError(err));
            }
        },

        endMatch: function(req, res){
            try{
                var id = req.body.id;

                if(!id) throw new InvalidValueError("Id", "null", errorCodeList.InvalidValueError);

                return matchController.endMatch(id)
                .then(function (result) {
                    res.status(200).json({
                        status: "Success",
                        data: result
                    });
                })
                .then(undefined, function (err) {
                    if (err) console.log(err);
                    res.status(400).json(errorHelper.formatError(err));
                })
            }catch{
                if (err) console.log(err);
                res.status(400).json(errorHelper.formatError(err));
            }
        },

        getmatchResult: function (req, res){
            try{
            return matchController.getmatchResult()
                .then(function (result) {
                    res.status(200).json({
                        status: "Success",
                        data: result
                    });
                })
                .then(undefined, function (err) {
                    if (err) console.log(err);
                    res.status(400).json(errorHelper.formatError(err));
                })
            }catch{
                if (err) console.log(err);
                res.status(400).json(errorHelper.formatError(err));
            }
        }

    }
})();

module.exports = mainMatch