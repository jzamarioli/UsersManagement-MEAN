const ValidationContract = require('../validators/fluent-validator');
const repository = require('../repositories/user-repository');
const cryptoService = require('../services/crypto-service');

exports.getAll = async(req, res, next) => {
    try {
        var data = await repository.getAll();
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: 'Error getting users'
        });
    }
}

exports.getById = async(req, res, next) => {
    try {
        var data = await repository.getById(req.params.id);
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: 'Error getting user'
        });
    }
}

exports.getByName = async(req, res, next) => {
    try {
        var data = await repository.getByName(req.params.name);
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: 'Error getting user'
        });
    }
}


exports.getByUsername = async(req, res, next) => {
    try {
        const data = await repository.getByUsername(req.params.username);
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: 'Error getting user'
        });
    }
}

exports.getByRole = async(req, res, next) => {
    try {
        var data = await repository.getByRole(req.params.role);
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: 'Error getting user'
        });
    }
}

exports.post = async(req, res, next) => {
    let validationErrors = validateUserData(req);
    let existinguser;

    if (validationErrors) {
        res.status(400).send(validationErrors).end();
        return;
    }
    try {
        existinguser  = await repository.getByUsername(req.body.username);
        if  (! existinguser) {
            result = await repository.create({
                name: req.body.name,
                username: req.body.username,
                password: cryptoService.EncryptMD5(req.body.password),            
                role: req.body.role,
                email: req.body.email            
            });
            res.status(201).send({
                message: 'User inserted'
            });
        } else {
            res.status(200).send({
                message: 'Username already exists'
            });
        }
    } catch (e) {
        console.log(e);
        res.status(500).send({
            message: 'Error inserting user'
        });
    }
};

exports.put = async(req, res, next) => {
    let validationErrors = validateUserData(req);

    if (validationErrors) {
        res.status(400).send(validationErrors).end();
        return;
    }

    try {
        await repository.update(req.params.id, {
            name: req.body.name,
            username: req.body.username,
            password: cryptoService.EncryptMD5(req.body.password),
            role: req.body.role,
            email: req.body.email}            
            );
        res.status(200).send({
            message: 'User updated'
        });
    } catch (e) {
        res.status(500).send({
            message: 'Error updating user'
        });
    }
};

exports.delete = async(req, res, next) => {
    try {
        await repository.delete(req.params.id)
        res.status(200).send({
            message: 'User deleted'
        });
    } catch (e) {
        res.status(500).send({
            message: 'Error deleting user'
        });
    }
};

validateUserData = (req) => {
    let contract = new ValidationContract();    

    contract.isRequired(req.body.name, "Name is required");
    contract.isRequired(req.body.username, "User Name is required");
    contract.isRequired(req.body.password, "Password is required");
    contract.isRequired(req.body.role, "Role is required");    

    contract.hasMinLen(req.body.name, 5, 'Name must contain at least 5 characters');    
    contract.hasMinLen(req.body.username, 3, 'User Name must contain at least 3 characters');   
    
    if (! contract.isValid()) 
        return contract.errors();    
    else    
        return null;    

}