import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BullQueueModule } from './bull-queue/bull-queue.module';

@Module({
  imports: [BullQueueModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
