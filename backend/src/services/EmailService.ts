import * as nodemailer from 'nodemailer';
import {loadEnv} from '../utils/loadEnv';

/**
 * Service for sending email using nodemailer.
 */
class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    // loads .env file.
    loadEnv();

    // SMTP host
    const host = process.env.SMTP_HOST || 'localhost';
    // SMTP port
    const port = Number(process.env.SMTP_PORT || 7777);

    // creates reusable transporter object using the default SMTP transport.
    this.transporter = nodemailer.createTransport({
      host: host,
      port: port,
      secure: port === 465, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  /**
   * Sends email using smtp service.
   * @param to The receivers of this email.
   * @param subject The subject of this email.
   * @param content The content of this email.
   */
  async sendEmail(to: string, subject: string, content: string): Promise<void> {
    try {
      // send mail with defined transport object
      const info = await this.transporter.sendMail({
        from: `"Your Daily Board" <${process.env.SMTP_USER}>`, // sender address
        to: to, // list of receivers
        subject: subject, // Subject line
        html: content, // html body
      });
      console.log('Message sent: %s', info.messageId);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }
}

export default EmailService;
