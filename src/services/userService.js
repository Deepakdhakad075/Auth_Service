const {UserRepository}= require('../repository/index');


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

}

module.exports = UserService;