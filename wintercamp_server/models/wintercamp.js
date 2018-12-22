var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var wintercampSchema = new Schema ({
  name:String,
  school:String,
  major:String,
  gender:String,
  direct:String,
  devices:String,
  group:Number,
  isAns:String,
  role:String
});
module.exports = mongoose.model('wintercamp',wintercampSchema);
