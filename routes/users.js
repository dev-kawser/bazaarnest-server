const express = require("express");
const { postUser, getUserByEmail } = require("../controllers/userControllers");
const router = express.Router();

router.post("/", postUser);
router.get("/:email", getUserByEmail);

module.exports = router;