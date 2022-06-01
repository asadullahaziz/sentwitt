const mongoose = require("mongoose");
const Tweet = require("./tweet");

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
}, {timestamps: true});

analysisSchema.pre("remove", async function(next) {
    const res = await Tweet.deleteMany({analysisId: this._id});
    next();
});

module.exports = mongoose.model("Analysis", analysisSchema);