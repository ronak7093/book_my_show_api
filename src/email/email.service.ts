import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as ejs from 'ejs';

@Injectable()
export class EmailService {
    async sendMail(receiver, subject, content) {
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            auth: {
                user: process.env.SMTP_MAIL,
                pass: process.env.SMTP_PASS,
            },
        });

        ejs.renderFile(
            'src/email/template/otpMessage.ejs',
            { receiver, content },
            (err, data) => {
                if (err) {
                    console.log(err);
                } else {
                    const mailOptions = {
                        from: 'ronak.s@upsquare.in',
                        to: receiver,
                        subject: subject,
                        html: data,
                    };
                    transporter.sendMail(mailOptions);
                }
            },
        );
    }
}
