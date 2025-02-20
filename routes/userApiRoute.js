const express = require('express')
const router = express.Router()
const User = require('../models/user')
const UserService = require('../services/userApiService')

// Get all users
router.get('/', async (req, res) => {
    try {
        const users = await UserService.getUsers()
        res.status(200).json(users)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// Get one user
router.get('/:id', getUser, (req, res) => { 
    res.json(res.user)
})

// Create one user
router.post('/', async (req, res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email
    })
    try {
        const newUser = await UserService.createUser(user)
        res.status(201).json(newUser)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})


// Delete one user
router.delete('/:id', getUser, async (req, res) => {
    try {
        await UserService.deleteUser(res.user)
        res.json({ message: 'Deleted User' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// Middleware to get user by ID
async function getUser(req, res, next) {
    let user
    try {
        user = await UserService.getUserById(req.params.id)
        if (user == null) {
            return res.status(404).json({ message: 'Cannot find user' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
    res.user = user
    next()
}
module.exports = router;