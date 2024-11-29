const express = require("express");
const { getAllBlogs } = require("../controllers/blogsControllers");
const router = express.Router();

router.get('/', getAllBlogs);

module.exports = router;