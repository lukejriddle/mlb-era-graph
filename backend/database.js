const mongoose = require('mongoose');
require('dotenv').config({path:__dirname+'/./.env'})

const connection = process.env.DB_CONNECTION_STRING
mongoose.connect(connection,{ useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
    .then(() => console.log("Database Connected Successfully"))
    .catch(err => console.log(err));