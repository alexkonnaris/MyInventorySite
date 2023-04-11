const Inventory = require("../models/inventory.model");

module.exports.createProduct = (req, res) => {
  Inventory.create(req.body)
    .then((product) => res.json(product))
    .catch((err) => res.json(err));
};

module.exports.getAllProducts = (req, res) => {
  Inventory.find({})
    .then((products) => {
      console.log(products);
      res.json(products);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
};

module.exports.getProduct = (req, res) => {
  Inventory.findOne({ _id: req.params.id })
    .then((product) => res.json(product))
    .catch((err) => res.json(err));
};

module.exports.updateProduct = (req, res) => {
  Inventory.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
    .then((updatedProduct) => res.json(updatedProduct))
    .catch((err) => res.json(err));
};

module.exports.deleteProduct = (req, res) => {
  Inventory.deleteOne({ _id: req.params.id })
    .then((deleteConfirmation) => res.json(deleteConfirmation))
    .catch((err) => res.json(err));
};
