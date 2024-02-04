import { Body, Controller, Post } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';

@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authService: AuthenticationService) {}

  @Post()
  signIn(@Body() auth: { email: string, password: string}) {
    return this.authService.signIn(auth.email, auth.password);
  }
}
