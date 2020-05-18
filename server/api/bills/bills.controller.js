const mongoose = require('mongoose');
const Bill = require("./Bill");

class BillsController {
  async create(data) {
    try {
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

  update(id, data) {
    return new Promise(function(resolve, reject) {
      Bill.findByIdAndUpdate(id, data, {
          runValidators: true
        })
        .then(bills => {
          resolve(data)
        })
        .catch(err => reject(err));
    });
  }

  async delete(ids) {
    return new Promise(function(resolve, reject) {
      Bill.remove({
          _id: {
            $in: ids
          }
        })
        .then(bills => resolve(bills))
        .catch(err => reject(err));
    });
  }
}

module.exports = new BillsController();
