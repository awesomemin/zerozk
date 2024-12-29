import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Streaming } from 'src/common/streaming.interface';

@Injectable()
export class StreamingService {
  constructor(private readonly configService: ConfigService) {}

  private streamingsWithZeroUser: Streaming[] = [];
  private tempStreamingsWithZeroUser: Streaming[] = [];
  private next: null | string = null;

  getAllStreamingsWithZeroUser(): Streaming[] {
    return this.streamingsWithZeroUser;
  }

  getStreamingWithZeroUser(i: number): Streaming {
    if (i >= 0 && i < this.streamingsWithZeroUser.length) {
      return this.streamingsWithZeroUser[i];
    } else {
      throw new HttpException('NOT FOUND', HttpStatus.NOT_FOUND);
    }
  }

  getNumberOfStreamingsWithZeroUser(): number {
    return this.streamingsWithZeroUser.length;
  }

  @Cron(CronExpression.EVERY_SECOND)
  async collectStreaming() {
    const response = await fetch(
      `https://openapi.chzzk.naver.com/open/v1/lives${this.next ? `?next=${this.next}` : ''}`,
      {
        headers: {
          'Client-Id': this.configService.get<string>('CLIENT_ID'),
          'Client-Secret': this.configService.get<string>('CLIENT_SECRET'),
          'Content-Type': 'application/json',
        },
      },
    );
    const data = await response.json();
    if (!response.ok && data.message === '잘못된 next 값입니다.') {
      this.streamingsWithZeroUser = this.tempStreamingsWithZeroUser;
      this.tempStreamingsWithZeroUser = [];
      this.next = null;
      console.log(this.streamingsWithZeroUser);
    } else if (!response.ok) {
      console.log('에러 발생');
    } else {
      let streaming: Streaming;
      for (streaming of data.content.data) {
        if (streaming.concurrentUserCount === 0) {
          this.tempStreamingsWithZeroUser.push(streaming);
        }
      }
      this.next = encodeURIComponent(data.content.page.next);
    }
  }
}
