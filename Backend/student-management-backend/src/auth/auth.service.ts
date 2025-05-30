import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './auth.model';
import * as bcrypt from 'bcrypt';
import { access } from 'fs';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User) private userModel: typeof User,
    private jwtService: JwtService,
  ) {}

  async register(email: string, password: string) {
    const hashed = await bcrypt.hash(password, 10);
    return this.userModel.create({ email, password: hashed });
  }

  async validateUser(email: string, password: string): Promise<any> {
    let user = await this.userModel.findOne({ where: { email } });
    user= user?.get({ plain: true }); // Convert Sequelize model to plain object

    if (!user) return null;

    try {
      console.log('--------------------------')
      console.log('password:', password);
      console.log('hashed password', user.password);
      console.log('--------------------------')
      const isMatch = await bcrypt.compare(password, user.password);
      console.log('Password match:', isMatch);
      if (!isMatch) return null;

      return user; // or user.dataValues if you want to strip the Sequelize model
    } catch (error) {
      // console.error('bcrypt error:', error);
      return null;
    }
  }

  async login(email: string, password: string) {
    const user = await this.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }


    let response;
try {
      // Check if user is active
     response = {
      access_token: this.jwtService.sign({
        userId: user.id,
        email: user.email,
      }),
    }
  } catch (error) { 
    console.warn('Error generating JWT token:', error);
    throw new UnauthorizedException('Could not generate token');
  }

    // Generate JWT token
    return response;
  }
}
