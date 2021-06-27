const express = require("express");
const router = express.Router()
const mongoose = require("mongoose");
const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads/")
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString() + file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    if(["image/jpeg", "image/png"].includes(file.mimetype)){
        cb(null, true)
    }else{
        cb(null, false)
    }
}

const upload = multer({
    storage, 
    limits:{
        fileSize: 1024 * 1024 * 5
    },
    fileFilter
})

const Product = require("../models/product");

router.get("/",(req, res, next) => {
    Product
    .find()
    .select("name price _id, productImage")
    .then(docs => {
        console.log(docs)

        const response = {
            count: docs.length,
            products: docs.map(doc => {
                return {
                    name: doc.name,
                    price: doc.price,
                    _id: doc._id,
                    productImage: doc.productImage,
                    request:{
                        type:"GET",
                        url:"http://localhost:3000/products/" + doc._id
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

router.post("/",upload.single("productImage"),(req, res, next) => {
    console.log(req.file)
    const product = new Product({
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
        productImage: req.file.path
    })

    product.save().then(result => {
        console.log(result)
        res.status(200).json({
            message:"Created product successfully",
            createdProduct: {
                name: result.name,
                price: result.price,
                _id: result._id,
                productImage: result.productImage,
                request:{
                    type:"GET",
                    url:"http://localhost:3000/products/" + result._id
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

    Product.findById(id)
    .select("name price _id, productImage")
    .then(doc => {
        console.log(doc)
        if(doc){
            res.status(200).json({
                product:doc,
                request:{
                    type:"GET",
                    url:"http://localhost:3000/products/" + doc._id
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

    Product.update({_id:id}, {
        $set: updateOps
    }).then(doc => {
        res.status(200).json({
            message:"Product updated",
            request:{
                type:"GET",
                url:"http://localhost:3000/products/" + doc._id
            }
        });
    }).catch(err =>{
        console.log(err)
        res.status(500).json({error:err});
    })
});

router.delete("/:id",(req, res, next) => {

    const id = req.params.id;

    Product.remove({_id: id}).then(result => {
        console.log(result)
        res.status(200).json(result);
    }).catch(err =>{
        console.log(err)
        res.status(500).json({error:err});
    })
});

module.exports = router;