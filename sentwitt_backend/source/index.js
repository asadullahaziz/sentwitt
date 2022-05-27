// libs
require("dotenv").config();
const express = require("express");
const cors = require("cors");
require("./db");
const userRouter = require("./routes/user");
const analysisRouter = require("./routes/analysis");

// Vals
const app = express();
const port = process.env.PORT || 3000;

// Middle Ware
app.use(express.json());
app.use(cors());


// Routes
app.use(userRouter);
app.use(analysisRouter);

app.listen(port, () => {
    console.log("server is up on port: " + port);
});