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
        let analysis = await  Analysis.findOne({_id: req.params.id, user: req.user._id});
        if(!analysis) {
            throw new Error("No analysis found");
        }
        // Tweets will be fetched and send will be implemented here <<=====================
        res.status(201).send(analysis);
    } catch (error) {
        res.status(400).send(error);
    }
});
// read all
router.get("/analysis", auth, async (req, res) => {
    try {
        let analyses = await Analysis.find({user: req.user._id});
        if(!analyses) {
            throw new Error("No analysis found");
        }
        res.status(201).send(analyses);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Update
router.patch("/analysis/:id", auth, async (req, res) => {
    try{
        let analysis = await Analysis.findOneAndUpdate({_id: req.params.id, user: req.user._id}, req.body, {new: true, runValidators: true});
        if(!analysis) {
            res.status(400).send({error: "No analysis found."});
        }
        // Update Analysis will be implementer here <<=====================
        res.status(200).send(analysis);
    }
    catch(error) {
        res.status(500).send(error);
    }
});

// Delete
router.delete("/analysis/:id", auth, async (req, res) => {
    try {
        let analysis = Analysis.deleteOne({_id: req.params._id, user: req.user._id});
        if(!analysis) {
            throw new Error("No analysis found");
        }
        // Delete All tweets reletaed to this analysis will be implemented here <<=====================
        res.status(201).send(analysis);
    } catch (error) {
        res.status(500).send(error);
    }
});


module.exports = router;