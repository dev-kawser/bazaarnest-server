const { client } = require("../config/database")
const usersCollection = client.db("hektoDB").collection("users");

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