const mongoose=require('mongoose');
// mongoose.connect(process.env.mongo_url)
mongoose.connect("mongodb+srv://Pratik:Pratik1807@cluster0.7thpltd.mongodb.net/MernBus")
const db=mongoose.connection;
db.on('connected',()=>{
    console.log("MongoDb connection succesful")
})

db.on('error',()=>{
    console.log("Connection failed")
})