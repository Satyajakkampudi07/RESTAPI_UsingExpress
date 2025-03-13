const express = require('express');
const dotenv = require('dotenv');
const users = require("./MOCK_DATA.json");

const app = express();
dotenv.config();

const PORT = process.env.PORT;

//Routes

// app.get('/users',(req,res)=>{
//     const html = 
//     `<ul>
//     ${users.map(user => `<li> ${user.first_name} </li>`).join("")}
//     </ul>`

//     return res.send(html);
// });

//RESTAPI
app.get('/api/users',(req,res)=>{
    return res.json(users);
});

app
.route('/api/users/:id')
.get((req, res) => {
    const id = Number(req.params.id);
    console.log(id);
    return res.json(users.find((user) => user.id === id)); 
})
.put((req,res)=>{
    //TODO : update user by id
    return res.json({msg:"Status pending"})
})
.delete((req,res)=>{
    //TODO : delete user by id
    return res.json({msg:"Status pending"})
})

app.post('/api/users',(req,res)=>{
    //TODO : create user by id
    return res.json({msg: "status pending"});   
});


//server
app.listen(PORT, ()=>{console.log(`Server running http://localhost:${PORT}`)});