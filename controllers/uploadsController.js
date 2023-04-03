const path = require('path');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');

const uploadProductImage = async (req, res) => {
  //  const result await cloudinary.uploader.upload(filepath, options) 
  const result = await cloudinary.uploader.upload(
    req.files.image.tempFilePath,
    {
      use_filename: true, // use original filename
      folder: 'file-upload', // folder name in cloudinary
    }
  );
  fs.unlinkSync(req.files.image.tempFilePath); // delete temp file
  return res.status(StatusCodes.OK).json({ src: result.secure_url });
  // result.secure_url is the url of the uploaded image
};

module.exports = {
  uploadProductImage,
};
