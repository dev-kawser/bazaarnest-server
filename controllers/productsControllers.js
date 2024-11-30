const { client, ObjectId } = require("../config/database")
const productsCollection = client.db("hektoDB").collection("products");

// get all products
exports.getAllProducts = async (req, res) => {
    try {
        const products = await productsCollection.find().toArray();
        res.status(200).json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching products" });
    }
};