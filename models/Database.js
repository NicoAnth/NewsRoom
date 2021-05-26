const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

//lire le fichier .env (variables denvironnement personnelles)
const uriBD = process.env.URI;

const connection = mongoose.createConnection(uriBD, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});




module.exports = connection;