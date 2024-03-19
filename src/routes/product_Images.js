import { Router } from "express";
import path from "path";
import multer from "multer";
import Image from "../database/model/image.js";
import isEmployee from "../middleware/is_employee.js";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = Router();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../../public/images/products/"));
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(
      null,
      new Date().toISOString().slice(0, 10).replace(/:/g, "-") +
        `-${file.originalname}`
    );
  },
});
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const upload = multer({ storage: storage, fileFilter: fileFilter });

router.post(
  "/",
  isEmployee,
  upload.single("productImage"),
  async (req, res, next) => {
    try {
      const imageName =
        new Date().toISOString().slice(0, 10).replace(/:/g, "-") +
        `-${req.file.originalname}`;
      const image = new Image({
        originalName: req.file.originalname,
        newName: imageName,
        imageUrl: `http://localhost:5000/images/products/${imageName}`,
      });
      const savedImage = await image.save();
      console.log(savedImage);
      res.json(savedImage);
    } catch (e) {
      next(e);
    }
  }
);

export { router as productImagesRouter };
