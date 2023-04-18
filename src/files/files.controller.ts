import {
  Controller,
  Delete,
  HttpCode,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators/auth.decorator';
import FileResponse from './file.response';
import { FilesService } from './files.service';

@ApiTags('files')
@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Auth('ADMIN')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'create file' })
  @ApiResponse({ status: 200, type: FileResponse })
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
  @HttpCode(200)
  @Post()
  async createFile(@UploadedFile() file: Express.Multer.File) {
    return await this.filesService.createFile(file);
  }

  @Auth('ADMIN')
  @HttpCode(200)
  @ApiOperation({ summary: 'delete file by filename' })
  @ApiResponse({ status: 200, type: FileResponse })
  @Delete('/:fileName')
  async deleteFile(@Param('fileName') fileName: string) {
    return await this.filesService.deleteFile(fileName);
  }
}
