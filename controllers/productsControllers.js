const { client, ObjectId } = require("../config/database")
const productsCollection = client.db("bazaarNestDB").collection("products");

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

// get product by ID
exports.getProductById = async (req, res) => {
    const productId = req.params.id;

    try {
        const product = await productsCollection.findOne({ _id: new ObjectId(productId) });

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching product" });
    }
};