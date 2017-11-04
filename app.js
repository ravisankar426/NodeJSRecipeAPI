
const http=require('http');
const mongoose=require('mongoose');
const express=require('express');
const Recipe=require('./models/recipe');
const controllers=require('./controllers');
const bodyParser=require('body-parser');
const data=require('./data/seedDatabase');


var app=express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
  });

const port=3000;
const hostname='127.0.0.1';

mongoose.connect('mongodb://localhost:27017/RecipesDB',{useMongoClient:true});
controllers.init(app,mongoose);

app.get('/',(req,res)=>{
    var name='';
    Recipe.findOne({},(err,doc)=>{
        if(err){
            res.write(err);
        }
        if(doc!=undefined && doc!=null){
            name=doc.name;
            res.setHeader('Content-type','text/html');
            res.write('<h1>'+name+'</h1>');
        }else{
            //data.init(app);
        }
        res.statusCode=200;
        res.end();
    });
});

const server=http.createServer(app);

server.listen(port,hostname,()=>{
    console.log('Server started at port - '+port);
});