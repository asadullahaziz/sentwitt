const mongoose = require("mongoose");

const dbURL = process.env.DB_URL;
const dbName = process.env.DB_NAME;

mongoose.connect(dbURL + dbName);