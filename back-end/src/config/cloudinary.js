const { v2: cloudinary } = require('cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const mimeTypes = require('./mime-types.json');
require('dotenv').config();

cloudinary.config({
    cloud_name: "dyu31lex6",
    api_key: "841832216343517",
    api_secret: "lWsoZ-AxWoqimVstAUBQa4h9c6U",
});

const storage =
    new CloudinaryStorage({
        cloudinary: cloudinary,
        params: {
            folder: "image",
            allowed_formats: mimeTypes.allowed_formats,
        },
    });

module.exports = { cloudinary, storage };