const express = require('express');
const dotenv = require('dotenv');
const users = require("./MOCK_DATA.json");
const fs = require('fs');


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

app.use(express.urlencoded({extended: false}));
app.use(express.json());


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
    // Update user by id
    const id = Number(req.params.id);
    const body = req.body;
    const userIndex = users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
        return res.status(404).json({msg: "User not found"});
    }

    users[userIndex] = { ...users[userIndex], ...body };
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err) => {
        if (err) {
            return res.status(500).json({msg: "Server Error"});
        }
        return res.status(200).json({msg: "Updated Successfully"});
    });
})


.delete((req,res)=>{
    //TODO : delete user by id
    const id = Number(req.params.id);
    const newUserList = users.filter((user)=>user.id !== id)
    fs.writeFile("./MOCK_DATA.json",JSON.stringify(newUserList), (err)=>{
        if(err){
            return res.status(500).json({msg : "Server Error"})
        }
        return res.status(200).json({msg: "Deleted Successfully"})
        console.log("Deleted Succesfully")
    })
})

app.post('/api/users',(req,res)=>{
    //TODO : create user by id
    const body = req.body;
    users.push({id:users.length+1, ...body});
    fs.writeFile('./MOCK_DATA.json',JSON.stringify(users),(err,data)=>{
        if(err){
            return res.status(500).json({msg : "Server Error"})
        }
        return res.status(200).json({msg: "Posted Successfully"})
        console.log("New user inserted!");
    });  
    
});


//server
app.listen(PORT, ()=>{console.log(`Server running http://localhost:${PORT}`)});