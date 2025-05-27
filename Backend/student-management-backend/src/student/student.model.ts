import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table
export class Student extends Model<Student> {
  @Column({ type: DataType.STRING })
  name: string;

  @Column({ type: DataType.STRING, unique: true })
  email: string;

  @Column({ type: DataType.DATEONLY })
  dob: Date;

  @Column({ type: DataType.STRING })
  branch: string;

  @Column({ type: DataType.INTEGER })
  semester: number;

  @Column({ type: DataType.STRING })
  photo: string;
}
