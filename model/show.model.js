const mongoose = require('mongoose');

const ShowSchema= mongoose.Schema({
    name:String,
    desc:String,
})

const Showmodel= mongoose.model('show', ShowSchema);

module.exports={
    Showmodel
}