import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { existsSync, mkdirSync, rmSync, writeFileSync } from 'fs';
import { join, resolve } from 'path';
import { v4 } from 'uuid';

@Injectable()
export class FilesService {
  async createFile(file: Express.Multer.File) {
    try {
      const fileName = v4() + '.jpg';
      const filePath = resolve(__dirname, '..', 'static');
      if (!existsSync(filePath)) {
        mkdirSync(filePath, { recursive: true });
      }
      writeFileSync(join(filePath, fileName), file.buffer);
      return fileName;
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Ошибка при записи файла',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteFile(fileName: string) {
    try {
      const filePath = resolve(__dirname, '..', 'static');
      rmSync(join(filePath, fileName));
      return fileName;
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Ошибка при удалении файла',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
