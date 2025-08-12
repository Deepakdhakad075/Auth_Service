'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
  this.belongsToMany(models.Role, {
    through: 'User_Roles',
  });
}
  }
  User.init({
    email: {
      type:DataTypes.STRING,
      allowNull:false,
      unique:true,
       validate:{
          isEmail:true
        }
    },
    password: {
     type: DataTypes.STRING,
     allowNull:false,
     validate:{
          len:[3,16]
         }
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate(async(user) => {
    // Hash the password before saving to the database
    const bcrypt = require('bcrypt');
    const saltRounds = 10;
    try {
      const hashedPassword = await bcrypt.hash(user.password, saltRounds);
      user.password = hashedPassword;
    } catch (error) {
      console.error('Error hashing password:', error);
      throw new Error('Error hashing password');
    }
  });
  return User;
};