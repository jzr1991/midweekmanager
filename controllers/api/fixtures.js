var Team = require('../../models/team');
var Fixture = require('../../models/fixture');
var router = require('express').Router();

// \\ ** FIXTURE API ENDPOINT ** \\ //

router.get('/', function (req, res, next) {
  // if (!req.headers['x-auth']) {
  //   return res.sendStatus(401)
  // }
  // if (req.auth.username) {
    Fixture.find()
    .sort('-date')
    .exec(function (err, fixtures) {
      if (err) { return next(err) }
      res.json(fixtures)
    })
  // }
  // else {
  //   res.status(401)
  // }
})

router.post('/', function (req, res, next) {
//  if (!req.headers['x-auth']) {
  //  return res.sendStatus(401)
//  }
//  if (req.auth.username) {
    var fixture = new Fixture({
      opposition: req.body.opposition,
      fixturedate: req.body.fixturedate
    })
    fixture.save(function (err, fix) {
      if (err) { return next(err) }
      res.status(201).json(fix)
    })
//  }
  //else {
  //  res.status(401)
  //}
})

router.put('/player', function (req, res) {
  if (!req.headers['x-auth']) {
    return res.sendStatus(401)
  }
  if (req.auth.username) {
    Team.findByIdAndUpdate(
      req.body.team_id,
      {$push: {players: {_id: req.body.player_id}}},
      {new: true},
      function(err, doc){
        if(err){
          res.send(err)
        } else {
          res.json(doc)
        }
      })
    }
    else {
      res.status(401)
    }
  })

  router.get('/:team_id', (function(req, res) {
    if (!req.headers['x-auth']) {
      return res.sendStatus(401)
    }
    if (req.auth.username) {
      Team.findById(req.params.team_id, function(err, team) {
        if (err) { res.send(err) }
        res.json(team)
      })
    } else {
      res.status(401)
    }
  })
)

router.put('/:team_id', function(req, res) {
  if (!req.headers['x-auth']) {
    return res.sendStatus(401)
  }
  if (req.auth.username) {
    Team.findById(req.params.team_id, function(err, team) {
      if (err)
      res.send(err);

      team.username = req.body.username;
      team.body = req.body.body;

      team.save(function(err) {
        if (err) { res.send(err) }
        res.json({ message: 'Team updated!' });
      })
    })
  } else {
    res.status(401)
  }
})

router.delete('/:team_id', function(req, res) {
  Team.remove({
    _id: req.params.team_id
  }, function(err, team) {
    if (err)
    res.send(err);
    res.json({ message: 'Successfully deleted' });
  });
})

// \\ ** END OF TEAM SERVICE ** \\ //

module.exports = router;