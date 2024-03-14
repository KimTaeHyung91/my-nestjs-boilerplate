import { Controller, Post, UseGuards } from '@nestjs/common';
import { UploadFileGuard } from '../../common/guard/upload-file.guard';
import { File } from '../../common/decorator/file.decorator';
import { MultipartFile } from '../../common/type/multipart-file.interface';

@Controller('/api/v1/file')
export class ApiFileController {
  @Post()
  @UseGuards(UploadFileGuard)
  async upload(@File() file: MultipartFile) {
    //TO-DO
    console.log(file.mimetype, file.filename, await file.toBuffer());
  }
}
