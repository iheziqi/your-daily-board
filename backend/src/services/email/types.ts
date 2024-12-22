// src/services/email/types.ts
export interface EmailAttachment {
  filename: string;
  content: Buffer;
  contentType?: string;
}

export interface EmailOptions {
  from: string;
  to: string[];
  cc?: string[];
  bcc?: string[];
  subject: string;
  html?: string;
  text?: string;
  attachments?: EmailAttachment[];
  replyTo?: string;
  templateId?: string; // For template-based emails
  templateData?: Record<string, unknown>; // Data for template
}

export interface EmailResult {
  messageId?: string;
  success: boolean;
  error?: Error;
}
