const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const URL = require('./models/url');
const {restrictToLoggedInUserOnly} = require('./middleware/auth')
const app = express();
const port = 8080;
const dotenv = require('dotenv');


const urlRoute = require('./routes/url');
const staticRoute = require('./routes/staticRouter');
const userRoute = require('./routes/user');


//connect to database
dotenv.config();
mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log("DB connection Succesful"))
.catch((err)=>{
    console.log(err);
});


// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/url' , restrictToLoggedInUserOnly, urlRoute);
app.use('/user' ,userRoute);
app.use('/', staticRoute);


app.get('/:shortId', async (req, res)=>{
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
       shortId
    }, {
        $push:{
            visitedHistory : {
                timestamp : Date.now()
            }
        }
    })
    //return res.redirect(entry.redirectURL);
});

app.listen(port, function(err){
    if(err){
        console.log('error', err);
        return;
    }
    console.log(`Server is on the port: ${port}`);
})