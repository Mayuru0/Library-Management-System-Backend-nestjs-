import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document } from "mongoose"


@Schema()
export class Books extends Document {
    @Prop({required: true})
    Title: string

    @Prop({required: true})
    Author: string

    @Prop({required: true})
    Book: string

    @Prop({required: true})
    Genre: string

    @Prop({required: true})
    Description: string

    @Prop({required: true})
    Cover_Image: string
  


}


export const BooksSchema = SchemaFactory.createForClass(Books)