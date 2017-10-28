const Recipe=require('../models/recipe');
const Ingredient=require('../models/ingredient');

(function(recipesController){
    recipesController.init=function(app,mongoose){

        // This method is to get all the recipes
        //,{id:1,name:1,imagePath:1,description:1,ingredients:0,_id:0}
        app.get('/api/recipes',(req,res)=>{
            Recipe.find({},{__v:0,_id:0},(err,recipes)=>{
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
            Ingredient.find({},{_id:0,__v:0,Recipe:0},(err,ingredients)=>{
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
        //,{Name:1,Amount:1,_id:0,Recipe:0}
        app.get('/api/recipe/:id',(req,res)=>{
            const recipeId=req.params['id'];
            Recipe.findOne({id:recipeId},{__v:0},(err,recipe)=>{
                if(err){
                    res.write(err);
                }else{
                    if(recipe.ingredients!=undefined){
                        Ingredient.find({Recipe:recipe._id},{__v:0,Recipe:0,_id:0},(ingErr,ingredients)=>{
                            if(ingErr){
                                throw ingErr;
                            }
                            else{
                                recipe.ingredients=ingredients;
                                res.statusCode=200;
                                res.setHeader('Content-Type','application/json');
                                res.send(recipe);
                            }
                        });
                    }
                    else{
                        res.statusCode=200;
                        res.setHeader('Content-Type','application/json');
                        res.send(recipe);
                    }
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

        //This method is to delete a ingredient by it's id
        app.delete('/api/ingredient/delete/:id',(req,res)=>{
            const ingredientId=req.params['id'];
            Ingredient.remove({_id:ingredientId},(err,ingredients)=>{
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
            for(var i=0;i<req.body.ingredients.length;i++){
                ingredient=new Ingredient();
                ingredient.Name=req.body.ingredients[i].Name;
                ingredient.Amount=req.body.ingredients[i].Amount;
                ingredient.Recipe=recipe._id;
                ingredient.save();
                recipe.ingredients.push(ingredient);
            }
            recipe.save({},(err,doc,num)=>{
                if(err){
                    console.log(err);
                }
            });

            res.statusCode=201;
            res.end();
        });
    }
})(module.exports);