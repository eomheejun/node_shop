const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const orderModel=require("../models/orders");
const productModel=require("../models/products");

router.get('/', (req, res) =>{
    orderModel
        .find()
        .then(docs =>{
            
            const response = {
                count: docs.length,
                orders: docs.map(doc=>{
                    return{
                        _id:doc._id,
                        product:doc.product,
                        quantity:doc.quantity,
                        request:{
                            type:"GET",
                            url:"http://localhost:3000/orders/"+doc._id
                        }
                    };
                })
            };
            res.status(200).json(response);
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({
                error:err
            });
        })
});

router.post('/', (req, res) => {
    productModel
        .findById(req.body.productId)
        .then(product=>{
            if(!product){
                return res.status(404).json({
                    msg:"product not found"
                })
            }

            const order = new orderModel({
                _id:mongoose.Types.ObjectId(),
                product:req.body.productId,
                quantity:req.body.quantity
            });
            return order.save();
            
        })
        .then(result=> {
            console.log(result);
            res.status(201).json({
                msg:"order stored",
                createdorder:{
                    _id:result._id,
                    product:result.product,
                    quantity:result.quantity
                },
                request:{
                    type:"GET",
                    url:"http://localhost:3000/orders/" + result._id
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error:err
            });
        });
});

router.patch('/:orderId', (req, res) => {
    const id=req.params.orderId;

    if(id==='1234'){
        res.status(200).json({
            msg:'데이터 수정'
        });
    }else{
        res.status(200).json({
            msg:'id 찾을수 없음'
        });
    }
});

router.delete('/:orderId', (req, res) => {
    const id=req.params.orderId;
    orderModel
        .remove({_id:id})
        .exec()
        .then(result => {
            res.status(200).json({
                msg:"order deleted",
                request:{
                    type:"POST",
                    url:"http://localhost:3000/orders",
                    body:{productId:"ID", quantity:"Number"}
                }
            });
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({
                error:err
            });
        });
});

router.get('/:orderId', (req,res) =>{
    const id=req.params.orderId;
    orderModel
        .findById(id)
        .exec()
        .then(order=>{
            if(!order){
                return res.status(404).json({
                    msg:"order not found"
                });
            }
            res.status(200).json({
                order:order,
                request:{
                    type:"GET",
                    url:"http://localhost:3000/orders"
                }
            });
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({
                error:err
            });
        });
});

module.exports = router;