import { IEmailService } from './IEmailService';
import EmailService from './EmailService';

export type EmailServiceProvider = 'nodemailer' | 'sendgrid';

class EmailServiceFactory {
  private static instance: EmailServiceFactory;
  private currentProvider: EmailServiceProvider = 'nodemailer';
  private emailService?: IEmailService;

  private constructor() {}

  public static getInstance(): EmailServiceFactory {
    if (!EmailServiceFactory.instance) {
      EmailServiceFactory.instance = new EmailServiceFactory();
    }
    return EmailServiceFactory.instance;
  }

  public setProvider(provider: EmailServiceProvider): EmailServiceFactory {
    this.currentProvider = provider;
    // Clear existing instance so next getEmailService() creates new one
    this.emailService = undefined;

    return this;
  }

  public getEmailService(): IEmailService {
    if (!this.emailService) {
      this.emailService = this.createEmailService();
    }
    return this.emailService;
  }

  private createEmailService(): IEmailService {
    switch (this.currentProvider) {
      case 'nodemailer':
        return new EmailService();
      default:
        throw new Error(
          `Unknown email service provider: ${this.currentProvider}`
        );
    }
  }
}

export default EmailServiceFactory;
