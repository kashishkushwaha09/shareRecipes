const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const User=require('../models/user');
const { AppError } = require('../utils/appError');
const findUser=async(username,email)=>{
    try {
        const user=await User.findOne({
            where:{
                email,username
            }});
        return user;
    } catch (error) {
        throw new AppError(error.message,500);
    }
}
const findByEmail=async(email)=>{
    try {
        const user=await User.findOne({
            where:{
                email
            }});
        return user;
    } catch (error) {
        throw new AppError(error.message,500);
    }
}
const signUpUser=async(userData)=>{  
    
    try {
          // Check if the user already exists
                const existingUser=await findUser(userData.username,userData.email);
                if(existingUser){
                    throw new AppError("User already exists", 409);
                }
        const hashPassword=await bcrypt.hash(userData.password,11);
        userData.password=hashPassword;
        const user=await User.create(userData);
        return user;
    } catch (error) {
       throw new AppError(error.message,500);
    }
}
const loginUser=async(password,existingUser)=>{
    try {
         
        const isPasswordMatched=await bcrypt.compare(password,existingUser.password);
        if(!isPasswordMatched){
            return null;
        }
        const token=jwt.sign(
            {userId:existingUser.id,email:existingUser.email,username:existingUser.username},
            process.env.SECRET_KEY,
            {expiresIn:'7d'}
        );
        return token;
    } catch (error) {
        console.log(error);
        throw new AppError(error.message, 500);
    }
}
const getUserById=async(id,transactions)=>{
    try {
        const user=await User.findByPk(id,transactions);
        return user;
    } catch (error) {
        throw new AppError(error.message, 500);
    }
}

module.exports={
    signUpUser,
    loginUser,
    findByEmail
}