const mongoose = require('mongoose');

main().then(() => {
    console.log("MongoDb Connection Successfull!")
}).catch(err => console.log("MongoDb Connection Failed!"));

async function main() {
    mongoose.connect(
        `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PWD}@expenzacluster.eccc7k9.mongodb.net/`,
    )
}

require("./user.model");
require("./expense.model");