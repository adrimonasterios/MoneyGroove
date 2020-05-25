const mongoose = require('mongoose');
const Bill = require("./Bill");

class BillsController {
  async create(data) {
    try {
      console.log(JSON.stringify(data));
      const created = await Bill.create(data);
      console.log(JSON.stringify(created));
      return created;
    } catch (err) {
      console.log(`Error while creating Bills: ${err}`);
      throw err;
    }
  }

  async getAll(userId) {
    try {
      const bills = await Bill.find({userId});
      return bills;
    } catch (err) {
      console.log(`Error while getting Billss: ${err}`);
      throw err;
    }
  }

  async getMetrics(userId) {
    try{
      let monthlyTotals = [
        {
          $match: {userId: new mongoose.Types.ObjectId(userId)}
        },{
          $unwind: "$items"
        },{
          $group :
            {
              _id : { $month: "$date"},
              totalAmount: { $sum: { $toInt: "$items.price" } }
            }
         }
      ]

      let categoryShares = [
        {
          $match: {userId: new mongoose.Types.ObjectId(userId)}
        },
        { $unwind: "$items" },
        {
          $lookup:
          {
            from: "products",
            localField: "items._id",
            foreignField: "_id",
            as: "newItems"
          }
        },
        { $unwind: "$newItems" },
        {
          $group: {
            _id: '$newItems.category',
            total: {$sum: { $toInt: '$items.price'} },
            products: { $push: '$newItems.name' }
          }
        }
      ]
      let promises = [];

      promises.push(new Promise((resolve, reject) => {
        Bill.aggregate(monthlyTotals)
        .then(data => resolve(data))
        .catch(err => reject(err))
      }));

      promises.push(new Promise((resolve, reject) => {
        Bill.aggregate(categoryShares)
        .then(data => resolve(data))
        .catch(err => reject(err))
      }));

      let metrics = await Promise.all(promises)
      return metrics
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
