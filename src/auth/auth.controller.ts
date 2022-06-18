import { Controller, Get, Post, Request, Response, UnauthorizedException, UseGuards } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { localAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly usersSerivce: UsersService,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  authUser(@Request() req): Promise <Record<string,any>> {
    console.dir('hello')
    return req.user
  }

  @UseGuards(localAuthGuard)
  @Post('login')
  async loginUser(@Request() req, @Response({ passthrough: true}) res): Promise<Record<string, any>> {
    const user = req.user;
    console.dir(user)
    const data = await this.authService.generateTokenPairs(user);

    res.cookie('access_token', data.accessToken, {
      expires: new Date(Date.now() + 300000),
      path: '/'
    });
    /*
    res.cookie('refresh_token', data.refreshToken, {
      httpOnly: true,
      expires: new Date(Date.now() + 604800000),
      path: '/'
    });*/

    return { data }
  }
}
