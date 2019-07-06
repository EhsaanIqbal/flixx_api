const mongoose = require('mongoose');
const WatchListSchema = new mongoose.Schema({
   user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'users'
    },
    title:{
       type:String, required:true
    }


});
module.exports = WatchList = mongoose.model('watchlist', WatchListSchema);