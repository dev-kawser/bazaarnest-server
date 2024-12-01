const { client, ObjectId } = require("../config/database")
const ordersCollection = client.db("hektoDB").collection("orders");

// Post orders
exports.postOrder = async (req, res) => {
    try {
        const newOrder = req.body;
        const result = await ordersCollection.insertOne(newOrder);
        res.status(201).json({ message: "Order created successfully", result });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to create order" });
    }
}