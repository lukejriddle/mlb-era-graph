const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const activeYearsSchema = new Schema({
    name: String,
    years: [Number]
})

module.exports = mongoose.model("ActiveYears", activeYearsSchema, "ActiveYears")