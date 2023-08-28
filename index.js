const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 8080;
const dotenv = require('dotenv');



//connect to database
dotenv.config();
mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log("DB connection Succesful"))
.catch((err)=>{
    console.log(err);
});

app.use(express.json());
const urlRoute = require('./routes/url');
app.use('/url' ,urlRoute);


app.listen(port, function(err){
    if(err){
        console.log('error', err);
        return;
    }
    console.log(`Server is on the port: ${port}`);
})