const shortid = require('shortid');
const URL = require('../models/url');

module.exports.handleGenerateNewShortURL = async function(req, res){
    
    const body = req.body;
    if(!body.url){
        return res.status(400).json({
            error : "URL is required"
        })
    }
    const shortID = shortid();

    await URL.create({
        shortId : shortID,
        redirectURL : body.url,
        visitedHistory : [],
    })
}