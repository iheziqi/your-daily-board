import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import {
	emailTitle,
	menuContainer,
	blankSpace,
	exchangeRateContainer,
	menuJumpLink,
	footer,
} from './emailTemplate';

dotenv.config();

/**
 * Send email using smtp service.
 * @param receivers
 * @param emailContent
 */
async function sendEmail(receivers: string, emailContent: string) {
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

const emailHTML = `
<!DOCTYPE html>
<html
	xmlns="http://www.w3.org/1999/xhtml"
	xmlns:v="urn:schemas-microsoft-com:vml"
	xmlns:o="urn:schemas-microsoft-com:office:office"
>
	<head>
		<title> </title>
		<!--[if !mso]><!-->
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />
		<!--<![endif]-->
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		<style type="text/css">
			#outlook a {
				padding: 0;
			}
			body {
				margin: 0;
				padding: 0;
				-webkit-text-size-adjust: 100%;
				-ms-text-size-adjust: 100%;
			}
			table,
			td {
				border-collapse: collapse;
				mso-table-lspace: 0pt;
				mso-table-rspace: 0pt;
			}
			img {
				border: 0;
				height: auto;
				line-height: 100%;
				outline: none;
				text-decoration: none;
				-ms-interpolation-mode: bicubic;
			}
			p {
				display: block;
				margin: 13px 0;
			}
		</style>
		<!--[if mso]>
			<noscript>
				<xml>
					<o:OfficeDocumentSettings>
						<o:AllowPNG />
						<o:PixelsPerInch>96</o:PixelsPerInch>
					</o:OfficeDocumentSettings>
				</xml>
			</noscript>
		<![endif]-->
		<!--[if lte mso 11]>
			<style type="text/css">
				.mj-outlook-group-fix {
					width: 100% !important;
				}
			</style>
		<![endif]-->

		<!--[if !mso]><!-->
		<link
			href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700"
			rel="stylesheet"
			type="text/css"
		/>
		<link
			href="https://fonts.googleapis.com/css2?family=Albert+Sans:wght@500;900"
			rel="stylesheet"
			type="text/css"
		/>
		<style type="text/css">
			@import url(https://fonts.googleapis.com/css?family=Roboto:300,400,500,700);
			@import url(https://fonts.googleapis.com/css2?family=Albert+Sans:wght@500;900);
		</style>
		<!--<![endif]-->

		<style type="text/css">
			@media only screen and (min-width: 480px) {
				.mj-column-per-100 {
					width: 100% !important;
					max-width: 100%;
				}
			}
		</style>
		<style media="screen and (min-width:480px)">
			.moz-text-html .mj-column-per-100 {
				width: 100% !important;
				max-width: 100%;
			}
		</style>

		<style type="text/css">
			@media only screen and (max-width: 480px) {
				table.mj-full-width-mobile {
					width: 100% !important;
				}
				td.mj-full-width-mobile {
					width: auto !important;
				}
			}
		</style>
		<style type="text/css">
			body {
				background-color: #faf098;
			}
			.bg-none {
				background: none !important;
			}
			.gutter {
				padding-left: 20px !important;
				padding-right: 20px !important;
			}
			@media (min-width: 480px) {
				.gutter {
					padding-left: 32px !important;
					padding-right: 32px !important;
				}
			}

			/* Utility classes */
			.no-wrap {
				white-space: nowrap;
			}
			.hidden {
				display: none;
				max-width: 0px;
				max-height: 0px;
				overflow: hidden;
				mso-hide: all;
			}
			.lg-hidden {
				display: none;
				max-width: 0px;
				max-height: 0px;
				overflow: hidden;
				mso-hide: all;
			}

			@media (min-width: 480px) {
				/* Utility classes */
				.sm-hidden {
					display: none;
					max-width: 0px;
					max-height: 0px;
					overflow: hidden;
					mso-hide: all;
				}
				.lg-hidden {
					display: block !important;
					max-width: none !important;
					max-height: none !important;
					overflow: visible !important;
					mso-hide: none !important;
				}
			}
		</style>
	</head>
	<body style="word-spacing: normal; background-color: #faf098">

		<div style="background-color: #faf098">
      ${emailTitle}
      ${exchangeRateContainer}
      ${blankSpace}
      ${menuJumpLink}
      ${blankSpace}
      ${menuContainer}
      ${blankSpace}
      ${menuContainer}
      ${blankSpace}
      ${menuContainer}
      ${blankSpace}
      ${footer}
		</div>

	</body>
</html>
`;

const test_receiver = process.env.TEST_RECEIVER!;
sendEmail(test_receiver, emailHTML).then(() => {
	console.log('message send');
});
