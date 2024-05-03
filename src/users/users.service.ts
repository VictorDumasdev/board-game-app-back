import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { encodePassword } from 'src/utils/bcrypt';
import { exclude } from 'src/utils/utils';

@Injectable()
export class UsersService {
  constructor(private readonly databaseService: DatabaseService, private jwtService: JwtService) {}

  async create(createUserDto: Prisma.UsersCreateInput) {
    try {
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
      return { data: exclude(response, 'password'), access_token: await this.jwtService.signAsync(payload) }
    } catch(error) {
      throw new HttpException('User email already used', HttpStatus.CONFLICT)
    }
  }

  async findOne(email: string) {
    const user = await this.databaseService.users.findFirst({
        where: { email }
    });

    return exclude(user, 'password')
  }

  async findOneWithPass(email: string) {
    return this.databaseService.users.findFirst({
        where: { email }
    });
  }

  async findOneById(id: number) {
    return this.databaseService.users.findFirst({
        where: { id }
    })
}

  async findMany(ids: number[]) {
    return this.databaseService.users.findMany({
        where: { id: { in: ids } }
    })
  }

  async update(id: number, updateUserDto: Prisma.UsersUpdateInput) {
      return this.databaseService.users.update({
          where: { id }, 
          data: exclude(updateUserDto, 'id')
      })
  }

  async remove(id: number) {
      return this.databaseService.users.delete({
          where: { id }
      })
  }
}
