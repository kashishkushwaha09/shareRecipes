const User=require('../models/user');
const Recipe=require('../models/recipe');
User.hasMany(Recipe);
Recipe.belongsTo(User);

module.exports={
    User,Recipe
}
