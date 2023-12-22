import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { USER_ALREADY_EXIST, USER_NOT_FOUND } from './messages';
import { CreateUserDto } from './dto/create-user.dto';
import { genSalt, hash } from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
  ) {}

  async create(dto: CreateUserDto): Promise<{ token: string }> {
    const { email, password, username } = dto;

    const user = await this.findOne(email);

    if (user) {
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

  async findOne(email: UserEntity['email']): Promise<UserEntity | undefined> {
    return this.userRepository.findOne({
      where: {
        email,
      },
    });
  }

  async getProfile(id: UserEntity['id']): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: {
        id,
      },
    });

    if (!user) {
      throw new NotFoundException(USER_NOT_FOUND);
    }

    return user;
  }
}
