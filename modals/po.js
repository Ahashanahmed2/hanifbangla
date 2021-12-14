const mongoose = require("mongoose");
let po = new mongoose.Schema(
  {
   
 
    output: Number,
    inputId:{type:mongoose.Types.ObjectId,ref:'Input'},
    date: String
  },

  {
    timestamps: true,
  }
);

let modal = mongoose.model("Po", po);

module.exports = modal;
