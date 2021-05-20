"use strict";
const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
exports.sendMails = async function(req, res) {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  console.log(req.body.to);
  console.log(req.body.subject);
  console.log(req.body.text);
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.163.com",
    port: 587,
    secure: true , // true for 465, false for other ports
    auth: {
      user: "newsroomofficiel@163.com", // generated ethereal user
      pass: "HXSUBOBQHDEDJUBA" // generated ethereal password
    }
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '<newsroomofficiel@163.com>', // sender address
    to: req.body.to, // list of receivers
    subject: req.body.subject, // Subject line
    text: req.body.text, // plain text body
    html: "<b>"+req.body.text+"</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    res.redirect("../Email");
};

//sendMails().catch(console.error);
