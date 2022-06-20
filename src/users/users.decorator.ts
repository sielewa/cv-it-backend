import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const AuthedUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();

    const { user } = req;

    const userObj = {
      id: user.id,
      username: user.username,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
      description: user.description,
      main_title: user.main_title,
    }
    
    return userObj;
  },
);