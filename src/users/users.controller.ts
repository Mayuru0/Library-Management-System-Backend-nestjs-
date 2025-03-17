import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
  Get,
  Param,
  HttpException,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/CreateUserDto.dto';
import { Mongoose, Types } from 'mongoose';
import { UpdateUserDto } from './dto/UpdateUser.dto';
import { AuthGuard } from "@nestjs/passport";
@Controller('api/users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  //create
  @Post('create')
  @UsePipes(new ValidationPipe())
  createUser(@Body() createUserDto: CreateUserDto) {
    console.log(createUserDto);
    return this.usersService.createUser(createUserDto);
  }

  //get all
   // Protect this route using JWT
   @UseGuards(AuthGuard("jwt"))
  @Get('get')
  getUsers() {
    return this.usersService.getsUsers();
  }

  //users/:id
  @Get('get/:id')
  async getUserById(@Param('id') id: string) {
    const isValid = Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Invalid id', 400);

    const findUser = await this.usersService.getUserById(id);
    if (!findUser) throw new HttpException('User not found', 404);
    return findUser;
  }

  //update

  @Patch('update/:id')
  @UsePipes(new ValidationPipe())
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const isValid = Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Invalid id', 400);
    const updateUser = await this.usersService.updateUser(id, updateUserDto);
    if (!updateUser) throw new HttpException('User not found', 404);
    return updateUser;
  }
  //delete
  @Delete('delete/:id')
  async deleteUser(@Param('id') id: string) {
    const isValid = Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Invalid id', 400);
    const deletedUser = await this.usersService.deleteUser(id);
    if (!deletedUser) throw new HttpException('User not found', 404);
    return deletedUser;
  }




// User login
@Post("login")
  async login(@Body() { email, password }: { email: string; password: string }) {
    return this.usersService.login(email, password);
  }

 

  









}
