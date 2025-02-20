const user = require('../models/user'); // Assurez-vous que le modèle User est correctement défini dans ce chemin

module.exports.addUser = async (userData) => {
    try {
        const user = new user(userData);
        await user.save();
        return user;
    } catch (error) {
        throw new Error('Error adding user: ' + error.message);
    }
};

module.exports.getUsers = async () => {
try {
    let users = await user.find();
    return users;
} catch (e) {
    throw Error('Error while query all Users'); 
}
};

module.exports.getUserById = async (id) => {
    try {
        let users = await user.findById(id);
        return users;
    } catch (e) {
        throw Error('Error while query user with id ' + id); 
    }
    };