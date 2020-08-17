const express = require('express');
const router = express.Router()

const League = require('../../models/LeagueStats');

router.get('/:year', (req, res) => {
    League.find({year: req.params.year})
        .then(League => res.json(League))
        .catch(err => console.log(err))
})

module.exports = router