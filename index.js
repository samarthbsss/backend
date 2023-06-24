const express = require('express');
const {connection} = require('./config/db');
const {Showmodel}= require('./model/show.model')
const {User} =require('./model/user.model');
const jwt =require('jsonwebtoken');
const bcrypt =require('bcrypt');
require('dotenv').config();

const port =process.env.PORT
const app =express();

app.use(express.json());
app.use(cors());
// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//     next();
//   });

app.get('/',(req, res)=>{
    res.send('This is the main page');
})

app.get('/find', async (req, res)=>{
    const shows= await Showmodel.find();
    res.send(shows);
})
app.post('/create',async(req, res)=>{
    const {name , desc} =req.body;
    const show= new Showmodel({
        name,
        desc
    })
    await show.save();
    console.log(name, desc);
    res.send('show has been saved');
})

app.post('/signup' , async(req, res)=>{
    const {name, password, age}= req.body;
    const hashedpassword= bcrypt.hashSync(password,8);
    console.log(hashedpassword);
    const newuser= new User({
        name,
        password:hashedpassword,
        age
    });
    await newuser.save();
    res.send('new user has been createed');
})

app.post('/login' , async(req, res)=>{
    const {name, password}= req.body;
    const user=  await User.findOne({
        name
    });
    if(!user){
        res.send("please signup");
    }
   const hash=user.password;

   const decryptedpass= bcrypt.compareSync(password, hash);
   if(decryptedpass){
    const token =jwt.sign({userId: user._id}, process.env.secretKEY)
    res.send({"msg":"Login Successfull","user": name,"token":token});
   }
   else{
    res.send({"msg":"Password did not match!"});
   }
})

app.listen(port, async ()=>{
    try {
       await connection;
       console.log('Connected to server'); 
    } catch (error) {
        console.log(error);
    }

    console.log(`listening to server  ${port}`)
})