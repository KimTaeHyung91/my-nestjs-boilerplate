import { Module } from '@nestjs/common';
import { ApiFileController } from './interfaces/api-file.controller';

@Module({
  controllers: [ApiFileController],
})
export class FileModule {}
