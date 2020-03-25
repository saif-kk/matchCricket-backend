var router = require('express').Router();
var matchRouteController = require('./match.routes');

router.post('/api/match/addcountry', matchRouteController.createCountry);
router.get('/api/match/getcountry', matchRouteController.getCountry);
router.post('/api/match/addteam', matchRouteController.addTeam);
router.get('/api/match/getteam', matchRouteController.getTeamAll);
router.post('/api/match/addplayer', matchRouteController.addPlayer);
router.get('/api/match/getplayer', matchRouteController.getPlayer);
router.post('/api/match/addvenue', matchRouteController.addVenue);
router.get('/api/match/getvenue', matchRouteController.getVenue);
router.post('/api/match/creatematches', matchRouteController.createMatches);
router.patch('/api/match/updatescore', matchRouteController.updateMatchesScore);
router.get('/api/match/getmatches', matchRouteController.getMatches);
router.patch('/api/match/endMatch', matchRouteController.endMatch);
router.get('/api/match/resultall', matchRouteController.getmatchResult)

module.exports = router;
