import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>
  ) { }

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const userByEmail = await this.userRepository.findOneBy({
      email: createUserDto.email,
    });

    const userByUsername = await this.userRepository.findOneBy({
      username: createUserDto.username,
    });

    if (userByEmail || userByUsername) {
      throw new HttpException(
        'Email or username has taken',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const newUser = new UserEntity();
    Object.assign(newUser, createUserDto);

    await this.userRepository.save(newUser);

    return await this.userRepository.findOneBy({
      username: createUserDto.username,
    });
  }

  async deleteUser(userId: number): Promise<any> {
    const userDB = await this.userRepository.findOneBy({ id: userId });

    if (userDB) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return this.userRepository.delete({ id: userId });
  }

  async findById(id: number): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: { id }
    });

    if (!user) {
      throw new HttpException('Wrong id', HttpStatus.BAD_REQUEST);
    }

    return user;
  }

  async findByEmail(email: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: { email }
    });

    if (!user) {
      throw new HttpException('Wrong email', HttpStatus.BAD_REQUEST);
    }

    return user;
  }
}
