const mongoose = require("mongoose");

let tweetSchema = mongoose.Schema({
    tweetUserName: {
        type: String,
        required: true
    },
    tweetId: {
        type: Number,
        required: true
    },
    tweetDate: {
        type: Date
    },
    tweetContent: {
        type: String,
        required: true
    },
    tweetUrl: {
        type: String
    },
    sentiment: {
        type: Number
    },
    analysisId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Analysis"
    }
});

module.exports = mongoose.model("Tweet", tweetSchema);