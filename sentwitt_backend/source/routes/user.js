const express = require("express");
const router = express.Router();
const User = require("../models/user");
const auth = require("../middleware/auth");

// Create
router.post("/user", async (req, res) => {
    try {
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
        res.status(500).send(error.message);
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
        
        res.send({message: "Logged Out"});
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

module.exports = router;