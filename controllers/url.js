const shortid = require('shortid');
const URL = require('../models/url');

module.exports.handleGenerateNewShortURL = async function(req, res){
    
    const body = req.body;
    if(!body.url){
        return res.status(400).json({
            error : "URL is required"
        })
    }
    // console.log('Hello1');
    const shortID = shortid();

    const shortURL = await URL.create({
        shortId : shortID,
        redirectURL : body.url,
        visitedHistory : [],
    })
    return res.status(201).json({
        mesaage: 'Short URL created successfully!',
        data : shortURL
    })
}


module.exports.handleGetAnalytics = async function(req, res){
    const shortid = req.params.shortid;
    const result = await URL.findOne({ shortid : shortid });

    console.log(shortid);
    console.log(result);
    return res.json({
        totalClicks: result.visitedHistory.length,
        analytics: result.visitedHistory
    })
}