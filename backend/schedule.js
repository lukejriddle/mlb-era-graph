const schedule =  require('node-schedule')
require('dotenv').config()

schedule.scheduleJob('0 0 3 * * *', function() {
    console.log('Initiate database update...')
    const { spawn } = require('child_process')
    const leagueUpdateProcess = spawn('python3.8', [__dirname+'/py/league/update.py', process.env.DB_CONNECTION_STRING])
    const teamsUpdateProcess = spawn('python3.8', [__dirname+'/py/teams/update.py', process.env.DB_CONNECTION_STRING])
    leagueUpdateProcess.stdout.on('data', (data) => {
        console.log("Database update results: " + data);
    });
    leagueUpdateProcess.stderr.on('data', (data) => {
        console.log("Database update error: " + data);
    });

    teamsUpdateProcess.stdout.on('data', (data) => {
        console.log("Database update results: " + data);
    });
    teamsUpdateProcess.stderr.on('data', (data) => {
        console.log("Database update error: " + data);
    });


})
console.log('Database update scheduled.')