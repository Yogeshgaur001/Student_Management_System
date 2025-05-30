import { Controller, Post, Body, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { UnauthorizedException } from '@nestjs/common';



@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
  ) {}

@Get()
get(){
  return { message: 'Welcome to the Auth API!' };
}


 @Post('register')
register(@Body() body: RegisterDto) {
  console.warn('Registering user:', body.email);
  return this.authService.register(body.email, body.password);
}

@Post('login')
async login(@Body() body: LoginDto) {
  try {
    console.warn('Logging in user:', body.email);
    return await this.authService.login(body.email, body.password);
  } catch (error) {
    throw new UnauthorizedException('Invalid email or password');
  }
}


}