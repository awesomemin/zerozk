import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScheduleModule } from '@nestjs/schedule';
import { StreamingService } from './streaming/streaming.service';
import { ConfigModule } from '@nestjs/config';
import { StreamingModule } from './streaming/streaming.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({ isGlobal: true }),
    StreamingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
