const { client, ObjectId } = require("../config/database")
const ordersCollection = client.db("bazaarNestDB").collection("orders");

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

// Get all orders
exports.getAllOrders = async (req, res) => {
    try {
        const result = await ordersCollection.find().toArray();
        res.json(result);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch orders" });
    }
}

// Get orders by user email
exports.getOrdersByEmail = async (req, res) => {
    try {
        const email = req.params.email;
        const query = { email };
        const result = await ordersCollection.find(query).toArray();

        if (result.length === 0) {
            return res.status(404).json({ message: "No orders found for this user" });
        }

        res.json(result);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch orders" });
    }
}

// Update order status
exports.updateOrderStatus = async (req, res) => {
    try {
        const { orderId, newStatus } = req.body;

        if (!ObjectId.isValid(orderId)) {
            return res.status(400).json({ message: "Invalid order ID" });
        }

        const filter = { _id: new ObjectId(orderId) };
        const update = { $set: { status: newStatus } };

        const result = await ordersCollection.updateOne(filter, update);

        if (result.modifiedCount === 0) {
            return res.status(404).json({ message: "Order not found or status not updated" });
        }

        res.json({ message: "Order status updated successfully", result });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to update order status" });
    }
};

// Get order by id
exports.getOrderById = async (req, res) => {
    try {
        const orderId = req.params.id;

        if (!ObjectId.isValid(orderId)) {
            return res.status(400).json({ message: "Invalid order ID" });
        }

        const result = await ordersCollection.findOne({ _id: new ObjectId(orderId) });

        if (!result) {
            return res.status(404).json({ message: "Order not found" });
        }

        res.json(result);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch order" });
    }
}
