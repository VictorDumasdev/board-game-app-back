import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { Prisma } from '@prisma/client';
import { AuthGuard } from '../authentication/authentication.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService,) {}

  @Post()
  create(@Body() createUserDto: Prisma.UsersCreateInput) {
    return this.usersService.create(createUserDto);
  }
  
  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') email: string) {
    return this.usersService.findOne(email);
  }
  
  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: Prisma.UsersUpdateInput) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
