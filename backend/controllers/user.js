const UserSchema= require("../models/UserModel")

exports.addUser = async (req, res) => {
    const {name, username,  password}  = req.body   
    const user = UserSchema({
        name,
        username,
        password
    })

    try {   
        const existingUser = await UserSchema.findOne({username});
        if (existingUser) {
            return res.status(400).json({message: 'Username already exists!'})
        }
    
        await user.save()
        res.redirect('/');
        return res.status(200).json({message: 'User Added'})
    } catch (error) {
        res.status(500).json({message: 'Server Error'})
    }

    console.log(user)
}