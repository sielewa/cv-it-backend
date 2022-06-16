import { Controller, Post, Request, Response, UnauthorizedException, UseGuards } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { localAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly usersSerivce: UsersService,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(localAuthGuard)
  @Post('login')
  async loginUser(@Request() req, @Response({ passthrough: true}) res): Promise<Record<string, any>> {
    const user = req.user
    console.dir(user)
    const data = this.authService.generateTokenPairs(user);
    return { data }
  }
}
