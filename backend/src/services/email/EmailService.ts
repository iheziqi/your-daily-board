import * as nodemailer from 'nodemailer';
import { loadEnv } from '../../utils/loadEnv';
import { IEmailService } from './IEmailService';
import { EmailOptions, EmailResult } from './types';
import { logger } from '../../logging/logger';

/**
 * Service for sending email using nodemailer.
 */
class EmailService implements IEmailService {
  private transporter: nodemailer.Transporter;

  private readonly defaultFrom: string;

  constructor(config?: {
    host?: string;
    port?: number;
    user?: string;
    pass?: string;
  }) {
    loadEnv();

    const host = config?.host ?? process.env.SMTP_HOST ?? 'localhost';
    const port = Number(config?.port ?? process.env.SMTP_PORT ?? 7777);
    const user = config?.user ?? process.env.SMTP_USER;
    const pass = config?.pass ?? process.env.SMTP_PASS;

    if (!user || !pass) {
      throw new Error('SMTP credentials are required');
    }

    this.defaultFrom = `"Your Daily Board" <${user}>`;
    this.transporter = this.createTransporter(host, port, user, pass);
  }

  private createTransporter(
    host: string,
    port: number,
    user: string,
    pass: string
  ): nodemailer.Transporter {
    return nodemailer.createTransport({
      host,
      port,
      secure: port === 465, // true for 465, false for other ports
      auth: { user, pass },
    });
  }

  /**
   * Sends an email using configured SMTP settings
   * @param options - Email options including recipients, subject, and content
   * @returns Promise resolving to the send result
   * @throws Error if SMTP credentials are missing
   */
  async sendEmail(options: EmailOptions): Promise<EmailResult> {
    const { from, to, subject, html, cc, bcc, attachments } = options;

    try {
      const info = await this.transporter.sendMail({
        from: from ?? this.defaultFrom,
        to: Array.isArray(to) ? to.join(', ') : to,
        cc: cc?.join(', '),
        bcc: bcc?.join(', '),
        subject,
        html,
        attachments,
      });

      return {
        success: true,
        messageId: info.messageId,
      };
    } catch (error) {
      const errorMessage = `Email failed to send: from ${from}, to ${to}, subject: ${subject}`;
      logger.error('Error sending email:', error);

      return {
        success: false,
        error: error instanceof Error ? error : new Error(errorMessage),
      };
    }
  }

  async verifyConnection(): Promise<boolean> {
    try {
      await this.transporter.verify();
      return true;
    } catch (error) {
      logger.error('SMTP connection verification failed:', error);
      return false;
    }
  }
}

export default EmailService;
