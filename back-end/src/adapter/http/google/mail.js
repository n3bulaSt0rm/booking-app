const { google } = require('googleapis');
const googleAuthService = require('./auth');

class EmailService {
    async sendEmail(to, subject, body) {
        const authClient = await googleAuthService.authenticate();
        const gmail = google.gmail({ version: 'v1', auth: authClient });

        const rawMessage = this.createMessage(to, subject, body);
        await gmail.users.messages.send({
            userId: 'me',
            requestBody: {
                raw: rawMessage,
            }
        });
    }
//
    createMessage(to, subject, body) {
        const messageParts = [
            `To: ${to}`,
            `Subject: ${subject}`,
            'Content-Type: text/html; charset="UTF-8"',
            '',
            body,
        ];

        return Buffer.from(messageParts.join('\n'))
            .toString('base64')
            .replace(/\+/g, '-')
            .replace(/\//g, '_')
            .replace(/=+$/, '');
    }

    async sendOtpEmail(to, otp) {
        const subject = 'Your OTP Code for Booking App Registration';

        const body = `
        <html>
            <head>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        background-color: #f4f4f4;
                        padding: 20px;
                    }
                    .email-container {
                        background-color: #ffffff;
                        padding: 30px;
                        border-radius: 8px;
                        max-width: 600px;
                        margin: 0 auto;
                        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                    }
                    .email-header {
                        text-align: center;
                        font-size: 24px;
                        font-weight: bold;
                        color: #333;
                    }
                    .otp-code {
                        font-size: 36px;
                        font-weight: bold;
                        color: #1e90ff;
                        margin-top: 20px;
                    }
                    .message {
                        font-size: 16px;
                        color: #555;
                        margin-top: 10px;
                    }
                    .footer {
                        font-size: 14px;
                        color: #aaa;
                        text-align: center;
                        margin-top: 30px;
                    }
                    .footer a {
                        color: #1e90ff;
                        text-decoration: none;
                    }
                </style>
            </head>
            <body>
                <div class="email-container">
                    <div class="email-header">Welcome to Booking App!</div>
                    <div class="message">
                        Hi there,
                        <p>Thank you for registering with the Booking App! Your OTP code to complete the registration process is:</p>
                    </div>
                    <div class="otp-code">${otp}</div>
                    <div class="message">
                        This OTP code will expire in 90 seconds. Please use it to verify your account and complete the registration.
                    </div>
                    <div class="footer">
                        <p>If you did not request this, please ignore this email.</p>
                        <p>For support, contact us at <a href="mailto:hainguyen.4work@gmail.com">hainguyen.4work@gmail.com</a></p>
                    </div>
                </div>
            </body>
        </html>
    `;

        await this.sendEmail(to, subject, body);
    }
}

module.exports = new EmailService();
