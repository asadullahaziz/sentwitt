const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

function sendCode(email, code) {
    const msg = {
        to: email, // Change to your recipient
        from: 'asadullahaziz99@gmail.com', // Change to your verified sender
        subject: 'Email Varification Code',
        text: `Your Email varification Code is: ${code}`,
    };
    
    sgMail
        .send(msg)
        .then(() => {
            return true
        })
        .catch((error) => {
            return error;
        });
}

module.exports = sendCode;