const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).json({
        message: '데이터 겟 성공'
    });
});

router.post('/', (req, res) =>{
    res.status(201).json({
        msg:'데이터 포스팅 성공'
    });        
});

router.patch('/', (req, res) =>{
    res.status(200).json({
        msg:'데이터 팻치 성공'
    });
});

router.delete('/', (req, res) =>{
    res.status(201).json({
        msg:'데이터 딜리트 성공'
    });
});

module.exports = router;

