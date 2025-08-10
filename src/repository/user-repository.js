const {User} = require('../models');


class UserRepository {
    async create(data){
        try {
            const user = await User.create(data);
            return user;
        } catch (error) {
           console.log('Error in creating user:', error);
           throw error;
        }
    }

    async destroy(id){
        try {
            const user = await User.destroy({ where: { id } });
            return user;
        } catch (error) {
           console.log('Error in deleting user:', error);
           throw error;
        }
    }

    async get(id){
        try {
            const user = await User.findByPk(id,{
                attributes : ['email','id']
            });
            if (!user) {
                throw new Error('User not found');
            }
            return user;
        } catch (error) {
           console.log('Error in fetching user:', error);
           throw error;
        }
    }
    async getByEmail(email){

    try {
        console.log('Fetching user by email:', email);
         const user  = await User.findOne({
            where: { email: email }
         })
         return user;
    } catch (error) {
        console.log('Error in fetching user by email:', error);
        throw error;
    }



    }
    async getAll(){
        try {
            const users = await User.findAll();
            return users;
        } catch (error) {
           console.log('Error in fetching all users:', error);
           throw error;
        }
    }

}
module.exports = UserRepository;