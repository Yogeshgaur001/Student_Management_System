import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Student } from './student.model';

@Injectable()
export class StudentService {
  constructor(
    @InjectModel(Student) private studentModel: typeof Student,
  ) {}

  create(student: any) {
    return this.studentModel.create(student);
  }

  findAll() {
    return this.studentModel.findAll();
  }

  findOne(id: number) {
    return this.studentModel.findByPk(id);
  }

  update(id: number, student: any) {
    return this.studentModel.update(student, { where: { id } });
  }

  delete(id: number) {
    return this.studentModel.destroy({ where: { id } });
  }
}
