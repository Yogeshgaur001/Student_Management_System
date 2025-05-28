import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Student } from './student.model';

@Injectable()
export class StudentService {
  constructor(
    @InjectModel(Student) private readonly studentModel: typeof Student,
  ) {}

  // ✅ Create student
  async create(student: any): Promise<Student> {
    return await this.studentModel.create(student);
  }

  // ✅ Get all students
  async findAll(): Promise<Student[]> {
    return await this.studentModel.findAll();
  }

  // ✅ Get one student by ID
  async findOne(id: number): Promise<Student | null> {
    return await this.studentModel.findByPk(id);
  }

  // ✅ Update student
  async update(id: number, student: any): Promise<[number]> {
    return await this.studentModel.update(student, { where: { id } });
  }

  // ✅ Delete student
  async delete(id: number): Promise<number> {
    return await this.studentModel.destroy({ where: { id } });
  }
}
