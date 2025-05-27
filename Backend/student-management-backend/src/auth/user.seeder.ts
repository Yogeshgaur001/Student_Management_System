import { User } from './auth.model';
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