const express = require('express');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes.js');
const handler = require('./middleware/logger.js');



const app = express();
dotenv.config();

const PORT = process.env.PORT;

app.use(express.urlencoded({extended: false}));

//middleware log for all
app.use(handler);
//routes middleware;
app.use('/api/users',userRoutes);


//server
app.listen(PORT, ()=>{console.log(`Server running http://localhost:${PORT}`)});