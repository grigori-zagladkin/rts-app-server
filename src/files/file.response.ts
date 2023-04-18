import { ApiProperty } from '@nestjs/swagger';

export default class FileResponse {
  @ApiProperty({ example: 'ewfefergferg.jpg', description: 'file name' })
  fileName: string;
}
