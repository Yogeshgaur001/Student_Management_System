import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Body,
  UseGuards,
  Put,
  Param,
  Delete,
  Get,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';

@Controller('students')
// @UseGuards(JwtAuthGuard)
export class StudentController {
  constructor(private studentService: StudentService) {}

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('photo', {
      storage: diskStorage({
        destination: './uploads', // This folder must exist or be created
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          cb(null, `photo-${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  async uploadStudent(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: CreateStudentDto,
  ) {
    console.warn('File uploaded:', file);
    if (file) {
      body.photo = file.filename;
    }
    console.log('create student body', body);
    return this.studentService.create(body);
  }

  @Get()
  async findAll() {
    return this.studentService.findAll();
  }

   @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.studentService.findOne(id);
  }
  @Put(':id')
  updateStudent(@Param('id') id: number, @Body() body: any) {
    return this.studentService.update(id, body);
  }

  @Delete(':id')
  deleteStudent(@Param('id') id: number) {
    return this.studentService.delete(id);
  }
}
