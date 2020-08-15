const express = require('express');
const router = express.Router()
const nodemailer = require('nodemailer')
require('dotenv').config({path:__dirname+'/./../.env'})

router.post('/', (req, res) => {
    now = new Date()

    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    let mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_RECEP,
        subject: "mlb-era-graph problem report",
        text: req.body.feedback + '\n\n' + now
    }

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log('Error sending email: ' + error)
        } else {
            console.log('Email sent: ' + info.response)
        }
    })

    
})

module.exports = router