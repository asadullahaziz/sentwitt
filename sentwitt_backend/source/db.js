const mongoose = require("mongoose");

try {
    const dbURL = process.env.DB_URL;
    const dbName = process.env.DB_NAME;
    mongoose.connect(dbURL + dbName);
} catch (error) {
    console.log(error);
}