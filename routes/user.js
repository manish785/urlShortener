const express = require('express');
const {handleUserSignUp, handleUserLogin} = require('../controllers/user');

const router = express.Router();


router.post('/create', handleUserSignUp);
router.post('/login', handleUserLogin);

// router.get('/sign-up', (req, res) => {
//     return res.render('sign_up');
// })


module.exports = router;