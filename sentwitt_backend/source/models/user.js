const mongoose = require("mongoose");
const { isEmail } = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

let UserSchema = mongoose.Schema({
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
        type: Number,
    },
    password: {
        type: String,
        required: true,
        min: 6
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
UserSchema.static("findByCredentials", async function(email, password) {
    const user = this.findOne({email});
    
    if(!user) {
        throw new Error("User not found")
    }
    
    let isMatch = await bcrypt.compare(password, user.compare);
    
    if(!isMatch) {
        throw new Error("Invalid Password");
    }
    
    return user;
});

// Model Helper Methods
UserSchema.method("generateAuthToken", async function() {
    let token = jwt.sign({_id: this._id}, process.env.SECRET_KEY);
    this.tokens.push({ token });
    await this.save();
    return token;
});

UserSchema.method("toJSON", function() {
    let user = this.toObject();
    delete user.password;
    delete user.tokensl
    return user;
});

// Schema Middle Ware
UserSchema.pre("save", async function(next) {
    if(this.isModified("password")) {
        this.password = bcrypt.hash(this.password, 8);
    }
    next();
});

module.exports = mongoose.model("User", UserSchema);