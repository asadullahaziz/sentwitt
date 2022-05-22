const mongoose = require("mongoose");

let analysisSchema = mongoose.Schema({
    queryType: {
        type: String,
        required: true
    },
    query: {
        type: String,
        require: true
    },
    limit: {
        type: Number,
        required: true
    },
    startDate: {
        type: Date
    },
    endDate: {
        type: Date
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    }
}, {timeStamps: true});

module.exports = mongoose.model("Analysis", analysisSchema);