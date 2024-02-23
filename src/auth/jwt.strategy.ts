import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "./auth.service";
console.log(process.env.JWT_SECRET_KEY, 'process.env.JWT_SECRET_KEY');


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(private readonly authService: AuthService) {

        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'qwertyUiopAskdvGfcxSHJ',
        });
    }

    // validate token
    async validate(payload: any) {

        const user = await this.authService.findById({ _id: payload.id });
        // console.log(user, 'user?????????');


        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}
