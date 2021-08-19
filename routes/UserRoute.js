const express = require('express');
var bodyParser = require('body-parser');

const Path =express.Router();
const User  = require('../model/User');
var jwt = require('jsonwebtoken');

Path.use(bodyParser.json());
Path.use(bodyParser.urlencoded());
Path.use(bodyParser.urlencoded({ extended: true }));



// Login
Path.post('/login',async (req, res) =>
{
    try{
        const  NewUser=await User.find({ email : req.body.email  }).limit(1);
        console.log(NewUser.length);
        if (NewUser.length < 1)
        {
            await res.status(400).json({message: 'Email Does not Exists'});
            return console.log("Email Does not Exists log");

        }
        if (NewUser[0].password !== req.body.password )
        {
            await res.status(400).json({message: 'Wrong Password'});
            return console.log("Wrong Password log ");
        }
        if (NewUser[0].enabled === 0 )
        {
            await res.status(400).json({message: 'User is Disabled'});
            return console.log("User is Disabled log ");
        }
        var payload = {
            id: NewUser[0]._id,
        };
        let token = jwt.sign(payload,'tokenCript');
        res.json({User: NewUser[0]._id , token});
        console.log("Done");
    }catch (err) {
        res.json({ message:err.message });
    }
});


// register
Path.post('/register',async (req,res) =>
{
    console.log(req.body);
    let user=new User({
        username : req.body.username,
        email :req.body.email,
        password :req.body.password,
        password2 :req.body.password2,
        numTel :req.body.numTel ,
        is_active: true ,
        date_joined : Date.now(),
    });
    try{
        const NewUser =await User.find({ email : req.body.email , username : req.body.username });
        if (NewUser === undefined || NewUser.length === 0 )
        {
            await user.save();
            res.json({status:"ok" , message: 'Account Create ! You can now Login'});
            return ;
        }
        res.json({status:"err" , message: 'Email Already Exists'});
    }catch (err) {
        res.header("Access-Control-Allow-Headers", "*");
        res.json({ message:err.message });
    }
});

module.exports=Path;
