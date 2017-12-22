const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const config = require('../config.json');

router.get('/', function(req, res, next) {
  res.send('hello world');
});

function validEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email.toLowerCase());
}

router.post('/', function(req, res, next) {
  let to = req.body.to;
  let subject = req.body.subject;
  let message = req.body.message;
  
  if(!validEmail(to)) {
    res.send('Please use a valid email address');
  } else {
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
  }
});

module.exports = router;
