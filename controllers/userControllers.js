const { client, ObjectId } = require("../config/database")
const usersCollection = client.db("bazaarNestDB").collection("users");

// Post a new user
exports.postUser = async (req, res) => {
    try {
        const user = req.body;
        const query = { email: user.email };

        // Check if user already exists
        const existingUser = await usersCollection.findOne(query);
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Insert user
        const result = await usersCollection.insertOne(user);
        res.status(201).json({ message: "User created successfully", insertedId: result.insertedId });
    } catch (error) {
        console.error("Error inserting user:", error);
        res.status(500).json({ message: "Error creating user", error });
    }
};

// Get a user by email
exports.getUserByEmail = async (req, res) => {
    try {
        const email = req.params.email;
        const query = { email };
        const user = await usersCollection.findOne(query);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error("Error fetching user by email:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Update a user data
exports.updateUser = async (req, res) => {
    try {
        const id = req.params.id;
        const update = { $set: req.body };

        const result = await usersCollection.updateOne({ _id: new ObjectId(id) }, update);

        if (result.modifiedCount === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User updated successfully" });
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Get all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await usersCollection.find().toArray();
        res.status(200).json(users);
    } catch (error) {
        console.error("Error fetching all users:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};