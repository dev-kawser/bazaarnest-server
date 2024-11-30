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

// GET /carts by user email
exports.getCartsByUserEmail = async (req, res) => {
    try {
        const email = req.params.email;
        const carts = await cartsCollection
            .find({ "cartData.email": email })
            .toArray();

        res.json(carts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// DELETE /carts by user email
exports.deleteCartsByUserEmail = async (req, res) => {
    try {
        const email = req.params.email;
        // Perform the deletion based on the user's email
        const result = await cartsCollection.deleteMany({ "cartData.email": email });

        // Respond with success or no records deleted
        res.json({ message: result.deletedCount > 0 ? "Carts deleted successfully" : "No carts found to delete" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// PATCH /carts/:cartId
exports.updateCartQuantity = async (req, res) => {
    try {
        const { cartId } = req.params;
        const { newQuantity } = req.body;

        // Validate newQuantity
        if (newQuantity < 1) {
            return res.status(400).json({ message: "Quantity must be at least 1" });
        }

        // Update quantity in the database
        const result = await cartsCollection.updateOne(
            { _id: new ObjectId(cartId) },
            { $set: { "cartData.productQuantity": newQuantity } }
        );

        // Check if the update was successful
        if (result.matchedCount === 0) {
            return res.status(404).json({ message: "Cart item not found" });
        }

        res.json({ message: "Cart updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};
