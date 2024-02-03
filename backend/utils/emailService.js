// /utils/emailService.js
var nodemailer = require('nodemailer');
var config = require('config');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: config.get("gmail"),
    pass: config.get("password") // For Gmail, you might need to set up an App Password
  }
});

exports.sendVerificationEmail = function (userEmail, verificationToken) {
  var mailOptions = {
    from: config.get("gmail"),
    to: userEmail,
    subject: 'Verify Your Email',
    text: `Please click on the following link to verify your email: http://localhost:5001/verify-email?token=${verificationToken}`
  };
  console.log(verificationToken);
  
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.error('Error sending verification email:', error);
    } else {
      console.log('Verification email sent successfully');
    }
  });
};

exports.sendResetEmail = function (userEmail, verificationToken) {
  var mailOptions = {
    from: config.get("gmail"),
    to: userEmail,
    subject: 'TO reset your password please click on this email',
    text: `Please click on the following link to verify your email: http://localhost:5001/verifyReset-email?token=${verificationToken}`
  };
  console.log(verificationToken);
  
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.error('Error sending reset email:', error);
    } else {
      console.log('Reset email sent successfully');
    }
  });
};
