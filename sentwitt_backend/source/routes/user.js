const express = require("express");
const router = express.Router();
const User = require("../models/user");
const OTP = require("../models/OTP");
const auth = require("../middleware/auth");
const mailOTP = require("../utils/mail");

// Create
router.post("/user", async (req, res) => {
    try {
        // check if code is in database
        await OTP.checkOTP(req.body.email, req.body.code);
        
        // Create new user
        let user = new User(req.body);
        let token = await user.generateAuthToken();
        res.status(201).send({user, token});
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Read
router.get("/user", auth, async (req, res) => {
    res.send(req.user);
});

// Update
router.patch("/user", auth,  async (req, res) => {
    try{
        let user = req.user;
        
        let userUpdatekeys = Object.keys(req.body);
        userUpdatekeys.forEach((key) => user[key] = req.body[key]);
        let updatedUser = await user.save();
        
        res.status(200).send(updatedUser);
    }
    catch(error) {
        res.status(400).send(error.message);
    }
});

// Delete
router.delete("/user", auth, async (req, res) => {
    try {
        await req.user.remove();
        res.status(200).send(req.user);
    }
    catch(error) {
        res.status(500).send(error.message);
    }
});

// Authentication
router.post("/login", async (req, res) => {
    try {
        let user = await User.findByCredentials(req.body.email, req.body.password);
        let token = await user.generateAuthToken();
        res.status(201).send({user, token});
    } catch (error) {
        res.status(400).send("Either Username or Email is incorrect");
    }
});

router.post("/logout", auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter(token => token.token !== req.token);
        await req.user.save();
        
        res.status(200).send({message: "Logged Out"});
    }
    catch(error) {
        res.status(500).send({error: error.message});
    }
});

router.post("/logoutAll", auth, async (req, res) => {
    try {
        req.user.tokens = [];
        await req.user.save();
        
        res.send({message: "Logged out of all sessions"});
    }
    catch(error) {
        res.status(500).send({error: error.message});
    }
});

router.post("/varifyEmail", async (req, res) => {
    try {
        // generating random 4 digit number
        const code = Math.floor(Math.random() * (9999 - 1000) + 1000);
        
        // save OTP for compare
        let otp = await OTP.updateOne({email: req.body.email}, {email: req.body.email, code: code}, {upsert: true});
        if(!otp) {
            throw new Error("Code already sent");
        }
        
        // email user
        let result = mailOTP(req.body.email, code);
        
        res.status(200).send({message: "Code has been sent to your email address at " + req.body.email});
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.post("/resetPassword", async (req, res) => {
    try {
        // varifying email
        let user = await User.findOne({email: req.body.email});
        if(!user){
            throw new Error("No user registered with the provided Email Address.");
        }

        // check if code is in database
        await OTP.checkOTP(req.body.email, req.body.code);
        
        // update password
        user.password = req.body.password;
        user.save();
        
        res.status(200).send({message: "Password has been reset. Please login in with new password."});
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;