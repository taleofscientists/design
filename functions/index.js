/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
const functions = require('firebase-functions')
const admin = require("firebase-admin")
const nodemailer = require('nodemailer');
admin.initializeApp()
/* gmail  credentials */
var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'soumyajits2000@gmail.com',
        pass: 'qzegzpmswxyqbime'
    }
});
exports.sendMailOverHTTP = functions.https.onRequest((req, res) => {
    const mailOptions = {
        from: `YourGmailEmailAddress@YouWant.com`,
        to: `YourGmailEmailAddress@gmail.com`,
        subject: 'Email From Me to MySelf | Contact Form Message',
        html: `<h1>Contact Form Message</h1>
                            <p>
                               <b>Email: </b>${req.body.email}<br>
                               <b>Name: </b>${req.body.name}<br>
                                <b>Mobile: </b>${req.body.name}<br>
                               <b>Message: </b>${req.body.message}<br>
                            </p>`
    };
    return transporter.sendMail(mailOptions, (error, data) => {
        if (error) {
            return res.send(error.toString());
        }
        var data = JSON.stringify(data)
        return res.send(`Sent! ${data}`);
    });
});