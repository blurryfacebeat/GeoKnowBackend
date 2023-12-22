import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';
import {
  INVALID_EMAIL_TYPE,
  INVALID_PASSWORD_LENGTH,
  INVALID_USERNAME_LENGTH,
} from '../messages';

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail({}, { message: INVALID_EMAIL_TYPE })
  email: string;

  @IsNotEmpty()
  @IsString()
  @Length(8, 32, { message: INVALID_PASSWORD_LENGTH })
  password: string;

  @IsNotEmpty()
  @IsString()
  @Length(4, 16, { message: INVALID_USERNAME_LENGTH })
  username: string;
}
