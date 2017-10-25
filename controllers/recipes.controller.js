const Recipe=require('../models/recipe');
const Ingredient=require('../models/ingredient');

(function(recipesController){
    recipesController.init=function(app){

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

        app.post('/api/recipe/add',(req,res)=>{
            var recipe=new Recipe();
            var ingredient=new Ingredient();

            recipe.id=req.body.id;
            recipe.name=req.body.name;
            recipe.description=req.body.description;
            recipe.imagePath=req.body.imagePath;
            for(var i=0;i<req.body.ingredients.length;i++){
                ingredient.Name=req.body.ingredients[i].Name;
                ingredient.Amount=req.body.ingredients[i].Amount;
                recipe.ingredients.push(ingredient);
            }

            recipe.save();
            res.statusCode=201;
            res.end();
        });
    }
})(module.exports);