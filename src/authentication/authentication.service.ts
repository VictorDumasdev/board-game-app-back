import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { comparePasswords } from 'src/utils/bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Users } from '@prisma/client';

@Injectable()
export class AuthenticationService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async signIn(email: string, pass: string): Promise<{ access_token: string, user: Users }> {
    const user = await this.usersService.findOne(email);
    
    if(user) {
      const isMatch = comparePasswords(pass, user.password);
      if(isMatch) {
        const payload = { sub: user.id, username: user.email };

        return { access_token: await this.jwtService.signAsync(payload), user: this.exclude(user, 'password')};
      } else {
        throw new UnauthorizedException();
      }
    } else {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND)
    }
  }

  exclude(user, ...keys) {
    for (let key of keys) {
      delete user[key]
    }
    return user
  }
}
