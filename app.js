require('dotenv').config();
const fs=require('fs');
const path=require('path');
const express=require('express');
const app=express();
const cors = require('cors');
const errorMiddleware=require('./middlewares/errorHandler');
const db=require('./utils/db-connection');
const userRoutes=require('./routes/userRoute');
const morgan=require('morgan');
const accessLogStream=fs.createWriteStream(
    path.join(__dirname,'access.log'),
    {flag:'a'}
);
app.use(express.static('public'));
app.use(express.json());
app.use(cors());
app.use(morgan('combined',{stream:accessLogStream}))
// Redirect root URL to signup.html
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'signup.html'));
// });
app.use('/api/users', userRoutes);
app.use(errorMiddleware);


db.sync({alter:true}).then(()=>{
    app.listen(process.env.PORT || 4000,()=>{
    console.log(`server is listening on port ${process.env.PORT || 4000}`);
})
})
.catch((err)=>{
    console.log(err);
})