import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/User.schema';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { AuthModule } from 'src/middlewares/auth.module';  // Import AuthModule

@Module({
    imports: [
        MongooseModule.forFeature([{
            name: User.name,
            schema: UserSchema
        }]),
        AuthModule,  // Add AuthModule here to make JwtService available
    ],
    providers: [UsersService],
    controllers: [UsersController],
})
export class UserModule {}
