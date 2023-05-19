const express = require("express");
const bodyParse = require("body-parser");
const morgan = require('morgan');
const cors = require('cors');

const app = express();
const PORT  = process.env.PORT || 3977;

app.use(morgan('dev'));
app.use(bodyParse.urlencoded({extended:true}));
app.use(bodyParse.json());
app.use(cors()); 

app.get("/",(req,res) =>{
    res.status(200).send({msg:"Hola Diego!!!"});
});

app.post("/welcome",(req,res) =>{
    const {username }  = req.body;
    res.status(200).send({msg:`Hola ${username}`}); 
});



app.listen(PORT, () =>{
    console.log(`tu server esta listo ${PORT}`);
})