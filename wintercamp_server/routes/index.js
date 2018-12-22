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
      if(data.length>0){
        res.send({
         code:1,
         result:data
       })
      }
      else {
        res.send({
         code:0,
         error:"用户不存在"
       })
      }

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
//角色选择
router.post('/role',function(req,res,next){
  var id = req.body.id;
  var role =  req.body.role;
  console.log(id,role);
  wintercamp.update({_id:id},{'role':role},function(err,data){
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
module.exports = router;
