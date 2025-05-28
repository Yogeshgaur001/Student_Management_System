import { IsString, IsEmail, IsOptional } from 'class-validator';

export class CreateStudentDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  dob: string;

  @IsOptional()
  @IsString()
  branch: string;

  @IsOptional()
  @IsString()
  semester: string;

  @IsOptional()
  photo: string;
}
