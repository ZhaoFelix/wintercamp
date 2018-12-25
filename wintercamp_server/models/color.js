var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var wintercampSchema = new Schema ({
  color:String,
  team:String,
  isSelected:String,
  description:String
});
module.exports = mongoose.model('color',wintercampSchema);
