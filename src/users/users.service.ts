import { HttpException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "src/schemas/User.schema";
import { JwtService } from "@nestjs/jwt";
import { Model } from "mongoose";
import { CreateUserDto } from "./dto/CreateUserDto.dto";
import { UpdateUserDto } from "./dto/UpdateUser.dto";
import * as bcrypt from "bcrypt";
@Injectable()
export class UsersService {

    constructor
       ( @InjectModel(User.name) private UserModule:Model<User>,
        private jwtService:JwtService
    
    )
       
       {}


       createUser(createUserDato:CreateUserDto){

        const newUser = new this.UserModule(createUserDato);
        return newUser.save();

       }


       getsUsers(){
        return this.UserModule.find();
       }

       getUserById(id:string){
        return this.UserModule.findById(id);
       }


       
       updateUser(id:string,updateUserDto:UpdateUserDto){

      return  this.UserModule.findByIdAndUpdate(id,updateUserDto,{new:true});  

       }

       deleteUser(id:string){
        return this.UserModule.findByIdAndDelete(id);
       }



    
       async login(email: string, password: string) {
        const user = await this.UserModule.findOne({ email });
        if (!user) throw new HttpException("Invalid credentials", 401);

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) throw new HttpException("Invalid credentials", 401);

        // Generate JWT token
        const payload = { userId: user._id, email: user.email };
        const token = this.jwtService.sign(payload);  // Now this works!

        return { access_token: token, payload };
    }
}