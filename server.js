const express=require("express")
const app=express();
const dbConfig=require("./config/dbConfig")
const port= process.env.PORT || 5000;
require('dotenv').config();
app.use(express.json())

const usersRoute = require('./routes/usersRoute')
const busesRoute = require("./routes/busesRoute");

app.use("/api/buses", busesRoute);
app.use('/api/users',usersRoute)

app.listen(port, ()=>console.log(`Server running on port ${port}`));