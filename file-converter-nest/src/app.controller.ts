import { Controller, Post, UseInterceptors, UploadedFile, Req, BadRequestException, Query } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { Request } from 'express';

import { AppService } from 'src/app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('json2csv')
  @UseInterceptors(FileInterceptor('file'))
  json2csv(@Req() request: Request, @UploadedFile() file: any, @Query('delimeter') delimeter: string = ',') {
    this.validationHelper(request as any, file);
    return this.appService.json2csv(file.buffer.toString('utf8'), delimeter);
  }

  @Post('csv2json')
  @UseInterceptors(FileInterceptor('file'))
  csv2json(@Req() request: Request, @UploadedFile() file: any, @Query('delimeter') delimeter: string = ',') {
    this.validationHelper(request as any, file);
    return this.appService.csv2json(file.buffer.toString('utf8'), delimeter);
  }

  validationHelper(request: { fileValidationError: Error }, file: any): void {
    if (request.fileValidationError) {
      throw new BadRequestException(request.fileValidationError);
    }
    if (!file) {
        throw new BadRequestException('No file was uploaded.');
    }
  }
}
