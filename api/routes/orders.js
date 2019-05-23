const express = require('express');
const router = express.Router();

router.get('/', (req, res) =>{
    res.status(200).json({
        msg: '데이터 겟 성공'
    });
});

router.post('/', (req, res) => {
        res.status(200).json({
            msg:'데이터 포스팅 성공'
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

    if(id==='0000'){
        res.status(200).json({
            msg:'데이터 삭제['
        });
    } else{
        res.status(200).json({
            msg:'id를 찾을수 없음'
        });
    }
});

router.get('/:orderId', (req,res) =>{
    const id=req.params.orderId;
    
    if(id==='1234'){
        res.status(200).json({
            msg:'1234 id 발견',
            id: id
        })
    }else{
        res.status(200).json({
            msg:'id 없음'
        })
    }
});

module.exports = router;