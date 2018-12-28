var mongoose    = require("mongoose"); 
var passportLocalMongoose = require("passport-local-mongoose");

var userSchema = new mongoose.Schema({
    username: String,
    password: String
});

userSchema.plugin(passportLocalMongoose); //Adds methods to the userSchema required for authentication

module.exports = mongoose.model("User", userSchema);