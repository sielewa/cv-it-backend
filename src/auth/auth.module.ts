import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import config from '../../config/Config';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    JwtModule.register({
      secret: config.AUTH.secret,
      signOptions: { expiresIn: '500s' },
    })
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
