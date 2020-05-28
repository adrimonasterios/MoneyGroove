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

  async getAll(userId) {
    try {
      const bills = await Bill.find({userId}).sort({date: 'desc'});
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

  async getShoppingListData(userId) {
    try{
      let shoppingListData = [
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
            _id: '$newItems._id',
            name: { $first: '$newItems.name' },
            brand: { $first: '$newItems.brand' },
            detail: { $first: '$newItems.detail' },
            datesPurchased: { $push: '$date'},
            stores: { $push: '$store'},
            prices: { $push: { $toInt: '$items.price'}},
            quantities: { $push: { $toInt: '$items.quantity'}}
          }
        }
      ]

      let data = await Bill.aggregate(shoppingListData)
      let adjustedData = data.map((product, i) => {
        let newProduct = {
          _id: product._id,
          name: product.name,
          brand: product.brand,
          detail: product.detail,
        }
        let cheapestIndex = product.prices.indexOf(Math.min(...product.prices))
        const oneDay = 24 * 60 * 60 * 1000;
        let avgDiffDays = 0
        let sortedDates = product.datesPurchased.sort((a, b) => b - a)
        const avgQuantity = product.quantities.reduce((a, b) => a + b, 0)/product.quantities.length

        function getDaysBetweenDates(a, b){
          return Math.round(Math.abs((a - b) / oneDay))
        }
        if(sortedDates.length > 1){
          let daysBetweenDates = []
          for(let i = 1; i < sortedDates.length; i++){
            let date1 = new Date(sortedDates[i])
            let date2 = new Date(sortedDates[i-1])
            let days = getDaysBetweenDates(date1, date2)
            daysBetweenDates.push(days)
          }
          avgDiffDays = (daysBetweenDates.reduce((a, b) => a + b, 0)/daysBetweenDates.length)/avgQuantity
        }

        function getStatus(){
          if(avgDiffDays === 0) return 0
          let today = new Date()
          let daysBetweenTodayAndLastPurchase = getDaysBetweenDates(today, sortedDates[0])
          return avgDiffDays - daysBetweenTodayAndLastPurchase
        }
        //
        // function getStatus(){
        //   let today = new Date()
        //   let daysBetweenTodayAndLastPurchase = getDaysBetweenDates(today, sortedDates[0])
        //   if(daysBetweenTodayAndLastPurchase - avgDiffDays <= 0){
        //     return 3
        //   }else if(daysBetweenTodayAndLastPurchase - avgDiffDays <= 7){
        //     return 2
        //   }else{
        //     return 1
        //   }
        // }


        newProduct.cheapestStore = product.stores[cheapestIndex]
        newProduct.cheapestPrice = product.prices[cheapestIndex]
        newProduct.daysBetweenPurchases = avgDiffDays
        newProduct.lastPurchase = sortedDates[0]
        newProduct.priority = getStatus()
        return newProduct
      })
      return adjustedData
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
