const { cloudinary } = require('../../../config/cloudinary');

const uploadFileToCloudinary = async (filePath, folder) => {
    try {
        const result = await cloudinary.uploader.upload(filePath, { folder });
        return result.secure_url;
    } catch (error) {
        console.error('Error uploading file to Cloudinary:', error.message);
        throw new Error('Failed to upload file to Cloudinary.');
    }
};

const uploadFilesToCloudinary = async (files, folder) => {
    try {
        const uploadPromises = files.map(({ path }) => uploadFileToCloudinary(path, folder));
        return await Promise.all(uploadPromises);
    } catch (error) {
        console.error('Error uploading multiple files to Cloudinary:', error.message);
        throw new Error('Failed to upload files to Cloudinary.');
    }
};

module.exports = { uploadFileToCloudinary, uploadFilesToCloudinary };
