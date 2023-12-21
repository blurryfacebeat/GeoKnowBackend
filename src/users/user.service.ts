import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { USER_ALREADY_EXIST } from './messages';
import { CreateUserDto } from './dto/create-user.dto';
import { genSalt, hash } from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
  ) {}

  async create(dto: CreateUserDto): Promise<{ token: string }> {
    const { email, password, username } = dto;

    const existingUser = await this.findOne(email);

    if (existingUser) {
      throw new ConflictException(USER_ALREADY_EXIST);
    }

    const salt = await genSalt(10);
    const hashedPassword = await hash(password, salt);

    await this.userRepository.save({
      email,
      username,
      password: hashedPassword,
    });

    const token = await this.jwtService.signAsync(email);

    return { token };
  }

  async findOne(email: string): Promise<UserEntity | undefined> {
    return this.userRepository.findOne({
      where: {
        email,
      },
    });
  }
}
