const express = require('express')
const bcrypt = require('bcrypt')
const router = express.Router()
const User = require('../models/user')
const UserService = require('../services/userApiService')
const UserApiController = require('../controllers/userApiController')


//New 

router.get('/', UserApiController.getAllUsers);
router.post('/', UserApiController.createUser);
router.get('/:id', UserApiController.getUserById);
router.put('/:id', UserApiController.updateUser);
router.delete('/:id', UserApiController.deleteUser);

//En dessous c'est à jeter après 


// // Get all users
// router.get('/', async (req, res) => {
//     try {
//         const users = await UserService.getUsers()
//         res.status(200).json(users)
//     } catch (err) {
//         res.status(500).json({ message: err.message })
//     }
// })

// // Get one user
// router.get('/:id', getUser, (req, res) => { 
//     res.json(res.user)
// })

// // Create one user
// router.post('/', async (req, res) => {
//     let secretKey = process.env.SECRET_KEY;

//     let passwordWithSecret = req.body.password + secretKey;

//     // Hachage du mot de passe renforcé
//     let saltRounds = 10;
//     let hashedPassword = await bcrypt.hash(passwordWithSecret, saltRounds);
//     console.log(req.body)
//     let user = new User({
//         firstName: req.body.firstName,
//         lastName: req.body.lastName,
//         email: req.body.email,
//         password: hashedPassword

//     })
//     try {
//         const newUser = await UserService.addUser(user)
//         res.status(201).json(newUser)
//     } catch (err) {
//         res.status(400).json({ message: err.message })
//     }
// })


// // Delete one user
// router.delete('/:id', getUser, async (req, res) => {
//     try {
//         await UserService.deleteUser(res.user)
//         res.json({ message: 'Deleted User' })
//     } catch (err) {
//         res.status(500).json({ message: err.message })
//     }
// })

// // Middleware to get user by ID
// async function getUser(req, res, next) {
//     let user
//     try {
//         user = await UserService.getUserById(req.params.id)
//         if (user == null) {
//             return res.status(404).json({ message: 'Cannot find user' })
//         }
//     } catch (err) {
//         return res.status(500).json({ message: err.message })
//     }
//     res.user = user
//     next()
// }
module.exports = router;