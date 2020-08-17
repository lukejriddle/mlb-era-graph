const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const yearSchema = new Schema({
    year: Number,
    teams: [{
        name: String,
        rotation_era: Number,
        bullpen_era: Number,
        url: String,
        team_name: String
    }],
    rotation_avg: Number,
    bullpen_avg: Number
})
module.exports = mongoose.model("League", yearSchema, "League")