import { Controller, Get, Param } from '@nestjs/common';
import { StreamingService } from './streaming.service';

@Controller('streaming')
export class StreamingController {
  constructor(private readonly streamingService: StreamingService) {}

  @Get('number')
  getNumberOfStreamingsWithZeroUser() {
    return this.streamingService.getNumberOfStreamingsWithZeroUser();
  }

  @Get('all')
  getAllStreamingsWithZeroUser() {
    return this.streamingService.getAllStreamingsWithZeroUser();
  }

  @Get(':index')
  getStreamingWithZeroUser(@Param('index') index: string) {
    return this.streamingService.getStreamingWithZeroUser(+index);
  }
}
