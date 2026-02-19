require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");

const User = require("./models/user");
const Message = require("./models/message");

const app = express();

// ==============================
// MIDDLEWARE
// ==============================
app.use(cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000"
}));


app.use(express.json());

// ==============================
// MONGODB CONNECTION (PRODUCTION SAFE)
// ==============================
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB Connected");
    })
    .catch((err) => {
        console.log("MongoDB Error:", err);
    });

// ==============================
// TEST ROUTE
// ==============================
app.get("/", (req, res) => {
    res.send("Server Running");
});

// ==============================
// CREATE FEEDBACK LINK
// ==============================
app.post("/create", async (req, res) => {
    try {
        console.log("Create Link Request:", req.body);

        const linkId = uuidv4();

        const newUser = await User.create({
            username: req.body.username,
            linkId
        });

        res.json(newUser);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
});

// ==============================
// SEND ANONYMOUS MESSAGE
// ==============================
app.post("/message", async (req, res) => {
    try {
        const newMessage = await Message.create({
            linkId: req.body.linkId,
            text: req.body.text
        });

        res.json(newMessage);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ==============================
// GET ALL MESSAGES
// ==============================
app.get("/messages/:id", async (req, res) => {
    try {
        const messages = await Message.find({
            linkId: req.params.id
        });

        res.json(messages);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ==============================
// DELETE MESSAGE
// ==============================
app.delete("/message/:id", async (req, res) => {
    try {
        console.log("Delete Request:", req.params.id);

        const deleted = await Message.findOneAndDelete({
            _id: req.params.id
        });

        console.log("Deleted Result:", deleted);

        res.json({ success: true, deleted });
    } catch (err) {
        console.log("Delete Error:", err);
        res.status(500).json({ error: err.message });
    }
});

// ==============================
// START SERVER
// ==============================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});


