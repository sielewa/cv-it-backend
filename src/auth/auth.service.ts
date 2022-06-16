import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { sha256 } from 'js-sha256';
import * as bcrypt from 'bcrypt';
import config from '../../config/Config';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const data = await this.usersService.findOneByUsername(username);
    console.dir
    const isMatch = await bcrypt.compare(password, data.user.password);

    if (isMatch) {
      const { password, ...result } = data.user;
      return result
    }
    return null
  }

  async generateTokenPairs(user: any): Promise<Record<string, any>> {
    const payload = {
      username: user.username,
      sub: user.id
    };

    console.dir(payload)
    const refreshTokenToSha256 = sha256(
      payload.sub + config.AUTH.refresh_string + Date.now(),
    );

    return {
      accessToken: this.jwtService.sign(payload, { expiresIn: '5m' }),
      refreshToken: refreshTokenToSha256,
    }
  }
}