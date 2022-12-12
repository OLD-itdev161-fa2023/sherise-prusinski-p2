const mongoose = require("mongoose");
const config = require("config");

//Get the connection string
const db = config.get('mongoURI');

//Connect to MongoDB
const connectDatabase = async () => {
    try {
        await mongoose.connect(db, {
            keepAlive: true, // keeping the connection alive
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        mongoose.set("debug", true) // enabling debugging information to be printed to the console for debugging purposes
        mongoose.Promise = Promise // setting mongoose's Promise to use Node's Promise

        console.log('Connected to MongoDB');
    } catch (error) {
        console.error(error.message);
        //Exit with failure code
        process.exit(1);
    }
};

module.exports = connectDatabase; // exporting the method
module.exports.Task = require("../models/task"); //export Task model