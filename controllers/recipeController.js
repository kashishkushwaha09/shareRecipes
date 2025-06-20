
const recipeService=require('../services/recipeService');
const { AppError } = require('../utils/appError');
const createRecipe=async(req,res)=>{
try {
     const {
      title,
      ingredients, // array expected (from frontend or processed as string)
      instructions,
      cookingTime,
      servings,
      category,
      dietaryPreference,
      difficulty,
    } = req.body;
     const userId = req.user.id;
     const imageUrl = req.file;
     const ingredientArray =
      typeof ingredients === 'string' ? ingredients.split(',').map(i => i.trim()) : ingredients;
      const categoryArray =
      typeof category === 'string' ? category.split(',').map(i => i.trim()) : category;

      const newRecipe = await recipeService.createRecipe({ title,
      ingredients: ingredientArray,
      instructions,
      cookingTime:parseInt(cookingTime),
      servings:parseInt(servings),
      imageUrl,
      category:categoryArray,
      dietaryPreference,
      difficulty,
      UserId:userId});
      res.status(201).json({
      message: 'Recipe created successfully!',
      recipe: newRecipe,
      success: true,
    });
} catch (error) {
     throw new AppError(error.message,500); 
}
}





module.exports = {
   createRecipe
}