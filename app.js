const express=require('express');
const path=require('path');
const app=express();
const port=80;
const bodyparser =require("body-parser");
var mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/UserData',{useNewUrlParser:true});

//Define schema
var UserSchema = new mongoose.Schema({
    fname:String,
    lname: String,
    gender:String,
    weight:String,
    height:String,
    age:String,
    bmi:String,
    goal:String,
    add:String,
    phone:String,
    mail:String,
    emname:String,
    emcontact:String,
    // password:String,
  });
var UserDetails = mongoose.model('UserDetails', UserSchema);



app.use('/static',express.static('static'))
app.use(express.urlencoded())

app.set('view engine','pug')
app.set('views',path.join(__dirname,'views'))

//END POINT FOR HOME PAGE
app.get('/',(req,res)=>{
    const params={ }
    res.status(200).render('home.pug',params);
});
//END POINT FOR REGISTER PAGE
app.get('/login',(req,res)=>{
    const params={ }
    res.status(200).render('login.pug',params);
});
//END POINT FOR LOGIN PAGE
app.get('/register',(req,res)=>{
    const params={ }
    res.status(200).render('register.pug',params);
});
app.post('/register',(req,res)=>{
    var Data=new UserDetails(req.body);
    Data.save().then(()=>{
        res.send("Data has been saved successfully")
    }).catch(()=>{
        res.status(400).send("Data not saved")
    });
})
app.listen(port,()=>{
    console.log("Ran successfully");
});