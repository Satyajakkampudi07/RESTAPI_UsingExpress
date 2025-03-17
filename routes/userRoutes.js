const express = require('express');
const { getAllUsers, postNewUser, updateUserById, deleteUserById, getUserById} = require('../Controllers/CrudControllers');
const router = express.Router();


//RESTAPI
router
.get('/', getAllUsers)
.post('/', postNewUser)
.get('/:id', getUserById)
.put('/:id', updateUserById)
.delete('/:id',deleteUserById);


module.exports = router;

