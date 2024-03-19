import { Router } from "express";
import Product from "../database/model/product.js";
import EshopError from "../error/error.js";
import Logger from "../logs/logger.js";
import isEmployee from "../middleware/is_employee.js";
import { validateProduct } from "../middleware/validation/index.js";
import { addProduct } from "../service/product_service.js";

const router = Router();

router.get("/", isEmployee, async (req, res, next) => {
  try {
    const allProducts = await Product.find();
    if (!allProducts.length)
      throw new EshopError("No products found in database", 404);
    res.json(allProducts);
  } catch (e) {
    next(e);
  }
});

router.get("/new", async (req, res, next) => {
  try {
    const today = new Date();
    today.setUTCDate(today.getUTCDate() - 14);
    const newProducts = await Product.find({
      "added.on": { $lte: new Date(), $gte: today },
    });
    if (!newProducts.length)
      throw new EshopError("No products found in the requested category", 404);
    Logger.info("retrieved products");
    res.json(newProducts);
  } catch (e) {
    next(e);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    console.log(req.params.id);
    const product = await Product.findById({ _id: req.params.id });
    if (!product) throw new EshopError("Product Not Found", 404);
    res.json(product);
  } catch (e) {
    next(e);
  }
});

router.get("/desktops/home&office", async (req, res, next) => {
  try {
    const desktops = await Product.find({
      $and: [
        { category: { $regex: /desktop/i } },
        { subCategory: { $in: [/home/i, /office/i] } },
      ],
    });
    if (!desktops.length)
      throw new EshopError("No products found in the requested category", 404);
    res.json(desktops);
  } catch (e) {
    next(e);
  }
});

router.get("/desktops/gaming", async (req, res, next) => {
  try {
    const desktops = await Product.find({
      category: { $regex: /desktop/i },
      subCategory: { $regex: /gaming/i },
    });
    if (!desktops.length)
      throw new EshopError("No products found in the requested category", 404);
    res.json(desktops);
  } catch (e) {
    next(e);
  }
});

router.get("/laptops/all-laptops", async (req, res, next) => {
  try {
    const laptops = await Product.find({
      category: { $regex: /laptop/i },
    });
    if (!laptops.length)
      throw new EshopError("No products found in the requested category", 404);
    res.json(laptops);
  } catch (e) {
    next(e);
  }
});
router.get("/laptops/gaming", async (req, res, next) => {
  try {
    const laptops = await Product.find({
      category: { $regex: /laptop/i },
      subCategory: { $regex: /gaming/i },
    });
    if (!laptops.length)
      throw new EshopError("No products found in the requested category", 404);
    res.json(laptops);
  } catch (e) {
    next(e);
  }
});

router.get("/hardware/:subcategory", async (req, res, next) => {
  try {
    const hardware = await Product.find({
      category: "hardware",
      subCategory: new RegExp(req.params.subcategory, "i"),
    });
    if (!hardware.length)
      throw new EshopError("No products found in the requested category", 404);
    res.json(hardware);
  } catch (e) {
    next(e);
  }
});

router.get("/periphery/:subcategory", async (req, res, next) => {
  try {
    const periphery = await Product.find({
      category: "periphery",
      subCategory: new RegExp(req.params.subcategory, "i"),
    });
    if (!periphery.length)
      throw new EshopError("No products found in the requested category", 404);
    res.json(periphery);
  } catch (e) {
    next(e);
  }
});

router.get("/search/:query", async (req, res, next) => {
  try {
    const searchName = await Product.find({
      name: new RegExp(req.params.query, "i"),
    });
    const searchTags = await Product.find({
      tags: new RegExp(req.params.query, "i"),
    });
    if (!searchName.length && !searchTags.length)
      throw new EshopError("No products found", 404);
    if (searchName.length) {
      res.json(searchName);
    } else {
      res.json(searchTags);
    }
  } catch (e) {
    next(e);
  }
});

router.post("/", isEmployee, validateProduct, async (req, res, next) => {
  try {
    const id = req.user?._id;
    if (!id) throw new EshopError("Must have user id / must be logged in", 401);
    const savedProduct = await addProduct(req.body, id);
    Logger.verbose("added a new product");
    res.json({ product: savedProduct });
  } catch (e) {
    next(e);
  }
});

router.delete("/:id", isEmployee, async (req, res, next) => {
  try {
    const { id } = req.params;
    const productToDelete = await Product.findOneAndDelete({ _id: id });
    if (!productToDelete)
      throw new EshopError("Product to be deleted not found", 404);
    Logger.verbose("the product has been deleted");
    return res.json(productToDelete);
  } catch (e) {
    next(e);
  }
});

router.put("/:id", isEmployee, async (req, res, next) => {
  try {
    const savedProduct = await Product.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    if (!savedProduct)
      throw new EshopError("Product to be updated not found", 404);
    Logger.info("Product has been updated");
    res.json(savedProduct);
  } catch (e) {
    next(e);
  }
});

export { router as productsRouter };
