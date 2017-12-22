const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const config = require('../config.json');

router.get('/', function(req, res, next) {
  res.send('hello world');
});

router.post('/', function(req, res, next) {
  let to = req.body.to;
  let subject = req.body.subject;
  let message = req.body.message;
  let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: config.email,
        pass: config.pass
    }
  });

  var mailOptions = {
    from: config.email,
    to: to, 
    subject: subject,
    text: message
  }

  transporter.sendMail(mailOptions, function(error, response){
    if(error){
        console.log(error);
    }else{
        res.send('ok');
    }
  });
});

module.exports = router;
