const mongoose=require('mongoose');
const mongooseUniqueValidator=require('mongoose-unique-validator');

const Schema=mongoose.Schema;

var recipeSchema=new Schema({
    id:{type:String,required:true,unique:true},
    name:{type:String,required:true},
    description:{type:String},
    imagePath:{type:String},
    ingredients:{type:Schema.Types.ObjectId,ref:'Ingredient'}
});

mongoose.plugin(mongooseUniqueValidator);

module.exports=mongoose.model('Recipe',recipeSchema);