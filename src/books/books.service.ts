import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose"; // Import Model from mongoose
import { Books } from "src/schemas/Books.schema";
import { CreateBooksDto } from "./dto/CreateBooks.dto";

@Injectable()
export class BooksService {
    constructor(
        @InjectModel(Books.name) private readonly bookModel: Model<Books>, 
    ) {}

    async createBook(createBookDto: CreateBooksDto) {
        const createdBook = new this.bookModel(createBookDto);
        return await createdBook.save();
    }


    getBooks() {
        return this.bookModel.find().exec();
    }

    getBookById(id: string) {
        return this.bookModel.findById(id).exec();
    }


     // Update a book by its ID
  async updateBook(id: string, updateBookDto: CreateBooksDto) {
    // Use the ID and update the book with the new data (DTO)
    return this.bookModel.findByIdAndUpdate(id, updateBookDto, { new: true });
  }



    deleteBook(id: string) {
        return this.bookModel.findByIdAndDelete(id).exec();
    }
   
}
