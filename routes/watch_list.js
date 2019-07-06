const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const WatchList = require('../models/WatchList');
const User = require('../models/User');

//Get all titles
router.get('/', passport.authenticate('jwt', {session:false}), (req,res)=>{
 WatchList.find({user:req.user.id})
     .then(titles=>res.json(titles))
     .catch(err=>console.log(err))
});

//Add a title
router.post('/add', passport.authenticate('jwt', {session:false}), (req,res)=>{
    const newTitle = new WatchList({
        user:req.user.id,
        title: req.body.title
    });

    newTitle.save()
        .then(addedTitle=>{
            res.json(addedTitle)
        })
});

//Delete a title
router.delete('/delete/:id', passport.authenticate('jwt', {session:false}), (req,res)=>{
User.findOne({id:req.user.id})
    .then(user=>{
        WatchList.findById(req.params.id)
            .then(delTitle=>{
                //check owner
                if(delTitle.user.toString() !== req.user.id){
                    return res.status(401).json({notauth:'user not authorized'})
                }
                delTitle.remove().then(()=>res.json({success:true}))

            }) .catch((err)=>res.status(404).json({titlenotfound: 'No titles!'}))
    })

});



module.exports = router;
