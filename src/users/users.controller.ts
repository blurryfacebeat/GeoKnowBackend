import {
  Controller,
  Get,
  Param,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserEntity } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UsePipes(ValidationPipe)
  @Get(':id')
  async getProfile(@Param('id') id: UserEntity['id']): Promise<UserEntity> {
    return this.usersService.getProfile(id);
  }
}
