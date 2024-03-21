const mongoose = require('mongoose');

const connectDb = async() => {
    try {
        const connect = await mongoose.connect(process.env.CONNTECTION_STRING);
        console.log("Connection to the databse has been established",
        connect.connection.host,
        "|",
        connect.connection.name);
    } catch(err) {
        console.log(err);
        process.exit(1);
    }
};

module.exports = connectDb;