import { Get, HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import config from '../../config/Config';
import * as bcrypt from 'bcrypt';
import { Knex } from 'knex';
import { InjectKnex } from 'nestjs-knex';
import { stringify } from 'querystring';
import { User } from './users.interface';
import { UserExistsException } from './exceptions/user-exists.exception';
import { Logger } from '@nestjs/common';
import { RedisService } from 'src/redis/redis.service';

@Injectable()
export class UsersService {
  private readonly logger = new Logger (UsersService.name);

  constructor(
    @InjectKnex() readonly knex: Knex,
    private readonly redisService: RedisService
  ) {}

  // CREATE USER

  async create(user: UserDto) {
    const saltOrRounds = config.BCRYPT.saltOrRounds;
    user.password = await bcrypt.hash(
      user.password,
      parseInt(saltOrRounds)
    );
    const createdUser = await this.knex<User>('users')
      .insert(user)
      .onConflict('username').ignore();

    if (!createdUser[0]) {
      throw new UserExistsException('User exist!');
    }

    return { id: createdUser[0] };
  }

  // GET USERS

  async getUsers(): Promise<Record<string, any>> {
    const users = await this.knex.table<User>('users')
      .select('id', 'username', 'email', 'firstName', 'lastName');

    return { users };
  }

  // FIND USER

  async findOneByUsername(username: string): Promise<Record<string,any>> {
    const user = await this.knex
      .table<User>('users')
      .where('username', username)
      .first();
    if (!user) {
      throw new NotFoundException('User doesnt exist!');
    }
    return { user };
  }

  async findOneById(id: number): Promise<Record<string,any>> {
    const user = await this.knex
      .select('id', 'username', 'firstName', 'lastName', 'phone', 'description', 'main_title')
      .table('users')
      .where('id', id)
      .first();

    if (!user) {
      throw new NotFoundException('User doesnt exist!');
    }

    return user ;
  }

  async findOneByRefreshToken(refreshToken: string): Promise<Record<string, any>> {
    const userId = await this.redisService.get(refreshToken);
    if (!userId) {
      return null
    }
    const user = await this.knex.table<User>('users').where('id', userId).first();
    return user;
  }
}
