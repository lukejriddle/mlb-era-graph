const schedule =  require('node-schedule')

schedule.scheduleJob('0 35 * * * *', function() {
    console.log('Initiate database update...')
    const { spawn } = require('child_process')
    const testProcess = spawn('python3.8', [__dirname+'/py/update.py', 'gyQK0d4Czs8p'])
    testProcess.stdout.on('data', (data) => {
        console.log("Database update results: " + data);
    });
    testProcess.stderr.on('data', (data) => {
        console.log("Database update error: " + data);
    });
})
console.log('Database update scheduled.')