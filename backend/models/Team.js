const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const yearSchema = new Schema({
    name: String,
    rotation_avg: Number,
    bullpen_avg: Number,
    url: String,
    team_name: String,
    player_stats: [{
        name: String,
        pos: String,
        ip: Number,
        era: Number
    }]

})
module.exports = yearSchema