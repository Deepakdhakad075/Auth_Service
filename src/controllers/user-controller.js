const user = require("../models/user");
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
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
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
       
    }catch(e){

        console.error("Error in fetching user:", e);
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
  }catch(e){
    console.error("Error in signing in user:", e);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: e.message,
    });
  }
}
module.exports = {
  UserController: { createUser,getUser,signIn},
  // You can add more controller methods here as needed
};
