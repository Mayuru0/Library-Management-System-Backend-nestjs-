import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import * as dotenv from "dotenv";

dotenv.config();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET || 'defaultSecretKey',  // Ensure the fallback secret is always a string
        });
    }

    async validate(payload: any) {
        return { userId: payload.userId, email: payload.email };
    }
}
