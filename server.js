const express = require("express");
const cors = require("cors");
const nodemailer = require('nodemailer');
const configFile = require('./config/default.json');
const app = express();

var corsOptions = {
  origin: "*"
};
const config =configFile.config;
console.log(config.smtpServer.auth.user)
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.post("/", (req, res) => {

//    return res.json({ message: "Email sent successfully",data: req.body });
let mailTransporter = nodemailer.createTransport({
    service: 'outlook',
    auth: {
        "user": config.smtpServer.auth.user,
        "pass": config.smtpServer.auth.pass
    }
    });

    var mailOptions = {
        from: config.smtpServer.FROM_EMAIL,
        to: config.smtpServer.FROM_EMAIL,
        subject: 'Slim Caulator User Info',
        html:"<p>Dear Customer!</p> <p>FirstName: "+ req.body.firstname + "</p><p>LastName: "+ req.body.lastname + "</p><p>Email: "+ req.body.email + "</p><p>Phone No: "+ req.body.phoneno +"</p><p>CompanyName: "+ req.body.company +"</p><p>Country: "+ req.body.country +"</p><p>Job Function: "+ req.body.job +"</p><p>Senioirty: "+ req.body.senioirty +"</p>"
        };

    var mailOptions2 = {
        from: config.smtpServer.FROM_EMAIL,
        to: req.body.email,
        subject: 'Slim Caulator Email',
        html: "<p>Dear Customer!</p><p>Your download is ready</p><p>Download : <a href=`https://www.visualize-roi.com/vr/customer/ui/slimstock/thankyou.html?script_id=78gv` target='_blank'>Click here</a>"
    };

    mailTransporter.sendMail(mailOptions, function(err, data) {
        if(err) {
            console.log('Error Occurs');
            res.json({ message: "Error", Err : err });
        } else {
            console.log('Email sent successfully Personal mail');
            mailTransporter.sendMail(mailOptions2, function(err, data) {
                if(err) {
                    console.log('Error Occurs');
                    res.json({ message: "Error", Err : err });
                } else {
                    console.log('Email sent successfully to user');
                    
                    res.json({ message: "Email sent successfully" });
                    
                }
            });
        }
    });
    
  
});

async function userMail(req){
    
}
// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});