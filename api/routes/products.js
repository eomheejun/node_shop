const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const productModel = require("../models/products");

router.get('/', (req, res) => {
    productModel
        .find()
        .then(docs => {
            const response = {
                count: docs.length,
                products: docs.map(doc => {
                    return{
                        name:doc.name,
                        price:doc.price,
                        _id:doc._id,
                        request:{
                            type:"GET",
                            url:"http://localhost:3000/products/"+ doc._id
                        }
                    };
                })
            };
            res.status(200).json(response);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error:err
            });
        });


    // res.status(200).json({
    //     message: '데이터 겟 성공'
    // });
});
//data 생성
router.post('/', (req, res) =>{
    const product = new productModel ({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });

    product
        .save()
        .then(result => {

            res.status(201).json({
                msg:"successful post",
                createdProduct: {
                    name:result.name,
                    price:result.price,
                    _id:result._id,
                    request:{
                        type:"GET",
                        url: "http://localhost:3000/products/" + result._id
                    }
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });

    // res.status(201).json({
    //     msg:'데이터 포스팅 성공',
    //     createdproduct: product
    // });        
});

router.patch('/:productId', (req, res) =>{
    const id=req.params.productId;
    const updateOps = {};
    for(const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }

    productModel
        .update({_id:id}, {$set:updateOps})
        .exec()
        .then(result => {
            res.status(200).json({
                msg:'product updated',
                request:{
                    tupe:"GET",
                    url:'http://localhost:3000/products/'+id
                }
            })
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({
                error:err
            });
        });

    // if(id==='1234'){
    //     res.status(200).json({
    //         msg:'데이터 수정'
    //     });
    // }else{
    //     res.status(200).json({
    //         msg:'id 찾을수 없음'
    //     });
    // }
});

router.delete('/:productId', (req, res) =>{

    const id = req.params.productId;
    productModel
        .remove({_id: id})
        .exec()
        .then(result =>{
            res.status(200).json({
                msg:'product deleted',
                request:{
                    type:'POST',
                    url:'http://localhost:3000/products',
                    body:{name:'String', price:'String'}
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error:err
            });
        });

    // const id=req.params.productId;

    // if(id==='0000'){
    //     res.status(200).json({
    //         msg:'데이터 삭제'
    //     });

    // }else{
    //     res.status(200).json({
    //         msg:'id를 찾을수 없음'
    //     });
    // }
});

router.get('/:productId', (req ,res) => {
    const id = req.params.productId;

    productModel
        .findById(id)
        .exec()
        .then(doc => {
            if(doc){
                res.status(200).json({
                    product:doc,
                    request: {
                        type:"GET",
                        url:'http://localhost:3000/products'
                    }
                });
            } else {
                res.status(404).json({
                    msg:"Id를 찾을수 없음"
                });
            }
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({
                error:err
            });
        });


    // if(id === 'special'){
    //     res.status(200).json({
    //         msg:'너는 스페셜id를 발견했다',
    //         id: id
    //     });
    // }else{
    //     res.status(200).json({
    //         msg:'Id 없음'
    //     })
    // }
});




module.exports = router;

