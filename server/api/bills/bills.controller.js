const mongoose = require('mongoose');
const Bill = require("./Bill");

class BillsController {
  async create(data) {
    try {
      console.log('and now');
      console.log(data);
      const created = await Bill.create(data);
      return created;
    } catch (err) {
      console.log(`Error while creating Bills: ${err}`);
      throw err;
    }
  }

  async getAll() {
    try {
      const bills = await Bill.find();
      return bills;
    } catch (err) {
      console.log(`Error while getting Billss: ${err}`);
      throw err;
    }
  }
}

module.exports = new BillsController();
