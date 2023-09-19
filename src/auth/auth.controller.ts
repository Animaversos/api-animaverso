import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './custom-decorator';
import { LoginReturnDto } from './dto/login-return.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('login')
  async login(@Body() usuario: LoginDto): Promise<LoginReturnDto> {
    return await this.authService.login(usuario);
  }
}
