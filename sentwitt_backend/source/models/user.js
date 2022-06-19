const mongoose = require("mongoose");
const { isEmail } = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Analysis = require("../models/analysis");

let userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate(val) {
            if(!isEmail(val)) {
                throw new Error("Invalid input");
            }
        }
    },
    phoneNo: {
        type: String,
    },
    password: {
        type: String,
        required: true,
        min: 8
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
});

// Schema Virtual Obj
userSchema.virtual("analyses", {
    ref: "Analysis",
    localField: "_id",
    foreignField: "user"
});


// Schema Helper Methods
userSchema.static("findByCredentials", async function(email, password) {
    const user = await this.findOne({email});
    
    if(!user) {
        throw new Error("User not found")
    }
    
    const isMatch = await bcrypt.compare(password, user.password);
    
    if(!isMatch) {
        throw new Error("Invalid Password");
    }
    
    return user;
});

// Model Helper Methods
userSchema.method("generateAuthToken", async function() {
    let token = jwt.sign({_id: this._id}, process.env.SECRET_KEY);
    this.tokens.push({ token });
    await this.save();
    return token;
});

userSchema.method("toJSON", function() {
    let user = this.toObject();
    delete user.password;
    delete user.tokens
    return user;
});

// Schema Middle Ware
userSchema.pre("save", async function(next) {
    if(this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 8);
    }
    next();
});

userSchema.pre("remove", async function(next) {
    await Analysis.deleteMany({user: this._id});
    next();
});

module.exports = mongoose.model("User", userSchema);