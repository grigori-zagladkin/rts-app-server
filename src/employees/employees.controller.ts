import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators/auth.decorator';
import EmployeesDto from './employees.dto';
import EmployeesResponse from './employees.response';
import { EmployeesService } from './employees.service';

@ApiTags('employees')
@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @HttpCode(200)
  @ApiOperation({ summary: 'Получение всех работников' })
  @ApiResponse({ status: 200, type: [EmployeesResponse] })
  @Get()
  async getAllEmployees() {
    return await this.employeesService.getAllEmployees();
  }

  @HttpCode(200)
  @ApiOperation({ summary: 'Получение работника по слагу' })
  @ApiResponse({ status: 200, type: EmployeesResponse })
  @Get('by-slug/:slug')
  async getEmployeeBySlug(@Param('slug') slug: string) {
    return await this.employeesService.getEmployeeBySlug(slug);
  }

  @Auth('ADMIN')
  @HttpCode(200)
  @ApiOperation({ summary: 'Получение работника по id' })
  @ApiResponse({ status: 200, type: EmployeesResponse })
  @Get('/:id')
  async getEmployeeById(@Param('id') id: string) {
    return await this.employeesService.getEmployeeById(+id);
  }

  @Auth('ADMIN')
  @HttpCode(200)
  @ApiOperation({ summary: 'Создать работника' })
  @ApiResponse({ status: 200 })
  @Post()
  async createEmployee() {
    return await this.employeesService.createEmployees();
  }

  @Auth('ADMIN')
  @HttpCode(200)
  @ApiOperation({ summary: 'Обновить данные о работнике' })
  @ApiResponse({ status: 200, type: EmployeesResponse })
  @UsePipes(new ValidationPipe())
  @Put('/:id')
  async updateEmployee(@Param('id') id: string, @Body() dto: EmployeesDto) {
    return await this.employeesService.updateEmployee(+id, dto);
  }

  @Auth('ADMIN')
  @HttpCode(200)
  @ApiOperation({ summary: 'Удалить данные о работнике' })
  @ApiResponse({ status: 200, type: EmployeesResponse })
  @Delete('/:id')
  async deleteEmployee(@Param('id') id: string) {
    return await this.employeesService.deleteEmployee(+id);
  }
}
