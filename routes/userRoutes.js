const express = require('express');
const users = require('../MOCK_DATA.json');
const fs = require('fs');

const router = express.Router();


//RESTAPI



router
.get('/',(req,res)=>{
    return res.json(users.sort((a,b)=> a.id - b.id));
})

.post('/',(req,res)=>{
    const body = req.body;
    const newUser = {id: users.length + 1, ...body};
    users.push(newUser);
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err) => {
        if (err) {
            return res.status(500).json({msg: "Server Error"});
        }
        return res.json(newUser);
    
    });
})

.get('/:id',(req, res) => {
    const id = Number(req.params.id);
    console.log(id);
    return res.json(users.find((user) => user.id === id)); 
})
.put('/:id',(req,res)=>{
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


.delete('/:id',(req,res)=>{
    //TODO : delete user by id
    const id = Number(req.params.id);
    const newUserList = users.filter((user)=>user.id !== id)
    fs.writeFile("./MOCK_DATA.json",JSON.stringify(newUserList), (err)=>{
        if(err){
            return res.status(500).json({msg : "Server Error"})
        }
        res.status(200).json({msg: "Deleted Successfully"});
        
    })
});


module.exports = router;

