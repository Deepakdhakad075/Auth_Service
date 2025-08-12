
const { UserService } = require("../services/index");
const userService = new UserService();
const createUser = async (req, res) => {
  try {
    const user = await userService.create({
      email: req.body.email,
      password: req.body.password,
    });
    return res.status(201).json({
      success: true,
      data: user,
      message: "User created successfully",
    });
  } catch (error) {
    console.error("Error in creating user:", error);
    return res.status(error.statusCode).json({
      success: false,
      message: error.explanation || "Internal Server Error",
      error: error.message || "An unexpected error occurred",
      
    });
  }
};

const getUser = async(req,res) =>{
    try{
       const user  = await userService.getUser(req.params.id);
        return res.status(200).json({
            success:true,
            data:user,
            message:"User fetched successfully"
        });
       
    }catch(error){

        console.error("Error in fetching user:", error);
        
            return res.status(error.statusCode).json({
                success: false,
                message: error.message || "User not found",
                error: error.explanation || "The requested user does not exist",
            });
    }
}


const isAuthenticated = async(req, res) => {
      try{
       const token = req.headers['x-access-token'];

        if (!token) {
          return res.status(401).json({
            success: false,
            message: "No token provided",
          });
        }
        const response = await userService.isAuthenticated(token);
        if (!response) {
          return res.status(401).json({
            success: false,
            message: "Invalid token",
          });
        }
        return res.status(200).json({
          success: true,
          data: response,
          message: "User is authenticated",
        });
      } catch (error) {
        console.error("Error in authentication:", error);
        return res.status(500).json({
          success: false,
          message: "Internal Server Error",
        });
      }
}
const signIn = async(req,res)=>{
  try{
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });}
     const response = await userService.signIn(
      email,
      password)
      return res.status(200).json({
          success:true,
          data:response,
          message:"User signed in successfully"
      });
  }catch(error){
    console.error("Error in signing in user:", error);

    return res.status(error.statusCode).json({
      success: false,
      message: error.message,
      error: error.explanation,
    });
  }
}
const isAdmin = async (req,res)=>{
  try{
    const response = await userService.isAdmin(req.body.id);
    if (response) {
      return res.status(200).json({
        success: true,
        message: "User is an admin",
        data: response,
      });
    } else {
      return res.status(403).json({
        success: false,
        message: "User is not an admin",
      });
    }
  }
  catch(error){
    console.error("Error in checking admin status:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}
module.exports = {
  UserController: { createUser,getUser,signIn,isAuthenticated,isAdmin},
  // You can add more controller methods here as needed
};
