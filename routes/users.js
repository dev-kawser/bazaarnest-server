const express = require("express");
const { postUser, getUserByEmail, updateUser } = require("../controllers/userControllers");
const router = express.Router();

router.post("/", postUser);
router.get("/:email", getUserByEmail);
router.put("/updateUser/:id", updateUser);

module.exports = router;