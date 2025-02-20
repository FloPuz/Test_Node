const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const User = require('../models/user')
const router = express.Router();


router.post('/', async (req, res) => {
    try {
        const email = req.body.email;
        const password  = req.body.password;
        if (!email || !password) {
            return res.status(400).json({ message: "Email et mot de passe requis" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Identifiants invalides" });
        }

        const secretKey = process.env.SECRET_KEY;
        if (!secretKey) {
            return res.status(500).json({ message: "SECRET_KEY manquante dans .env" });
        }

        const isMatch = await bcrypt.compare(password + secretKey, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Identifiants invalides" });
        }
            
        // Générer un token JWT 
        let token = "notyetdefined"
        //const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ message: "Connexion réussie", token });

    } catch (err) {
        console.error(" Erreur de connexion :", err);
        res.status(500).json({ message: "Erreur interne du serveur" });
    }
});

module.exports = router;
