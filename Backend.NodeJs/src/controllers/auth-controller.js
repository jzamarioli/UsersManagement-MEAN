const repository = require('../repositories/auth-repository');
const authService = require('../services/auth-service');
const cryptoService = require('../services/crypto-service');

exports.authenticate = async(req, res, next) => {
    try {        
        const username = req.body.username;
        const password = req.body.password;
        let name, email, role;        

        let user = await repository.authenticateUser({
            username: username,
            password: cryptoService.EncryptMD5(password)
        });        

        if (!user) {
            res.status(404).send({
                message: 'Invalid user/password'
            });
            return;
        }
        else
        {
            user = JSON.parse(user);
            name = user.name;            
            email = user.email;
            role = user.role;
        }
        const token = await authService.generateToken({            
            name: name,            
            role: role
        });

        res.status(201).send({
            token: token,
            data: {
                username: username,
                name: name,
                email: email,
                role: role
            }
        });
    } catch (e) {
        res.status(500).send({
            message: 'Error processing your request'
        });
    }
};

