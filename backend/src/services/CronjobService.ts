/* eslint-disable prefer-arrow-callback */
import * as cron from 'cron';
import { logger } from '../logging/logger.cron';

export interface CronJobDefinition {
  schedule: string; // Cron schedule expression
  task: () => void; // Function to execute
  onComplete: null | (() => void); // Function on completion
}

/**
 * Cron job service using library cron.
 * It is singleton class so that only one instance can exist in memory.
 */
class CronJobService {
  private static instance: CronJobService;
  private jobs: Map<string, cron.CronJob>;

  private constructor() {
    this.jobs = new Map();
  }

  static getInstance(): CronJobService {
    if (!this.instance) {
      return new CronJobService();
    }
    return this.instance;
  }

  addJob(name: string, jobDefinition: CronJobDefinition): void {
    if (this.jobs.has(name)) {
      throw new Error(`Job with name ${name} already exists.`);
    }

    const newJob = new cron.CronJob(
      jobDefinition.schedule,
      jobDefinition.task,
      jobDefinition.onComplete,
      false, // don't start after creation of job
      'Europe/Berlin' // time zone set to Berlin
    );

    this.jobs.set(name, newJob);

    logger.info(`Cron job ${name} at ${newJob.cronTime} has been added.`);
  }

  startJob(name: string): void {
    const job = this.jobs.get(name);
    if (job) {
      job.start();
      logger.info(`${name} at ${job.cronTime} started.`);
    } else {
      throw new Error(`Job with name ${name} does not exist.`);
    }
  }

  stopJob(name: string): void {
    const job = this.jobs.get(name);
    if (job) {
      job.stop();
      logger.info(`${name} at ${job.cronTime} stopped.`);
    } else {
      throw new Error(`Job with name ${name} does not exist.`);
    }
  }

  removeJob(name: string): void {
    const job = this.jobs.get(name);
    if (job) {
      job.stop();
      this.jobs.delete(name);
      logger.info(`${name} at deleted.`);
    } else {
      throw new Error(`Job with name ${name} does not exist.`);
    }
  }
}

export default CronJobService;
