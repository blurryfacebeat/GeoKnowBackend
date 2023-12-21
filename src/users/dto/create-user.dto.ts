import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
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
  @MinLength(8, { message: INVALID_PASSWORD_LENGTH })
  @MaxLength(32, { message: INVALID_PASSWORD_LENGTH })
  password: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(4, { message: INVALID_USERNAME_LENGTH })
  @MaxLength(16, { message: INVALID_USERNAME_LENGTH })
  username: string;
}
