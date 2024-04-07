const mongoose = require("mongoose");
  const configSchema = new mongoose.Schema({
    product: Number,
    customer_id: String,
    type: String,
    desc: String,
    date: Date,
    brand_id:Number
  });


const UserActivity = mongoose.model("user-activity", configSchema);

module.exports = {UserActivity};
