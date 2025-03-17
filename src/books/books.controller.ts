import { Controller, Post, Body, UploadedFiles, UseInterceptors, Get, Param, Patch, Delete } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBooksDto } from './dto/CreateBooks.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/config/multer.config';
import { Express } from 'express';

@Controller('api/books')
export class BooksController {
  constructor(private booksService: BooksService) {}

  @Post('create')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'Book', maxCount: 1 },
        { name: 'Cover_Image', maxCount: 1 },
      ],
      multerOptions,
    ),
  )
  async createBook(
    @Body() createBookDto: CreateBooksDto,
    @UploadedFiles() files: { Book?: Express.Multer.File[]; Cover_Image?: Express.Multer.File[] },
  ) {
    if (files.Book && files.Book[0]) {
      createBookDto.Book = files.Book[0].filename;
    }
    if (files.Cover_Image && files.Cover_Image[0]) {
      createBookDto.Cover_Image = files.Cover_Image[0].filename;
    }
    return this.booksService.createBook(createBookDto);
  }


  @Get('get')
  async getBooks() {
    return this.booksService.getBooks();
  }

  @Get('get/:id')
  async getBookById(@Param('id') id: string) {
    return this.booksService.getBookById(id);
  }


  @Patch('update/:id')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'Book', maxCount: 1 },
        { name: 'Cover_Image', maxCount: 1 },
      ],
      multerOptions,
    ),
  )
  
  
  @Patch('update/:id')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'Book', maxCount: 1 },
        { name: 'Cover_Image', maxCount: 1 },
      ],
      multerOptions,
    ),
  )
  async updateBook(
    @Param('id') id: string,
    @Body() updateBookDto: CreateBooksDto,
    @UploadedFiles() files: { Book?: Express.Multer.File[]; Cover_Image?: Express.Multer.File[] },
  ) {
    // Check if files are provided and safely access them
    if (files) {
      if (files.Book && files.Book[0]) {
        updateBookDto.Book = files.Book[0].filename;
      }

      if (files.Cover_Image && files.Cover_Image[0]) {
        updateBookDto.Cover_Image = files.Cover_Image[0].filename;
      }
    }

    // Proceed with the update
    return this.booksService.updateBook(id, updateBookDto);
  }


@Delete('delete/:id')
async deleteBook(@Param('id') id: string) {
  return this.booksService.deleteBook(id);
}






}
