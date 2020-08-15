const express = require('express');
const router = express.Router()

const Year = require('../../models/Year');

router.get('/:year', (req, res) => {
    Year.find({year: req.params.year})
        .then(Years => res.json(Years))
        .catch(err => console.log(err))
})

module.exports = router