import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from './dto/auth.dto';
import { UserEntity } from '../users/entities/user.entity';
import { USER_NOT_FOUND } from '../users/messages';
import { compare } from 'bcryptjs';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: CreateUserDto): Promise<{ token: string }> {
    return this.usersService.create(dto);
  }

  async login(dto: AuthDto): Promise<{ accessToken: string }> {
    const { email } = await this.validateUser(dto);

    const payload = {
      email,
    };
    const accessToken = await this.jwtService.signAsync(payload);

    return { accessToken };
  }

  private async validateUser(dto: AuthDto): Promise<Pick<UserEntity, 'email'>> {
    const { email, password } = dto;

    const user = await this.usersService.findOne(email);

    if (!user) {
      throw new NotFoundException(USER_NOT_FOUND);
    }

    const isPasswordCorrect = await compare(password, user.password);

    if (!isPasswordCorrect) {
      throw new NotFoundException(USER_NOT_FOUND);
    }

    return { email };
  }
}
