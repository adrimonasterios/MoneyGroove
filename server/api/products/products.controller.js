const mongoose = require('mongoose');
const Product = require("./Product");

class ProductsController {
  async create(data) {
    try {
      const created = await Product.create(data);
      return created;
    } catch (err) {
      console.log(`Error while creating Product: ${err}`);
      throw err;
    }
  }

  async getAll(userId) {
    try {
      let projection = {
        name: 1,
        brand: 1,
        category:1,
        detail: 1,
      }
      const products = await Product.find({userId}, projection);
      return products;
    } catch (err) {
      console.log(`Error while getting Products: ${err}`);
      throw err;
    }
  }
}

module.exports = new ProductsController();
