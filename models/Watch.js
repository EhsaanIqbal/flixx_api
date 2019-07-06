const mongoose = require('mongoose');
const WatchSchema = new mongoose.Schema({

title_id:{
  type:Number,
  required:true
},
title_name:{
  type:String,
  required: true
},
title_quality:{
  type:String,
},
title_urls:[]


});
module.exports = Watch = mongoose.model('watch', WatchSchema);
