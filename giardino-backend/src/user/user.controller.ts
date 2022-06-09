import { Body, Controller, Get, Param, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from 'src/auth/auth.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { LoggedInUserDto } from './dto/logged-in-user.interface';
import { LoginUserDto } from './dto/loginUser.dto';
import { UserEntity } from './entity/user.entity';
import { UserService } from './user.service';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService) { };

  @ApiOkResponse({
    type: LoggedInUserDto
  })
  @Post()
  @UsePipes(new ValidationPipe())
  async createUser(@Body() user: CreateUserDto): Promise<UserEntity> {
    return await this.userService.createUser(user);
  }

  @ApiOkResponse({
    type: LoggedInUserDto
  })
  @Post('/login')
  @UsePipes(new ValidationPipe())
  async loginUser(@Body() loginUserDto: LoginUserDto): Promise<LoggedInUserDto> {
    return await this.authService.login(loginUserDto);
  }

  @Get(':id')
  @ApiBearerAuth()
  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard)
  async getUserInfo(@Param('id') id: number): Promise<UserEntity> {
    return await this.userService.findById(id);
  }


}
