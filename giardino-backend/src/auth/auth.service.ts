import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserEntity } from 'src/user/entity/user.entity';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { LoggedInUserDto } from 'src/user/dto/logged-in-user.interface';
import { LoginUserDto } from 'src/user/dto/loginUser.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private readonly configService: ConfigService) { }

  generateJWT(user: UserEntity): string {
    return jwt.sign(
      {
        id: user.id,
        username: user.username,
        email: user.email,
      },
      this.configService.get<string>('JWT_SECRET'),
    );
  }

  async login(user: LoginUserDto): Promise<LoggedInUserDto> {
    const userFromDB = await this.userRepository.findOne(
      {
        where: { email: user.email },
        select: ['username', 'email', 'id', 'password', 'username'],
      }
    );

    if (!userFromDB) {
      throw new HttpException('Unknown User', HttpStatus.BAD_REQUEST);
    }

    const passwordsMatched = await bcrypt.compare(
      user.password,
      userFromDB.password,
    );

    delete userFromDB.password;

    if (passwordsMatched) {
      return {
        user: userFromDB,
        token: this.generateJWT(userFromDB),
      };
    } else {
      throw new HttpException('Wrong password', HttpStatus.BAD_REQUEST);
    }
  }
}