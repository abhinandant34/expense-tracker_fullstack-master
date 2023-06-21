const UserSchema= require("../models/UserModel")

exports.authUser = async (req, res) =>{
    
    const {username,  password}  = req.body 
    try{
    const user = await UserSchema.findOne({ username });
    if (user && user.verifyUserPassword(password)) {

        res.status(200).json({
            message:'User Login Succesfully', 
            username: user.username,
            })
    }
    else {
        res.status(400).json({ message: 'Wrong username or password' });
      }
    }
    catch(error) {
        res.status(500).json({message: 'Server Error'})    
  }
}

exports.getUser = async (req,res) =>{
    try {
        const user = await UserSchema.find()
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({message: 'Server Error'})
    }
}