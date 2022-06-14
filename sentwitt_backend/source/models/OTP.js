const mongoose = require("mongoose");

OTPschema = mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    code: {
        type: String,
        required: true
    }
}, {timestamps: true});

// Schema helper methods
OTPschema.static("checkOTP", async function(email, code, next) {
    let opt = await this.findOne({email, code});
    if(!opt) {
        throw new Error("Invalid code entered.");
    }
    
    this.remove();
    return true;
});

module.exports = mongoose.model("OPT", OTPschema);