const express = require("express");
const router = express.Router();
const Class = require('../node/schemas');

router.get('/get',(req,res,next)=>{
    Class.find().then((Class)=>{
        res.send(Class);
    });
});

router.post('/post',(req,res,next)=>{
    // console.log(req.body);
    Class.create({name: req.body.name, branch: req.body.branch, rollno: req.body.roll}).then((Class)=>{
        res.send(Class);
    }).catch(next);
});

router.put('/update/:roll',(req,res)=>{
    Class.findOneAndUpdate({rollno:req.params.roll},req.body).then(()=>{
        Class.findOne({rollno:req.params.roll}).then((Class)=>{
            res.send(Class);
        });
    });
});

router.delete('/delete/:roll',(req,res,next)=>{
    Class.findOneAndDelete({rollno:req.params.roll}).then((Class)=>{
        res.send(Class);
    });
});

module.exports = router;