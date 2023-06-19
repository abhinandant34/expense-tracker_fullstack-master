const mongoose = require('mongoose');
const bcrypt= require("bcryptjs");

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    username: {
        type: String,
        required: [true, "Username Required."],
        trim: true,
        maxLength: 50
    },
    password: {
        type: String,
        required: [true, "Password Required."],
        maxLength: 20,
        trim: true
    },
}, {timestamps: true})

UserSchema.methods = {
    verifyUserPassword: function (password) {
      return bcrypt.compareSync(password, this.password);
    },
    changePassword: function (newpassword) {
      this.password = newpassword;
      this.save();
    },
  };
  
  UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = bcrypt.hashSync(this.password, 12);
  });

module.exports = mongoose.model('User', UserSchema)