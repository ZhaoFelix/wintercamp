var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var wintercampSchema = new Schema ({
  teamName:String,
  pass:String,
  teamNum:String,
  selectedColor:String,
  customName:String
});
module.exports = mongoose.model('teams',wintercampSchema);
