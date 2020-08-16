const schedule =  require('node-schedule')
require('dotenv').config()

schedule.scheduleJob('0 0 3 * * *', function() {
    console.log('Initiate database update...')
    const { spawn } = require('child_process')
    const testProcess = spawn('python3.8', [__dirname+'/py/update.py', process.env.DB_CONNECTION_STRING])
    testProcess.stdout.on('data', (data) => {
        console.log("Database update results: " + data);
    });
    testProcess.stderr.on('data', (data) => {
        console.log("Database update error: " + data);
    });
})
console.log('Database update scheduled.')