const mongoose =require('mongoose');

const userShema =mongoose.Schema({
    name: {type:String, required:true},
    password :{type :String , require :true},
    age:String,

})

const User=mongoose.model( 'user', userShema);

module.exports ={
    User
}