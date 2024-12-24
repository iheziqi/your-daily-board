import { EmailService } from '../../services';
import nodemailer from 'nodemailer';

// Mock nodemailer
jest.mock('nodemailer');

describe('EmailService', () => {
  let emailService: EmailService;
  const mockSendMail = jest.fn();

  beforeEach(() => {
    // Set test env variables
    process.env = {
      ...process.env,
      SMTP_HOST: 'test.smtp.com',
      SMTP_PORT: '587',
      SMTP_USER: 'test@example.com',
      SMTP_PASS: 'testpassword',
    };

    // Clear mocks
    jest.clearAllMocks();

    (nodemailer.createTransport as jest.Mock).mockReturnValue({
      sendMail: mockSendMail,
      verify: jest.fn().mockResolvedValue(true),
    });

    emailService = new EmailService();
  });

  it('should send email successfully', async () => {
    // Mock successful email sending
    mockSendMail.mockResolvedValueOnce({ messageId: 'test-message-id' });

    const result = await emailService.sendEmail({
      from: 'test@example.com',
      to: ['recipient@example.com'],
      subject: 'Test Email',
      html: '<p>Hello</p>',
    });

    // Verify the result
    expect(result.success).toBe(true);
    expect(mockSendMail).toHaveBeenCalledTimes(1);
    expect(mockSendMail).toHaveBeenCalledWith(
      expect.objectContaining({
        to: 'recipient@example.com',
        subject: 'Test Email',
        html: '<p>Hello</p>',
      })
    );
  });

  it('should handle email sending failure', async () => {
    // Mock email sending failure
    const errorMessage = 'Failed to send email';
    mockSendMail.mockRejectedValueOnce(new Error(errorMessage));

    const result = await emailService.sendEmail({
      from: 'test@example.com',
      to: ['recipient@example.com'],
      subject: 'Test Email',
      html: '<p>Hello</p>',
    });

    // Verify the error handling
    expect(result.success).toBe(false);
    expect(result.error).toBeDefined();
    expect(mockSendMail).toHaveBeenCalledTimes(1);
  });

  it('should verify connection successfully', async () => {
    const result = await emailService.verifyConnection();
    expect(result).toBe(true);
  });

  // Test environment variables
  // it('should use default values when environment variables are not set', () => {
  //   // Clear environment variables
  //   const originalEnv = process.env;
  //   process.env = { ...originalEnv };
  //   delete process.env.SMTP_HOST;
  //   delete process.env.SMTP_PORT;

  //   // Create new instance with default values
  //   const service = new EmailService();

  //   // Verify that createTransport was called with default values
  //   expect(nodemailer.createTransport).toHaveBeenCalledWith(
  //     expect.objectContaining({
  //       host: 'localhost',
  //       port: 7777,
  //     })
  //   );

  //   // Restore environment variables
  //   process.env = originalEnv;
  // });
});
