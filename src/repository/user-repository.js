const ValidationError = require("../utils/errors/validation-error");
const { User, Role } = require("../models");
const ClientError = require("../utils/errors/client-error");
const { StatusCodes } = require("http-status-codes");

class UserRepository {
  async create(data) {
    try {
      const user = await User.create(data);
      return user;
    } catch (error) {
      console.log("Error in creating user:", error);
      if (error.name === "SequelizeValidationError") {
        throw new ValidationError(error);
      }
      throw error;
    }
  }

  async destroy(id) {
    try {
      const user = await User.destroy({ where: { id } });
      return user;
    } catch (error) {
      console.log("Error in deleting user:", error);
      throw error;
    }
  }

  async get(id) {
    try {
      const user = await User.findByPk(id, {
        attributes: ["email", "id"],
      });
      if (!user) {
        throw new ClientError({
         name: "AttributeNotFound",
         message: `User with id ${id} not found`,
         explanation: `User with id ${id} not found`,
         statusCode: StatusCodes.NOT_FOUND
      });
      }
      return user;
    } catch (error) {
      console.log("Error in fetching user:", error);
      throw error;
    }
  }
  async getByEmail(email) {
    try {
      console.log("Fetching user by email:", email);
      const user = await User.findOne({
        where: { email: email },
      });
      if (!user) {
        throw new ClientError({
          name: "AttributeNotFound",
          message: `User with email ${email} not found`,
          explanation: `User with email ${email} not found`,
          statusCode: StatusCodes.NOT_FOUND
        });
      }
      return user;
    } catch (error) {
      console.log("Error in fetching user by email:", error);

      
      throw error;
    }
  }
  async getAll() {
    try {
      const users = await User.findAll();
      return users;
    } catch (error) {
      console.log("Error in fetching all users:", error);
      throw error;
    }
  }

  async isAdmin(userID) {
    try {
      const user = await User.findByPk(userID);
      const adminRole = await Role.findOne({
        where: { name: "ADMIN" },
      });
      return user.hasRole(adminRole);
    } catch (error) {
      console.log("Error in checking if user is admin:", error);
      throw error;
    }
  }
}
module.exports = UserRepository;
