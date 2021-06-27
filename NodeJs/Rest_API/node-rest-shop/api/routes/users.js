const express = require("express");
const router = express.Router()
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const User = require("../models/user");

router.post("/signup",(req, res, next) => {

    User.find({email:req.body.email}).then(user => {
        if(user.length > 0){
            return res.status(409).json({
                message: "User already exists"
            })
        }
        bcrypt.hash(req.body.password, 10, (err, hash) => {
            if(err){
                return res.status(500).json({
                    error: err
                })
            }else{
                const user = new User({
                    _id: mongoose.Types.ObjectId(),
                    email: req.body.email,
                    password: hash
                })

                user.save().then(result => {
                    res.status(200).json({
                        message: "User created"
                    })
                }).catch(err =>{
                    console.log(err)
                    res.status(500).json({error:err});
                })
            }
        }).catch(err =>{
            console.log(err)
            res.status(500).json({error:err});
        })
    })
});

router.delete("/:id",(req, res, next) => {
    
    User.remove({_id: req.params.id}).then(result => {
        res.status(200).json({
            message: "User deleted"
        })
    }).catch(err =>{
        console.log(err)
        res.status(500).json({error:err});
    })
});

module.exports = router;