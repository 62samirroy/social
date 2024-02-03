const express=require("express")
const app=express();
const mongoose=require("mongoose")
const dotenv=require("dotenv");
const helmet=require("helmet");
const morgan = require('morgan');
const { json } = require("stream/consumers");
const userRoute=require("./routes/users")
const userAuth=require("./routes/auth")
const postRoute=require("./routes/posts")

dotenv.config();
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    // Your code here, such as starting your Express server
  })
  .catch(error => {
    console.error('Error connecting to MongoDB:', error);
  });


  // Corrected middleware usage
app.use(express.json()); // Use express.json() instead of express,json()
app.use(helmet());
app.use(morgan("common"));


app.use("/api/auth",userAuth)
app.use("/api/users",userRoute)
app.use("/api/posts",postRoute)


app.listen(8800,()=>{

    console.log("backent server is raning");

})