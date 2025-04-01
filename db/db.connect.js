const mongoose = require("mongoose")
require("dotenv").config()

const mongoURI = process.env.MONGODB

const initialiseDatabaseConnection = async ()=>{

 await mongoose.connect(mongoURI).then(()=>console.log("DB Connected")).catch(error=>console.log("An error occured while fetching data.",error))

}

module.exports = {initialiseDatabaseConnection}