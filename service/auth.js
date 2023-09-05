const jwt = require('jsonwebtoken');
const secret = 'manish@123$9292'

function setUser(user){
   return jwt.sign({
       _id: user._id,
       email: user.email
   }, secret);
};

function getUser(token) {
    try {
        return jwt.verify(token, secret);
    }catch(err){
        return null;
    }
}


module.exports = {
    setUser,
    getUser,
}