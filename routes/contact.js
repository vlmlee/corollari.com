var express = require('express'),
    router = express.Router(),
    nodemailer = require('nodemailer'),
    password = process.env.BLOGPASSWORD;

router.get('/', function(req, res, next) {
    res.render('contact', { title: 'Contact', msg: 'Feel free to leave a message  =)' });
});

router.post('/sendemail', function(req, res, next) {
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'sendmeanemail307@gmail.com',
            pass: password
        }
    });

    var mailOptions = {
        from: req.body.name + ' &lt;' + req.body.email +
            '&gt;',
        to: 'mlee@vellichorlabs.com',
        subject: req.body.subject,
        text: req.body.bodytext
    };

    transporter.sendMail(mailOptions, function(err, info) {
        if (err) {
            res.render('contact', {
                title: 'Contact',
                msg: 'An error occurred, message was not sent. =(',
                err: true,
                page: 'contact'
            });
        } else {
            res.render('contact', {
                title: 'Contact',
                msg: 'Message was sent! =)',
                err: false,
                page: 'contact'
            });
        }
    });
});

module.exports = router;
