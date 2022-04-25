import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { persian } from '@shared/dictionary/persian';
import { BaseResponse } from '@shared/result-model/base-result-model';
import * as fs from 'fs';
import { diskStorage } from 'multer';
import { editFileName, fileFileFilter } from '@root/file-uploader/utils/file-uploading.utils';

@ApiTags('file-uploader')
@Controller('file-uploader')
export class FileUploaderController {
  result = new BaseResponse();

  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './files',
        filename: editFileName,
      }),
      fileFilter: fileFileFilter,
    }),
  )
  async uploadedFile(@UploadedFile() file) {
    const path = file.path.split('\\').pop();
    this.result.init({
      data: path,
      success: true,
      successMassage: persian.FileSavedSuccessfully,
      errorMassage: undefined,
    });

    return this.result;
  }

  @Get(':path')
  seeUploadedFile(@Param('path') filePath: string, @Res() res) {
    const file = res.sendFile(filePath, { root: './files' });
    this.result.init({
      data: file,
      success: true,
      successMassage: undefined,
      errorMassage: undefined,
    });
    return this.result;
  }

  @Delete(':path')
  deleteUploadedFile(@Param('path') filePath: string) {
    const path = `files\\${filePath}`;
    try {
      fs.unlinkSync(path);
      this.result.init({
        data: null,
        success: true,
        successMassage: persian.FileDeletedSuccessfully,
        errorMassage: undefined,
      });
      return this.result;
    } catch (err) {
      this.result.init({
        data: err,
        success: false,
        successMassage: undefined,
        errorMassage: undefined,
      });
      return this.result;
    }
  }
}
