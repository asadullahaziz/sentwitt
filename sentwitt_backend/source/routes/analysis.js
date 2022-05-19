const express = require("express");
const router = express.Router();
const Analysis = require("../models/analysis");
const auth = require("../middleware/auth");

// Create
router.post("/analysis", auth, async (req, res) => {
    try {
        let analysis = new Analysis({
            ...req.body,
            user: req.user._id
        });
        // perfrom analysis request to microservice will be implementer here <<=====================
        await analysis.save();
        res.status(201).send(analysis);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Read
// read by id
router.get("/analysis/:id", auth, async (req, res) => {
    try {
        let analysis = await  Analysis.findOne({_id: req.params.id, user: req.user});
        if(!analysis) {
            throw new Error("No analysis found");
        }
        res.status(201).send(analysis);
    } catch (error) {
        res.status(400).send(error);
    }
});
// read all
router.get("/analysis", async (req, res) => {});

// Update

// Delete

module.exports = router;