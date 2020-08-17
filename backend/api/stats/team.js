const express = require('express');
const router = express.Router()
const mongoose = require('mongoose');

const TeamSchema = require('../../models/Team');

router.get('/:year/:team', (req, res) => {

    let Team = mongoose.model(req.params.year, TeamSchema, req.params.year)

    Team.find({name: req.params.team.toUpperCase()})
        .then(Team => res.json(Team))
        .catch(err => console.log(err))
})

module.exports = router