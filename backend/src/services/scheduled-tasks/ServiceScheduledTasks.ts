import { UserRepository } from '../../repositories';
import { IEmailService } from '../email/IEmailService';
import RenderService from '../RenderService';

export interface SendEmailsResult {
  totalUsers: number;
  successCount: number;
  failedCount: number;
  failedEmails: Array<{ email: string; error: string }>;
  error: Error | null;
}

export interface BatchResult {
  successCount: number;
  failedCount: number;
  failedEmails: Array<{ email: string; error: string }>;
}

/**
 * Scheduled tasks for daily board email.
 * Currently the main and only task is to send you-daily-board email.
 */
export class ServiceScheduledTasks {
  private readonly batchSize = 10;

  constructor(
    private readonly userRepo: UserRepository,
    private readonly emailService: IEmailService,
    private readonly renderService: RenderService
  ) {}

  /**
   * Sends daily board emails to all verified users
   * @param versionNumber Current version of the daily board
   * @returns Summary of email sending results
   * @throws Error if initialization fails
   */
  public async sendDailyBoardEmails(
    versionNumber: string
  ): Promise<SendEmailsResult> {
    const summary: SendEmailsResult = {
      totalUsers: 0,
      successCount: 0,
      failedCount: 0,
      failedEmails: [],
      error: null,
    };

    try {
      const verifiedUsers = await this.getVerifiedUsers();
      summary.totalUsers = verifiedUsers.length;

      if (verifiedUsers.length === 0) {
        console.info('No verified users found in the database.');
        return summary;
      }

      const batches = this.createBatches(verifiedUsers);

      for (const [batchIndex, batch] of batches.entries()) {
        const batchResults = await this.processBatch(
          batch,
          batchIndex,
          versionNumber
        );

        summary.successCount += batchResults.successCount;
        summary.failedCount += batchResults.failedCount;
        summary.failedEmails.push(...batchResults.failedEmails);
      }
    } catch (error) {
      summary.error =
        error instanceof Error ? error : new Error('Unknown error occurred');
      console.error('Failed to send daily board emails:', error);
    }

    return summary;
  }

  private async getVerifiedUsers() {
    const users = await this.userRepo.getAllUsersData();
    return users.filter(user => user.is_verified === 1);
  }

  private createBatches(users: DUser[]) {
    const batches: DUser[][] = [];
    for (let i = 0; i < users.length; i += this.batchSize) {
      batches.push(users.slice(i, i + this.batchSize));
    }
    return batches;
  }

  private async processBatch(
    batch: DUser[],
    batchIndex: number,
    versionNumber: string
  ): Promise<BatchResult> {
    const result: BatchResult = {
      successCount: 0,
      failedCount: 0,
      failedEmails: [],
    };

    const emailPromises = batch.map(user =>
      this.sendEmailToUser(user, versionNumber)
        .then(() => {
          result.successCount++;
        })
        .catch(error => {
          result.failedCount++;
          result.failedEmails.push({
            email: user.email,
            error: error instanceof Error ? error.message : 'Unknown error',
          });
        })
    );

    await Promise.all(emailPromises);

    console.log(
      `Batch ${batchIndex + 1}: ${result.successCount} succeeded, ${
        result.failedCount
      } failed`
    );

    return result;
  }

  private async sendEmailToUser(
    user: DUser,
    versionNumber: string
  ): Promise<void> {
    const emailHTML = await this.renderService.renderYourDailyBoardEmailForUser(
      user.email,
      versionNumber
    );

    const result = await this.emailService.sendEmail({
      to: user.email,
      subject: 'Check out daily mensa menu and more!',
      html: emailHTML,
    });

    if (!result.success) {
      throw result.error || new Error('Failed to send email');
    }
  }
}
