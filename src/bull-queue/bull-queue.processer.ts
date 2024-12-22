import {
  OnQueueActive,
  OnQueueCompleted,
  OnQueueFailed,
  Process,
  Processor,
} from '@nestjs/bull';
import { Job } from 'bull';
import { Logger } from '@nestjs/common';

@Processor('batch-job')
export class QueueProcessor {
  constructor() {}
  private readonly logger = new Logger(this.constructor.name);

  @OnQueueActive()
  onActive(job: Job) {
    this.logger.debug(`Processing job ${job.id} of type ${job.name}`);
  }
  @OnQueueCompleted()
  onComplete(job: Job, result: any) {
    this.logger.debug(`Completed job ${job.id} of type ${job.name}`);
  }
  @OnQueueFailed()
  onError(job: Job<any>, error: any) {
    this.logger.error(
      `Failed job ${job.id} of type ${job.name}: ${error.message}`,
      error.stack,
    );
  }

  @Process('push-data')
  async handlePushData(job: Job) {
    const { data } = job.data;
    this.logger.log(`Handling job for data: ${data}`);
    // const result = await this.typeSenseService.handleEntryCreatedEvent(
    //   collectionName,
    //   data,
    // );
    // return result;
  }
}
