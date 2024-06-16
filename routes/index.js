var express = require("express");
var router = express.Router();
const productController = require("../controllers/product.controller");

// get all Products
router.get("/products", productController.findAll);

// get a Product by id
router.get("/products/:id", productController.findOne);

// add a new Product
router.post("/products", productController.create);

// update a Product by id
router.put("/products/:id", productController.update);

// remove a Product by id
router.delete("/products/:id", productController.delete);

// remove all Products
router.delete("/products", productController.deleteAll);

module.exports = router;