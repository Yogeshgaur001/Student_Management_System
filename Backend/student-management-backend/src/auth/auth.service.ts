import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './auth.model';
import * as bcrypt from 'bcrypt';

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
    console.log('Validating user:', email);
    const user = await this.userModel.findOne({ 
      where: { email },
      raw: false // Make sure we get the full Sequelize instance
    });
    
    if (!user) {
      console.log('User not found');
      return null;
    }

    // Access password from dataValues
    const hashedPassword = user.dataValues.password;
    


    try {
      const isMatch = await bcrypt.compare(password, hashedPassword);
      console.log('Password match:', isMatch);
      if (!isMatch) return null;
      
      return user.dataValues;
    } catch (error) {
      console.error('bcrypt error:', error);
      return null;
    }
  }

  async login(email: string, password: string) {
    const user = await this.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
