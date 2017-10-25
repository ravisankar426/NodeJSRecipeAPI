const mongoose=require('mongoose');
const Schema=mongoose.Schema;

var ingredientSchema=new Schema({
    Name:{type:String,required:true},
    Amount:{type:String,required:true}
});

module.exports=mongoose.model('Ingredient',ingredientSchema);