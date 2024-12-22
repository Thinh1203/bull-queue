import { InjectQueue } from '@nestjs/bull';
import { Injectable, Logger } from '@nestjs/common';
import { Queue } from 'bull';

@Injectable()
export class BullQueueService {
  private readonly logger = new Logger(BullQueueService.name);
  constructor(@InjectQueue('batch-job') private commentJobQueue: Queue) {} // gọi hàng đợi batch-job

  async addJob(data: any) {
    try {
      this.logger.log('Adding job creation data to batchQueue: ');
      const job = await this.commentJobQueue.add(
        'push-data', // Gọi processer push-data
        {
          data,
        },
        {
          attempts: 3,
          backoff: 1000,
          timeout: 10000,
          removeOnComplete: true,
        },
      );
      return job;
    } catch (error) {
      this.logger.error(`Failed to add job to queue: ${error.message}`);
    }
  }
}
