const mongoose = require("mongoose");
const passportLocalMongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String,
        required: [true, "Please provide your name"]
    }
});
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("UserData", UserSchema)