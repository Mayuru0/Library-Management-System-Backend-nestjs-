import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import * as path from 'path';

export const storage = diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === 'Book') {
      cb(null, './uploads/books');
    } else if (file.fieldname === 'Cover_Image') {
      cb(null, './uploads/covers');
    } else {
      cb(null, './uploads/others');
    }
  },
  filename: (req, file, cb) => {
    const fileExt = path.extname(file.originalname);
    const fileName = `${uuidv4()}${fileExt}`;
    cb(null, fileName);
  },
});

export const fileFilter = (req, file, cb) => {
  if (file.fieldname === 'Book' && file.mimetype !== 'application/pdf') {
    return cb(new Error('Only PDFs are allowed for book uploads'), false);
  }
  if (file.fieldname === 'Cover_Image' && !file.mimetype.startsWith('image/')) {
    return cb(new Error('Only images are allowed for cover uploads'), false);
  }
  cb(null, true);
};

export const multerOptions = {
  storage,
  fileFilter,
};
