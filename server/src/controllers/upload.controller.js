import { uploadBufferToCloudinary, deleteFromCloudinary } from '../utils/cloudinary.js';

/**
 * Check if Cloudinary credentials are configured
 */
const checkCloudinaryConfig = () => {
  return Boolean(
    process.env.CLOUDINARY_CLOUD_NAME &&
    process.env.CLOUDINARY_API_KEY &&
    process.env.CLOUDINARY_API_SECRET
  );
};

/**
 * Handle single image upload to Cloudinary
 * @route POST /api/v1/upload/image
 */
export const uploadSingle = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Please provide an image file to upload (field name: "image")',
      });
    }

    if (!checkCloudinaryConfig()) {
      return res.status(500).json({
        success: false,
        message:
          'Cloudinary is not configured. Please set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET in server/.env',
      });
    }

    const folder = req.body.folder || process.env.CLOUDINARY_FOLDER || 'bre_services';
    const uploadResult = await uploadBufferToCloudinary(req.file.buffer, { folder });

    return res.status(200).json({
      success: true,
      message: 'Image uploaded successfully to Cloudinary',
      data: uploadResult,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Handle multiple image uploads to Cloudinary
 * @route POST /api/v1/upload/images
 */
export const uploadMultiple = async (req, res, next) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Please provide image files to upload (field name: "images")',
      });
    }

    if (!checkCloudinaryConfig()) {
      return res.status(500).json({
        success: false,
        message:
          'Cloudinary is not configured. Please set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET in server/.env',
      });
    }

    const folder = req.body.folder || process.env.CLOUDINARY_FOLDER || 'bre_services';

    const uploadPromises = req.files.map((file) =>
      uploadBufferToCloudinary(file.buffer, { folder })
    );

    const results = await Promise.all(uploadPromises);

    return res.status(200).json({
      success: true,
      message: `${results.length} images uploaded successfully to Cloudinary`,
      data: results,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete image from Cloudinary
 * @route DELETE /api/v1/upload/image
 */
export const deleteImage = async (req, res, next) => {
  try {
    const publicId = req.body.public_id || req.query.public_id;

    if (!publicId) {
      return res.status(400).json({
        success: false,
        message: 'Please provide the public_id of the image to delete',
      });
    }

    if (!checkCloudinaryConfig()) {
      return res.status(500).json({
        success: false,
        message:
          'Cloudinary is not configured. Please set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET in server/.env',
      });
    }

    const result = await deleteFromCloudinary(publicId);

    return res.status(200).json({
      success: true,
      message: 'Image deleted successfully from Cloudinary',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
