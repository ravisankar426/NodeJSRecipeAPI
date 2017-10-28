

(function(controllers){
    var recipesController=require('./recipes.controller');
    
    controllers.init=function(app,mongoose){
        recipesController.init(app,mongoose);
    }

})(module.exports);