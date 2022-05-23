const express = require("express");
const router = express.Router();
const Analysis = require("../models/analysis");
const Tweet = require("../models/tweet");
const auth = require("../middleware/auth");
const axios = require("axios");

// Create
router.post("/analysis", auth, async (req, res) => {
    try {
        let analysis = new Analysis({
            ...req.body,
            user: req.user._id
        });
        analysis = await analysis.save();
        
        // Microservice API Call
        let response = await axios.post(`${process.env.TSA_MS_ADDRESS}/tweetAnalysis`, {
            query: analysis.queryType + analysis.query,
            limit: analysis.limit,
            analysisId: analysis._id.toString()
        });
        let tweets = response.data;
        
        await Tweet.insertMany(tweets);
        
        res.status(201).send({analysis, tweets});
    } catch (error) {
        res.status(400).send(error.message);
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
        
        let tweets = Tweet.find({analysisId: analysis._id});
        
        res.status(201).send({analysis, tweets});
    } catch (error) {
        res.status(400).send(error.message);
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
        res.status(400).send(error.message);
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
        res.status(500).send(error.message);
    }
});

// Delete
router.delete("/analysis/:id", auth, async (req, res) => {
    try {
        let analysis = Analysis.deleteOne({_id: req.params._id, user: req.user._id});
        if(!analysis) {
            throw new Error("No analysis found");
        }
        
        res.status(201).send(analysis);
    } catch (error) {
        res.status(500).send(error.message);
    }
});


module.exports = router;