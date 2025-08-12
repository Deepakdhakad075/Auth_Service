const { JWT_SECRET } = require('../config/serverConfig');
const {UserRepository}= require('../repository/index');
 const jwt = require('jsonwebtoken');
 const bcrypt = require('bcrypt');

class UserService {
    constructor() {
        this.userRepository = new UserRepository();
    }

    async create(data) {
          try {
            const user = await this.userRepository.create(data);
            return user;
            
          } catch (error) {
            console.log('Error in service layer for creating user:', error);
            if(error.name === 'ValidationError') {
                throw error; // Propagate validation errors
            }
            throw error;
          }
    }

    async destroy(id) {
        try {
            const user = await this.userRepository.destroy(id);
            return user;
        } catch (error) {
            console.log('Error in service layer for deleting user:', error);
            throw error;
        }
    }

    async getUser(id) {
        try {
            const user = await this.userRepository.get(id);
            return user;
        } catch (error) {
            console.log('Error in service layer for fetching user:', error);
            if (error.name === 'AttributeNotFound') {
                console.log(error.statusCode, error.message,"service layer error");
                throw error; // Propagate attribute not found errors
            }
            throw error;
        }
    }


    async getAllUsers() {
        try {
            const users = await this.userRepository.getAll();
            return users;
        } catch (error) {
            console.log('Error in service layer for fetching all users:', error);
            throw error;
        }
    }
    //costome func for create token and verify token

    createToken(user) {
      try {
          const token = jwt.sign(user,JWT_SECRET , { expiresIn: '24h' });
        return token;
      } catch (error) {
        console.error('Error in creating token:', error);
        throw new Error('Error in creating token');
      }
    }
   
  

    verifyToken(token) {
        try {
            const decoded = jwt.verify(token, JWT_SECRET);
            console.log(decoded,"decoded dataaaa");
            return decoded;
        } catch (error) {
            console.error('Error in verifying token:', error);
            throw new Error('Invalid token');
        }
    }

    checkPassword(user,password){
         try {
             const isMatch = bcrypt.compareSync(password, user.password);
            if (!isMatch) {
                throw new Error('Invalid password');
            }   
        return isMatch;
            
         } catch (error) {
            
            console('Error in checking password:', error);
            throw new Error('password not match');
         }
    }
    
    async isAuthenticated(token) {
        try {
            const response  = this.verifyToken(token);
            
            const user = await this.userRepository.get(response.id)
            
            if (!user) {
                throw new Error('User not found');
            }
            return user;
        } catch (error) {
            console.error('Error in isAuthenticated:', error);
            throw new Error('Authentication failed');


        }
    }

    async signIn(email, password) {
        try {
            const user = await this.userRepository.getByEmail(email);
            if (!user) {
                throw new Error('User not found');
            }
            // Check password
            const isPasswordValid = this.checkPassword(user, password);
            if (!isPasswordValid) {
                throw new Error('Invalid password');
            }
            // Create token
            const token = this.createToken({ id: user.id, email: user.email });
          
          
    const cleanUser = user.toJSON();  // Plain object
    delete cleanUser.password;        // Remove sensitive data
    cleanUser.token = token;

    return cleanUser;
        } catch (error) {
            if (error.name === 'AttributeNotFound') {
              throw error;

            }
            console.error('Error in signIn:', error);
            throw error;
        }
    }
   
    isAdmin(userID){
        try {
           return  this.userRepository.isAdmin(userID);

        } catch (error) {
             console.error('Error in check Admin in service layer:', error);
            throw error;
            
        }
    }


}

module.exports = UserService;