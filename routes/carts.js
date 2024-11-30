const express = require("express");
const { addCart } = require("../controllers/cartsControllers");
const router = express.Router();

router.post('/', addCart);

module.exports = router;