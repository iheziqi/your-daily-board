import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Send email using smtp service.
 * @param receivers
 * @param emailContent
 */
export async function sendEmail(receivers: string, emailContent: string) {
	try {
		// create reusable transporter object using the default SMTP transport
		let transporter = nodemailer.createTransport({
			host: 'smtp.qq.com',
			port: 587,
			secure: false, // true for 465, false for other ports
			auth: {
				user: process.env.SMTP_USER, // generated ethereal user
				pass: process.env.SMTP_PASSWORD, // generated ethereal password
			},
		});

		// send mail with defined transport object
		let info = await transporter.sendMail({
			from: `"Your Everyday Menu Board" <${process.env.SMTP_USER}>`, // sender address
			to: receivers, // list of receivers
			subject: 'Check out all menus of mensa ✔', // Subject line
			html: emailContent, // html body
		});

		console.log('Message sent: %s', info.messageId);
	} catch (err) {
		console.error(err);
	}
}
