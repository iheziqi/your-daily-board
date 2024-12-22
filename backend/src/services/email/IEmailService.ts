import { EmailOptions, EmailResult } from './types';

export interface IEmailService {
  sendEmail(options: EmailOptions): Promise<EmailResult>;

  // Optional methods that implementations might provide
  sendTemplate?(
    templateId: string,
    to: string[],
    data: Record<string, unknown>
  ): Promise<EmailResult>;

  verifyConnection?(): Promise<boolean>;
}
