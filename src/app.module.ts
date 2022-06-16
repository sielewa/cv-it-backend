import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { KnexModule } from 'nestjs-knex';
import { AuthModule } from './auth/auth.module';
import config from '../config/Config';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    KnexModule.forRoot({
      config: {
        client: config.DB.dbServer,
        useNullAsDefault: true,
        connection: {
          host: config.DB.host,
          user: config.DB.user,
          password: config.DB.password,
          database: config.DB.name
        }
      }
    }),
    UsersModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
