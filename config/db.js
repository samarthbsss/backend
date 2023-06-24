const mongoose =require('mongoose');
require('dotenv').config();
const mongodb=process.env.mongo

const connection = mongoose.connect(mongodb)
module.exports={
    connection
}