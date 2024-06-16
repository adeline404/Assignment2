const Category = require("../models/category.model");

exports.create = (req, res) => {
  const category = new Category(req.body);
  category.save()
    .then(data => res.send(data))
    .catch(err => res.status(500).send({
      message: err.message || "Some error occurred while creating the category."
    }));
};

exports.findAll = (req, res) => {
  let name = req.query.name;
  let condition = name ? { name: { $regex: new RegExp(name, 'i') } } : {};
  Category.find(condition)
    .then(categories => res.send(categories))
    .catch(err => res.status(500).send({
      message: err.message || "Some error occurred while retrieving categories."
    }));
};

exports.findOne = (req, res) => {
  Category.findById(req.params.id)
    .then(category => {
      if (!category) return res.status(404).send({
        message: `Category not found with id ${req.params.id}`
      });
      res.send(category);
    })
    .catch(err => res.status(500).send({
      message: `Error retrieving category with id ${req.params.id}`
    }));
};

exports.update = (req, res) => {
  Category.findByIdAndUpdate(req.params.id, req.body, { useFindAndModify: false })
    .then(category => {
      if (!category) return res.status(404).send({
        message: `Category not found with id ${req.params.id}`
      });
      res.send({ message: "Category updated successfully." });
    })
    .catch(err => res.status(500).send({
      message: `Error updating category with id ${req.params.id}`
    }));
};

exports.delete = (req, res) => {
  Category.findByIdAndDelete(req.params.id)
    .then(category => {
      if (!category) return res.status(404).send({
        message: `Category not found with id ${req.params.id}`
      });
      res.send({ message: "Category deleted successfully!" });
    })
    .catch(err => res.status(500).send({
      message: `Could not delete category with id ${req.params.id}`
    }));
};

exports.deleteAll = (req, res) => {
  Category.deleteMany()
    .then(category => {
      res.send({ message: `${category.deletedCount} Categories deleted successfully!` });
    })
    .catch(err => res.status(500).send({
      message: "Some error occurred while removing all categories."
    }));
};