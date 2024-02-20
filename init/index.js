const express = require("express")
const mongoose = require("mongoose")
const schemaModel = require("../models/schemaModel.js")
const listingData = require("./data")
const dbConnection = require("../models/dbConnection.js")


const dbdtt = async() => {
    await schemaModel.deleteMany({});
    const dd = await schemaModel.insertMany(listingData.data)

    console.log("initialized data")
}
dbdtt();