import { Controller, Post, Body, Get } from '@nestjs/common';
import { AuthService } from './auth.service';

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
  register(@Body() body: { email: string; password: string }) {
    console.log('Registering user:', body.email);
    return this.authService.register(body.email, body.password);
  }

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    return this.authService.login(body.email, body.password);
  }
}