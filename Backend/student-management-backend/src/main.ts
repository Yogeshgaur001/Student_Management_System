import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { getModelToken } from '@nestjs/sequelize'; // Add this import
import { User } from './auth/auth.model';
import * as bcrypt from 'bcrypt';

export async function seedAdmin(userModel: typeof User) {
  const email = 'admin@gmail.com';
  const password = 'admin123';

  // Check if user already exists
  const existing = await userModel.findOne({ where: { email } });
  if (existing) {
    console.log('Admin user already exists.');
    return;
  }

  const hashed = await bcrypt.hash(password, 10);
  await userModel.create({ email, password: hashed });
  console.log('Admin user created!');
}

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/',
  });
  app.enableCors({
    origin: '*', // Adjust this to your needs
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  })

  // Get the User model from DI
  const userModel = app.get(getModelToken(User)); // <-- This is the correct way
  await seedAdmin(userModel);

  await app.listen(3000);
}
bootstrap();