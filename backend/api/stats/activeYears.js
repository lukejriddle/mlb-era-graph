const express = require('express');
const router = express.Router()

const ActiveYears = require('../../models/ActiveYears');

router.get('/:team', (req, res) => {
    ActiveYears.find({name: req.params.team})
        .then(Years => res.json(Years))
        .catch(err => console.log(err))
})

module.exports = router