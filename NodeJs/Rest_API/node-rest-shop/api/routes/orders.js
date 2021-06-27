const express = require("express");
const router = express.Router()
const mongoose = require("mongoose");

const Order = require("../models/order");

router.get("/",(req, res, next) => {
    Order
    .find()
    .select("product quantity _id")
    .populate("product", "name")
    .then(docs => {
        console.log(docs)

        const response = {
            count: docs.length,
            orders: docs.map(doc => {
                return {
                    _id: doc._id,
                    product: doc.product,
                    quantity: doc.quantity,
                    request:{
                        type:"GET",
                        url:"http://localhost:3000/orders/" + doc._id
                    }
                }
            })
        }

        if(docs.length > 0){
            res.status(200).json(response);
        }else{
            res.status(400).json({message:"No entries found"});
        }
    }).catch(err => {
        console.log(err)
        res.status(500).json({error:err});
    })
});

router.post("/",(req, res, next) => {
    const order = new Order({
        _id: mongoose.Types.ObjectId(),
        quantity: req.body.quantity,
        product: req.body.productId,
    })

    order.save().then(result => {
        console.log(result)
        res.status(200).json({
            message:"Created order successfully",
            createdOrder: {
                _id: doc._id,
                product: result.product,
                quantity: result.quantity,
                    request:{
                        type:"GET",
                        url:"http://localhost:3000/orders/" + result._id
                    },
            }
        });
    }).catch(err =>{
        console.log(err)
        res.status(500).json({error:err});
    })
});

router.get("/:id",(req, res, next) => {

    const id = req.params.id

    Order.findById(id)
    .select("name price _id")
    .populate("product")
    .then(doc => {
        console.log(doc)
        if(doc){
            res.status(200).json({
                order:doc,
                request:{
                    type:"GET",
                    url:"http://localhost:3000/orders/" + doc._id
                }
            });
        }else{
            res.status(400).json({message:"No valid entry for product id"});
        }
    }).catch(err =>{
        console.log(err)
        res.status(500).json({error:err});
    })
});

router.patch("/:id",(req, res, next) => {

    const id = req.params.id

    const updateOps = {}

    for(const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }

    Order.update({_id:id}, {
        $set: updateOps
    }).then(doc => {
        res.status(200).json({
            message:"Order updated",
            request:{
                type:"GET",
                url:"http://localhost:3000/orders/" + doc._id
            }
        });
    }).catch(err =>{
        console.log(err)
        res.status(500).json({error:err});
    })
});

router.delete("/:id",(req, res, next) => {

    const id = req.params.id;

    Order.remove({_id: id}).then(result => {
        console.log(result)
        res.status(200).json(result);
    }).catch(err =>{
        console.log(err)
        res.status(500).json({error:err});
    })
});

module.exports = router;