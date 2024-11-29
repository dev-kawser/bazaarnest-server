const { client, ObjectId } = require("../config/database")
const blogsCollection = client.db("hektoDB").collection("blogs");

// get all blog
exports.getAllBlogs = async (req, res) => {
    try {
        const blogs = await blogsCollection.find().toArray();
        res.status(200).json(blogs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};