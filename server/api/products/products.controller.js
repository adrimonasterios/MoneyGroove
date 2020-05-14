const mongoose = require('mongoose');
const Product = require("./Product");

class UsersController {
  async create(data) {
    try {
      const created = await Product.create(data);
      return created;
    } catch (err) {
      console.log(`Error while creating Product: ${err}`);
      throw err;
    }
  }

  async getAll() {
    try {
      const products = await Product.find();
      return products;
    } catch (err) {
      console.log(`Error while getting Products: ${err}`);
      throw err;
    }
  }
}

module.exports = new UsersController();
