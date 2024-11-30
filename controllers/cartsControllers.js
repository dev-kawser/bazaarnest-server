const { client, ObjectId } = require("../config/database")
const cartsCollection = client.db("hektoDB").collection("carts");

// POST /carts
exports.addCart = async (req, res) => {
    try {
        const newCart = req.body;
        const result = await cartsCollection.insertOne(newCart);
        res.status(201).json({ message: "Cart created successfully", });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};