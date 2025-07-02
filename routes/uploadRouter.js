import express from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const upload = multer({ dest: "uploads/" });

const router = express.Router();

router.post("/upload", upload.single("image"), async (req, res) => {
  try {
    const filePath = req.file.path;
    const resp = await cloudinary.uploader.upload(filePath, {
      folder: "techshop",
    });
    fs.unlinkSync(req.file.path);
    res.send({
      success: true,
      url: resp.secure_url,
    });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

export default router;
