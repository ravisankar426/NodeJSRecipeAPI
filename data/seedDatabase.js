(function seedDatabase(data){
    data.init=function(app){
        console.log('seeding the database...!!!');
        const Recipe=require('../models/recipe');
        const Ingredient=require('../models/ingredient');
    
        var ingredients=[new Ingredient({
            Name:'Chicken',
            Amount:1
        }),
        new Ingredient({
            Name:'Cilantro',
            Amount:1
        }),
        new Ingredient({
            Name:'Onion',
            Amount:2
        })
        ];
        var recipe=new Recipe({
            id:1,
            name:'Chicken 65',
            description:'This is a nog Veg Starter..!!!',
            imagePath:'http://www.spiceindiaonline.com/wp-content/uploads/chicken65_legs_0.jpg',
            ingredients:ingredients
        });
        recipe.save();
    }
})(module.exports);