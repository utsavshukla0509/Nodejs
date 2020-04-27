const express = require("express");
const router = express.Router();
const Class = require('../node/schemas');

router.get('/get',(req,res,next)=>{
    Class.find().then((Class)=>{
        res.send(Class);
    });
});



router.post('/post',(req,res,next)=>{
    var data = {
      name: req.body.first,  
        branch: req.body.branch, 
        rollno: req.body.roll
    }

function posting(){
    // Class.create(data).then(()=>{
    //     res.send(Class);
    // }).catch(next);
    console.log("hey people");
}

function createPOST(data){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{


            Class.find({rollno :{$in:data.rollno}},{}).then(items => {
                // console.log(`Successfully found ${items.length} documents.`)
                // console.log(items);
            var error = false;
            if(items.length>0)
                error = true
            else 
                error = false
            
            if(!error){
                resolve();
            }
            else{
                reject('Aready in database');
            }
              }).catch(err => console.error(`Failed to find documents: ${err}`));           
            
            
        },1000);
    });
};

createPOST(data).then(posting).catch(err=>console.log(err));

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