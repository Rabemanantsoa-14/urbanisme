import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('singing')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Post('login')
  login(@Body() loginDto:LoginUserDto){
    return this.userService.login(loginDto)
  }

  // user.controller.ts
  @Post('send-code')
  async sendCode(@Body() emailDto: CreateUserDto) {
    return this.userService.sendVerificationCode(emailDto);
  }

  //resset password
  @Post('reset-password')
  async resetPassword(
    @Body('email') email: string,
    @Body('code') code: string,
    @Body('mot_de_passe') mot_de_passe: string,
  ) {
    return this.userService.resetPassword(email, code, mot_de_passe);
  }


  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
