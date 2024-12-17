const { uploadFilesToCloudinary } = require('../adapter/repositories/cloudinary/file');

class FileController {
    async uploadFiles(req, res) {
        try {
            const { files, body: { folder } } = req;

            if (!folder) {
                return res.status(400).json({ message: 'Folder is required for file upload.' });
            }

            if (!files || files.length === 0) {
                return res.status(400).json({ message: 'File(s) must be provided.' });
            }

            const uploadedUrls = await uploadFilesToCloudinary(files, folder);

            return res.status(200).json({ message: 'Files uploaded successfully.', urls: uploadedUrls });
        } catch (error) {
            console.error('Error in uploadFiles:', error.message);
            return res.status(500).json({ message: 'File upload failed.', error: error.message });
        }
    }
}

module.exports = new FileController();
