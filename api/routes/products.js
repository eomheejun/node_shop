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

router.patch('/:productId', (req, res) =>{
    const id=req.params.productId;

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

router.delete('/:productId', (req, res) =>{
    const id=req.params.productId;

    if(id==='0000'){
        res.status(200).json({
            msg:'데이터 삭제'
        });

    }else{
        res.status(200).json({
            msg:'id를 찾을수 없음'
        });
    }
});

router.get('/:productId', (req ,res) => {
    const id = req.params.productId;

    if(id === 'special'){
        res.status(200).json({
            msg:'너는 스페셜id를 발견했다',
            id: id
        });
    }else{
        res.status(200).json({
            msg:'Id 없음'
        })
    }
});




module.exports = router;

