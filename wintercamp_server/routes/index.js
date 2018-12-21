var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var wintercamp = require("../models/wintercamp");

/* GET home page. */
router.get('/', function(req, res, next) {
  wintercamp.find({},function(err,data){
    if(err){
      res.send({
        code:0,
        error:err
      });
    }
    else {
      res.send({
        code:1,
        error:data
      });
    }
  })
});

//登录
router.post('/login', function(req, res, next) {
  var name = req.body.name;
  console.log(name);
  wintercamp.find({name:name},function(err,data){
    if(err){
      res.send({
        code:0,
        error:err
      });
    }
    else {
      res.send({
       code:1,
       result:data
     })
   }
  })
});
//答题
router.post('/answer',function(req,res,next){
  var id = req.body.id;
  wintercamp.update({_id:id},{'isAns':"1"},function(err,data){
    if(err){
      res.send({
        code:0,
        error:err
      });
    }
    else {
      res.send({
        code:1,
        result:data,
        _id:id
      });
    }
  })
})
//小组账号

module.exports = router;
