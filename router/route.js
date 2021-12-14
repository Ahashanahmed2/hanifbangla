const createError = require("http-errors");

const Inp = require("../modals/input");
const Po = require("../modals/po");
const moment = require("moment-timezone");

exports.index = async (req, res) => {
  let poID = await Inp.find({}).populate("poId", "output").sort('-createdAt');

  res.render("index", { ipId: poID });
};

exports.new_po = async (req, res, next) => {
  try {
    let aa = await new Inp({
      po: req.body.po,

      total: req.body.total,
      date: moment.tz("Asia/Kuala_Lumpur").format("ll"),
    });
    let ipId = await aa.save();

    res.redirect("/");
  } catch (err) {
    res.json({ message: err.message });
  }
};

exports.search = async (req, res, next) => {
  let search = req.body.search;
  await Inp.find({
    $or: [
      { po: search },
      { rate: search },
      { card: search },
      { color: search },
    ],
  })
    .then((value) => {
      res.send(value);
    })
    .catch((err) => {
      res.json({ errors: err.message });
    });
};

exports.card = async (req, res, next) => {
  let id = req.body.id;

  try {
    let card = await Inp.find({ _id: id });

    res.send(card);
  } catch (err) {
    res.json({ errors: err.message });
  }
};
exports.row_id = async (req, res, next) => {
  let out = req.body.id;
  await Inp.findByIdAndUpdate({ _id: out }, req.body);

  res.send();
};


exports.out_id = async (req, res, next) => {
  let out = req.body.id;
  await Inp.findByIdAndUpdate({ _id: out }, req.body);

  res.send();
};
exports.row_I = async (req, res, next) => {
  let row = req.body.id;

  let po = await new Po({
    output: req.body.output,
    inputId: row,
    date:moment.tz("Asia/Kuala_Lumpur").format("ll"),
  });
  let poI = await po.save();

  await Inp.findByIdAndUpdate({ _id: row }, { $push: { poId: poI } });


  res.send();
};

exports.po = async (req, res, next) => {
  let id = req.body.id;
  await Po.find({ inputId: id })
    .sort("-createdAt")
    .populate("inputId")

    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.json({ errors: err.message });
    });
};

exports.del = async (req, res, next) => {
  let delId = req.body.id;
  try {
    let delI = await Po.findOneAndDelete({ _id: delId })
res.send(delI)

  }
  
  catch (err) {
    res.json({message:err.message})
  }
  
};

exports.row_delete = async (req, res, next)=>{
  let id = req.body.id
  try {
    await Inp.findOneAndDelete({ _id: id })
      await Po.deleteMany({inputId:id})
      .then(data => {
      res.send(data)
    })
      .catch(err => {
      res.json(err)
    })
  }
  catch (err) {
    res.json({error:err.message})
  }
}

