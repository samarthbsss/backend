const mongoose =require('mongoose');
require('dotenv').config();
const mongodb=process.env.mongoURI

const connection = mongoose.connect(mongodb)
module.exports={
    connection
}