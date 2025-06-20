require('dotenv').config();
const path=require('path');
const express=require('express');
const app=express();
const cors = require('cors');

const db=require('./utils/db-connection');
app.use(express.static('public'));
app.use(express.json());
app.use(cors());
// Redirect root URL to signup.html
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'signup.html'));
// });
// app.use('/api/users', userRoutes);
// app.use(errorMiddleware);


db.sync({alter:true}).then(()=>{
    app.listen(process.env.PORT || 4000,()=>{
    console.log(`server is listening on port ${process.env.PORT || 4000}`);
    console.log("adding more logs");
})
})
.catch((err)=>{
    console.log(err);
})