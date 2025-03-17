import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import * as bcrypt from "bcrypt";

@Schema()
export class User extends Document {
    @Prop({ unique: true, required: true })
    userName: string;

    @Prop({ unique: true, required: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop()
    timestamp: Date;
}

// Create Mongoose Schema
export const UserSchema = SchemaFactory.createForClass(User);

// Hash password before saving
UserSchema.pre<User>("save", async function (next) {
    if (!this.isModified("password")) return next();
    
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});
