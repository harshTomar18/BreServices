import multer from 'multer';

// Use in-memory storage to pipe buffer directly to Cloudinary without writing to disk
const storage = multer.memoryStorage();

// Validate image file types
const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
    'image/gif',
    'image/svg+xml',
  ];

  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error(
        `Invalid file format: ${file.mimetype}. Only JPEG, PNG, WEBP, GIF, and SVG images are allowed.`
      ),
      false
    );
  }
};

const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB max limit
  },
  fileFilter,
});

export const uploadSingleImage = (fieldName = 'image') => upload.single(fieldName);

export const uploadMultipleImages = (fieldName = 'images', maxCount = 5) =>
  upload.array(fieldName, maxCount);
