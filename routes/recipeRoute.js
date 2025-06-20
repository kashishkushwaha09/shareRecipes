const express=require('express');
const router=express.Router();
const upload=require('../middlewares/multerConfig');
const recipeController=require('../controllers/recipeController');

router.post('/',upload.single('file'),recipeController.createRecipe);
router.put('/:id', upload.single('file'), recipeController.updateRecipe);



module.exports=router;