const fs = require("fs");
const asyncHandler = require("express-async-handler");

const {
  cloudinaryUploadImg,
  cloudinaryDeleteImg,
} = require("../utils/cloudinary");
const validateMongoDbId = require("../utils/validateMongodbId");
const productModel = require("../models/productModel");
const uploadImages = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    validateMongoDbId(id);
    var findpro = await productModel.findById(id);
    const uploader = (path) => cloudinaryUploadImg(path, "images");
    const urls = [];
    const files = req.files;
    for (const file of files) {
      const { path } = file;
      const newpath = await uploader(path);
      findpro.images.push(newpath.url);
      urls.push(newpath);
      fs.unlinkSync(path);
    }
    const images = urls.map((file) => {
      return file;
    });
    await findpro.save();
    res.json(findpro);
  } catch (error) {
    throw new Error(error);
  }
});
const deleteImages = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = cloudinaryDeleteImg(id, "images");
    res.json({ message: "Deleted" });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  uploadImages,
  deleteImages,
};
