const express = require("express");
const router = express.Router();
const Analysis = require("../models/analysis");
const Tweet = require("../models/tweet");
const auth = require("../middleware/auth");
const axios = require("axios");
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

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
        
        res.status(201).send({analysis});
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Read
// read by id
router.get("/analysis/:id", auth, async (req, res) => {
    try {
        let analysis = await Analysis.findOne({_id: req.params.id, user: req.user._id});
        if(!analysis) {
            throw new Error("No analysis found");
        }
        
        let tweets = await Tweet.find({analysisId: analysis._id});
        
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
        
        // delete old tweets
        await Tweet.deleteMany({analysisId: req.params.id});
        
        //get new tweets
        // Microservice API Call
        let response = await axios.post(`${process.env.TSA_MS_ADDRESS}/tweetAnalysis`, {
            query: analysis.queryType + analysis.query,
            limit: analysis.limit,
            analysisId: analysis._id.toString()
        });
        let tweets = response.data;
        
        await Tweet.insertMany(tweets);

        res.status(200).send(analysis);
    }
    catch(error) {
        res.status(500).send(error.message);
    }
});

// Delete
router.delete("/analysis/:id", auth, async (req, res) => {
    try {
        let analysis = await Analysis.findOne({_id: req.params.id, user: req.user._id});
        
        if(!analysis) {
            throw new Error("No analysis found");
        }
        
        await analysis.remove();
        
        res.status(201).send(analysis);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Download Analysis
router.get("/download/:id", auth, async (req, res) => {
    try {
        const tweets = await Tweet.find({analysisId: req.params.id}, ["-_id", "-tweetId", "-analysisId"]);
        
        const csvWriter = createCsvWriter({
            path: './source/data/result.csv',
            header: [
                {id: 'tweetUserName', title: 'USER NAME'},
                {id: 'tweetDate', title: 'DATE'},
                {id: 'tweetContent', title: 'TWEET'},
                {id: 'tweetUrl', title: 'URL'},
                {id: 'sentiment', title: 'SENTIMENT'},
            ]
        });
        await csvWriter.writeRecords(tweets);
        
        res.download("./source/data/result.csv");
    } catch (error) {
        res.status(500).send(error.message);
    }
});


module.exports = router;