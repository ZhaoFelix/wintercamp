var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var wintercamp = require("../models/wintercamp");
var team = require("../models/team");
var color = require("../models/color");

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
  team.update({_id:id},{'role':role},function(err,data){
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

//团队登录
router.post('/team',function(req,res,next){
  var name = req.body.name;
  var pass =  req.body.pass;
  console.log(name,pass);
  team.find({teamName:name,pass:pass},function(err,data){
    if(err){
      res.send({
        code:0,
        error:err
      });
    }
    else {
      if(data.length > 0){
        res.send({
          code:1,
          result:data
        });
      }
      else {
        res.send({
          code:0,
          result:"用户名不存在或密码不正确"
        });
      }
    }
  })
})
//查询颜色信息
router.get('/get',function(req,res,next){
  color.find({},function(err,data){
    if(err){
      res.send({
        code:0,
        error:err
      });
    }
    else {
      if(data.length > 0){
        res.send({
          code:1,
          result:data
        });
      }
      else {
        res.send({
          code:0,
          error:"没有数据"
        });
      }
    }
  })
})
//判断是否已经选了颜色

router.post('/select',function(req,res,next){
  var id = req.body.id; //团队ID
 team.find({_id:id},function(err,data){
    if(err){
      res.send({
        code:0,
        error:err
      });
    }
    else {
      color.find({team:data[0].teamName},function(err,data){
        if(err){
          res.send({
            code:0,
            error:err
          });
        }
        else {
          if(data.length > 0){
            res.send({
              code:1,
              result:data
            });
          }
          else {
            res.send({
              code:0,
              error:"没有数据"
            });
          }
        }
      })
    }
 })

})

//更新颜色
router.post('/update',function(req,res,next){
  var id = req.body.id; //团队ID
  var cardId = req.body.cardId;
  team.find({_id:id},function(err,data){
    if(err){
      res.send({
        code:0,
        error:err
      });
    }
    else {
      if(data.length > 0){
       var da = data[0];
        color.update({_id:cardId},{team:da.teamName,isSelected:"1"},function(err,data){
           if(err){
             res.send({
               code:0,
               error:err
             });
           }
           else {
             res.send({
               code:1,
               result:"success"
             });
           }
         })
      }
      else {
        res.send({
          code:0,
          error:"没有数据"
        });
      }
    }
  })
})

//选择颜色
router.post('/selected',function(req,res,next){
  var id = req.body.id; //团队ID
  team.find({_id:id},function(err,data){
    if(err){
      res.send({
        code:0,
        result:"没有选择"
      });
    }
    else {
      if(data.length > 0){
       var da = data[0];
        color.find({team:da.teamName,isSelected:"1"},function(err,data){
           if(err){
             res.send({
               code:0,
               result:"没有选择"
             });
           }
           else {
             if(data.length > 0){
               res.send({
                 code:1,
                 result:data[0].description
               });
             }
             else {
               res.send({
                 code:0,
                 result:"没有选择"
               });
             }

           }
         })
      }
      else {
        res.send({
          code:0,
          error:"没有数据"
        });
      }
    }
  })
})
module.exports = router;
