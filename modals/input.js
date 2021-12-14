const mongoose = require("mongoose");
let inp = new mongoose.Schema(
  {

    po: String,
    rate: { type: String, default: 0 },
    card: { type: String, default: 0 },
    color: { type: String},
    total: { type: String},
   poId :[{type:mongoose.Types.ObjectId,ref:'Po'}],
    date: String
  },

  {
    timestamps: true,
  }
);

let modal = mongoose.model("Input", inp);

module.exports = modal;
