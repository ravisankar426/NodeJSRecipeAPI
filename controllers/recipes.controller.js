const Recipe=require('../models/recipe');
const Ingredient=require('../models/ingredient');

(function(recipesController){
    recipesController.init=function(app){

        // This method is to get all the recipes
        app.get('/api/recipes',(req,res)=>{
            Recipe.find({},(err,recipes)=>{
                if(err){
                    res.write(err);
                }else{
                    res.statusCode=200;
                    res.setHeader('Content-Type','application/json');
                    res.send(recipes);
                }
            });
        });

         // This method is to get all the ingredients
        app.get('/api/ingredients',(req,res)=>{
            Ingredient.find({},(err,ingredients)=>{
                if(err){
                    res.write(err);
                }else{
                    res.statusCode=200;
                    res.setHeader('Content-Type','application/json');
                    res.send(ingredients);
                }
            });
        });

        //This method is to get recipe by id
        app.get('/api/recipe/:id',(req,res)=>{
            const recipeId=req.params['id'];
            Recipe.find({id:recipeId},(err,recipe)=>{
                if(err){
                    res.write(err);
                }else{
                    res.statusCode=200;
                    res.setHeader('Content-Type','application/json');
                    res.send(recipe);
                }
            });
        });

        //This method is to delete a recipe by it's id
        app.delete('/api/recipe/delete/:id',(req,res)=>{
            const recipeId=req.params['id'];
            Recipe.remove({id:recipeId},(err,recipes)=>{
                if(err){
                    res.write(err);
                }else{
                    res.statusCode=200;
                    res.setHeader('Content-Type','application/json');
                    res.end();
                }
            });
        });

        //This method is to add a recipe.
        app.post('/api/recipe/add',(req,res)=>{
            var recipe=new Recipe();
            var ingredient;

            recipe.id=req.body.id;
            recipe.name=req.body.name;
            recipe.description=req.body.description;
            recipe.imagePath=req.body.imagePath;
            recipe.save({},(recpErr,recpDoc,recpNum)=>{
                for(var i=0;i<req.body.ingredients.length;i++){
                    ingredient=new Ingredient();
                    ingredient.Name=req.body.ingredients[i].Name;
                    ingredient.Amount=req.body.ingredients[i].Amount;
                    ingredient.Recipe=recpDoc._id;
                    ingredient.save();
                }                
                    res.statusCode=201;
                    res.end();
            });
        });
    }
})(module.exports);