// libs
const express = require("express");
require("./db");
const userRouter = require("./routes/user");
const analysisRouter = require("./routes/analysis");

// Vals
const app = express();
const port = process.env.PORT || 3000;

// Middle Ware
app.use(express.json());

// Routes
app.use(userRouter);
app.use(analysisRouter);

app.listen(port, () => {
    console.log("server is up on port: " + port);
});