const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const dbConnection = mongoose.connect("mongodb://localhost:27017/listingAllUser")


module.exports = dbConnection;