import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'Mthobisi123456',
    });
  }

  async validate(payload: JwtPayload) {
    const user = await this.authService.validateUser(payload,);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user; // This will attach the user to the request object
  }
}
