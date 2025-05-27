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
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { StudentService } from './student.service';

@Controller('students')
@UseGuards(JwtAuthGuard)
export class StudentController {
  constructor(private studentService: StudentService) {}

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('photo', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, `${uniqueSuffix}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  uploadPhoto(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: any,
  ) {
    const studentData = { ...body, photo: file.filename };
    return this.studentService.create(studentData);
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