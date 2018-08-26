const mongoose = require('mongoose');
const User = mongoose.model('User');

exports.getAll = async() => {
    return await User
        .find();
}

exports.getById = async(id) => {
    return await User
        .findById(id);
}

exports.getByName = async(name) => {
    return await User
        .find({
            name: name
        });
}


exports.getByUsername = async(username) => {
    return await User
        .findOne({
            username: username
        });
}

exports.getByRole = async(role) => {
    return await User
        .find({
            role: role
        });
}

exports.validateUsernamePassword = async(username, password) => {
    return await User
        .findOne({
            username: username,
            password: password
        });
}

exports.create = async(data) => {
    var user = new User(data);
    await user.save();    
}

exports.update = async(id, data) => {
    await User
        .findByIdAndUpdate(id, {
            $set: {
                name: data.name,
                username: data.username,
                password: data.password,
                role: data.role,
                email: data.email
            }
        });
}

exports.delete = async(id) => {
    await User
        .findByIdAndRemove(id);
}