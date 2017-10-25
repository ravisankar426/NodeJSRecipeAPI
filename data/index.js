(function(data){
    const mongoose=require('mongoose');
    const Recipe=require('../models/recipe');
    data.init=function(app){
        mongoose.connect('http://localhost:27017/RecipesDB');
        console.log('Inside index data');
        Recipe.findOne({},(err,doc)=>{
            if(err){
                throw err;
                console.log(err);
            }
            if(doc!=undefined && doc!=null){
                console.log(doc);
            }else{
                var seedDatabase=require('./seedDatabase');
                seedDatabase.init(app);
            }
        });
    }
})(module.exports);