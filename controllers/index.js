

(function(controllers){
    var recipesController=require('./recipes.controller');
    
    controllers.init=function(app){
        recipesController.init(app);
    }

})(module.exports);