const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/api/users/register", (req, res) => {
    const { username, email, password } = req.body;

    console.log("New registration:", username, email);

    res.status(201).json({
        message: "Registration successful!"
    });
});

app.listen(3000, () => {
    console.log("Backend running on port 3000");
});