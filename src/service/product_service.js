import Product from "../database/model/product.js";

const tagOptions = [
  "name",
  "category",
  "manufacturer",
  "productModel",
  "color",
];

const addProduct = async (data, userId) => {
  const product = new Product(data);
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
  product.added.by = userId;
  return product.save();
};

export { addProduct };
