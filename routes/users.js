const express = require("express");
const { postUser } = require("../controllers/userControllers");
const router = express.Router();

router.get("/users", postUser);

module.exports = router;