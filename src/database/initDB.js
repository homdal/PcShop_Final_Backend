import Logger from "../logs/logger.js";
import User from "./model/user.js";
import authService from "../service/auth_service.js";
import Product from "./model/product.js";
import Order from "./model/order.js";
import { users } from "./initial_users.js";
import { products } from "./initial_products.js";
import { orders } from "./initial_orders.js";

const initDB = async () => {
  const usersCount = await User.countDocuments();
  const productCount = await Product.countDocuments();
  const orderCount = await Order.countDocuments();
  const tagOptions = [
    "name",
    "category",
    "subCategory",
    "manufacturer",
    "productModel",
    "color",
  ];
  if (usersCount != 0 && productCount != 0 && orderCount != 0) {
    return;
  }
  if (usersCount === 0) {
    for (let user of users) {
      const created = new User(user);
      created.password = await authService.hashPassword(created.password);
      created.save();
      Logger.verbose("Added user:", created);
    }
  }
  if (productCount === 0) {
    const admin = await User.findOne({ isAdmin: true });
    for (let product of products) {
      product.added.on = new Date();
      product.added.by = admin._id;
      if (product.category === "desktop") {
        product.imageUrl =
          "http://localhost:5000/images/products/2024-02-27-alienware.jpg";
      }
      if (product.category === "laptop") {
        product.imageUrl =
          "http://localhost:5000/images/products/2024-03-05-laptop.jpg";
      }
      if (product.category === "hardware") {
        product.imageUrl =
          "http://localhost:5000/images/products/2024-03-05-hardware.jpg";
      }
      if (product.category === "periphery") {
        product.imageUrl =
          "http://localhost:5000/images/products/2024-03-05-periphery.jpg";
      }
      for (let option of tagOptions) {
        if (product[option]) {
          product.tags.push(product[option]);
        }
      }
      if (product.specifications[0]) {
        for (let spec of product.specifications) {
          product.tags.push(spec.specDesc);
        }
      }
      const saved = await new Product(product).save();
    }
    Logger.verbose("Added products to database");
  }
  if (orderCount === 0) {
    const products = [];
    const product1 = await Product.findOne({ category: "desktop" });
    const product2 = await Product.findOne({ category: "hardware" });
    const product3 = await Product.findOne({ category: "periphery" });
    const user = await User.findOne({});
    products.push(product1, product2, product3);
    let count = 0;
    for (let order of orders) {
      order.items.push({
        productId: products[count]._id.toString(),
        name: products[count].name,
        quantity: 1,
        pricePer: products[count].price,
        priceCol: products[count].price * 1,
      });
      order.total = products[count].price * 1;
      order.userId = user._id.toString();
      const saved = await new Order(order).save();
      count++;
    }
  }
  Logger.verbose("Added orders to database");
};

export { initDB };
