const userRepository = require('./user-repository');

exports.authenticateUser = async (data) => {    
    let userData;
    const user = await userRepository.validateUsernamePassword(data.username, data.password);
    if (user)        
        userData = `{
            "name": "${user.name}",
            "username": "${user.username}",
            "email": "${user.email}",
            "role": "${user.role}"
        }`;    
    return userData;
}