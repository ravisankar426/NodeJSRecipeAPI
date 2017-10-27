const mongoose=require('mongoose');
const Schema=mongoose.Schema;

var ingredientSchema=new Schema({
    Name:{type:String,required:true},
    Amount:{type:String,required:true},
    Recipe:{type:Schema.Types.ObjectId,ref:'Recipe'}
});

module.exports=mongoose.model('Ingredient',ingredientSchema);