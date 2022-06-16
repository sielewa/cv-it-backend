import {
  IsInt,
  IsNotEmpty,
  IsString,
  Length,
  IsEmail,
  MinLength,
  MaxLength,
  IsBoolean,
  IsArray
} from "class-validator";

export class UserDto {
  @IsString()
  @Length(3, 30, {
    message: 'Nie odpowiednia długość imienia'
  })
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6, { message: 'Hasło jest za krótkie' })
  @MaxLength(20, { message: 'Hasło jest za długie' })
  password: string;

  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsBoolean()
  isAdmin: boolean;
}

export class UserLoginDto {
  @IsString()
  username: string;

  @IsString()
  password: string;
}

export class UserEmailDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;
}

export class UserPasswordDto {
  @IsNotEmpty()
  @IsString()
  newPassword: string;

  @IsNotEmpty()
  @IsString()
  oldPassword: string;
}