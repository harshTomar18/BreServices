import cloudinary from '../config/cloudinary.js';

/**
 * Upload a file buffer to Cloudinary using upload_stream
 * @param {Buffer} fileBuffer - The memory buffer of the uploaded file
 * @param {Object} options - Cloudinary upload options (folder, tags, etc.)
 * @returns {Promise<Object>} Cloudinary upload result
 */
export const uploadBufferToCloudinary = (fileBuffer, options = {}) => {
  return new Promise((resolve, reject) => {
    const uploadOptions = {
      folder: options.folder || process.env.CLOUDINARY_FOLDER || 'bre_services',
      resource_type: 'auto',
      ...options,
    };

    const stream = cloudinary.uploader.upload_stream(
      uploadOptions,
      (error, result) => {
        if (error) {
          return reject(error);
        }
        resolve({
          public_id: result.public_id,
          url: result.url,
          secure_url: result.secure_url,
          format: result.format,
          width: result.width,
          height: result.height,
          bytes: result.bytes,
        });
      }
    );

    stream.end(fileBuffer);
  });
};

/**
 * Delete an asset from Cloudinary by public_id
 * @param {string} publicId - Cloudinary public id
 * @param {string} resourceType - 'image', 'video', or 'raw'
 * @returns {Promise<Object>} Deletion result
 */
export const deleteFromCloudinary = async (publicId, resourceType = 'image') => {
  if (!publicId) return null;
  return cloudinary.uploader.destroy(publicId, {
    resource_type: resourceType,
  });
};
