

const AuthReqMiddleware = (req,res,next)=>{
    try {
         const {email , password} = req.body;
     if(!email || !password){
         return res.status(400).json({
             success: false,
             message: "Email and password are required"
         });
     }
     next();
    } catch (error) {
        console.log('Error in AuthReqMiddleware:', error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
        
    }
}
const isAdminMiddleware=(req,res,next)=>{
    try{
        if(!req.body.id){
            return res.status(400).json({
                success: false,
                message: "User ID is required"
            });
        }

        next();
    }
    catch(error){
       console.error('Error in isAdminMiddleware:', error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}
module.exports = {
    AuthReqMiddleware,
    isAdminMiddleware   
};