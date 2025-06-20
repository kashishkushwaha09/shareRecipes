const Recipe=require('../models/recipe');
const AWS=require('aws-sdk');
const { AppError } = require('../utils/appError');


function uploadToS3(data,fileName,mimetype){
      const BUCKET_NAME='sharerecipes809702558620';
    const IAM_USER_KEY=process.env.IAM_USER_KEY;
    const IAM_USER_SECRET=process.env.IAM_USER_SECRET;

    const s3=new AWS.S3({
        accessKeyId:IAM_USER_KEY,
        secretAccessKey:IAM_USER_SECRET
    });

    const params={
        Bucket:BUCKET_NAME,
        Key:fileName,
        Body:data,
        ContentType:mimetype,
        ACL:'public-read',
    }
     return s3.upload(params).promise();
}
const createRecipe=async(recipe)=>{
    try {
        if (recipe.imageUrl && recipe.imageUrl.buffer) {
  const timestamp = new Date().toISOString().replace(/:/g, '-');
  const fileName = `${timestamp}-${recipe.imageUrl.originalname}`;
  const fileBuffer = recipe.imageUrl.buffer;
  const mimetype=recipe.imageUrl.mimetype;
  const response = await uploadToS3(fileBuffer,fileName,mimetype);
  recipe.imageUrl = response.Location;
}
    const newRecipe = await Recipe.create(recipe);
    return newRecipe;
    } catch (error) {
        throw new AppError(error.message,500);
    }
 
}

module.exports={
    createRecipe
}