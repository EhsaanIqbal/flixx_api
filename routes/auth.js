const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwt_secret = require('../config/keys').secretOrKey;
const  validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');

//Register
router.post('/register', (req, res) => {
    const { username, email, password } = req.body;
    const {errors, isValid} = validateRegisterInput(req.body);
    if(!isValid) return res.status(400).json(errors);

    // Check for existing user
    User.findOne({ email })
        .then(user => {
            if(user) return res.status(400).json({ msg: 'User already exists' });

            const newUser = new User({
                username,
                email,
                password
            });

            // Create salt & hash
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if(err) throw err;
                    newUser.password = hash;
                    newUser.save()
                        .then(user=>{
                            res.json(user)
                        })
                        .catch(err => console.log(err))

                })
            })
        })
});

//Login
router.post('/login', (req,res)=>{
    const {email,password}= req.body;
    const {errors, isValid} = validateLoginInput(req.body);
    if(!isValid) return res.status(400).json(errors);


    User.findOne({email})
        .then(user=>{
            if(!user) return res.status(404).json({email:'User not found'});
            //check password
            bcrypt.compare(password, user.password)
                .then(isMatch=>{
                    if(isMatch){

                        //payload
                        const payload = {
                            id:user.id,
                            username:user.username,
                            email: user.email
                        };
                        //sign token
                        jwt.sign(payload,jwt_secret,{expiresIn:604800}, (err, token)=>{
                            res.json({
                                success:true,
                                token:'Bearer ' + token
                            })
                        });


                    }else{
                        return res.status(404).json({password:'Password is incorrect'})
                    }
                })
        })


});



module.exports = router;