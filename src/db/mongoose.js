const mongoose = require('mongoose')
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URL, {
    
}).then(() => {
    console.log("✅ Connected to Mongoose")
}).catch((e) => {
    console.log(e)
})