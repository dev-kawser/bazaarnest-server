const express = require("express");
const { postUser } = require("../controllers/userControllers");
const router = express.Router();

router.post("/", postUser);

module.exports = router;