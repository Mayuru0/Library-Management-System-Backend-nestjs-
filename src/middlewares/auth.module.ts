import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { UsersService } from "../users/users.service";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "src/schemas/User.schema";
import { JwtStrategy } from "./jwt.strategy";
import * as dotenv from "dotenv";

dotenv.config();

@Module({
    imports: [
        PassportModule,
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: "1h" },
        }),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    ],
    providers: [UsersService, JwtStrategy],
    exports: [UsersService, JwtModule],  // Export JwtModule and UsersService
})
export class AuthModule {}
