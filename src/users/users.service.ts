import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { encodePassword } from 'src/utils/bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly databaseService: DatabaseService, private jwtService: JwtService) {}

  async create(createUserDto: Prisma.UsersCreateInput) {
    const password = encodePassword(createUserDto.password);
    const response = await this.databaseService.users.create({
        data: { 
          ...createUserDto,
          password,
          ownedGames: [],
          favoriteGames: [],
          everPlayedGames: []
        }
    });

    const payload = { sub: response.id, username: response.email };
    return { data: this.exclude(response, 'password'), access_token: await this.jwtService.signAsync(payload) }
  }

  async findOne(email: string) {
      return this.databaseService.users.findFirst({
          where: { email }
      })
  }

  async update(id: number, updateUserDto: Prisma.UsersUpdateInput) {
      return this.databaseService.users.update({
          where: { id }, 
          data: this.exclude(updateUserDto, 'id')
      })
  }

  async remove(id: number) {
      return this.databaseService.users.delete({
          where: { id }
      })
  }

  exclude(user, ...keys) {
    for (let key of keys) {
      delete user[key]
    }
    return user
  }
  
}
