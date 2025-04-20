const mongoose = require('mongoose')

mongoose.connect("mongodb://127.0.0.1:27017/impossible-dash", {
    
}).then(() => {
    console.log("✅ Connected to Mongoose")
}).catch((e) => {
    console.log(e)
})