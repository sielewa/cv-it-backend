import { Body, Controller, Post, Get, HttpCode, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { UserExistsException } from './exceptions/user-exists.exception';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly userService: UsersService
  ) {}
  
  @Post()
  @HttpCode(201)
  async registerUser(@Body() userDto: UserDto) {
    try {
      await this.userService.create(userDto);
    } catch (err) {
      switch (err.constructor) {
        case UserExistsException:
          
          throw new BadRequestException(err.message);
      }
      throw new InternalServerErrorException();
    }
  }

  @Get()
  getAllUsers() {
    return this.userService.getUsers();
  }
}
