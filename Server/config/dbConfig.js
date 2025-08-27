const mongoose = require('mongoose');

const dbURL =process.env.DB_URL

const connectDB=async ()=>{
  try {
    await mongoose.connect(dbURL);
    console.log('Connected to Db')
  } catch (err) {
    console.log('Error connecting to DB',err)
    process.exit(1)
  }
}


// await mongoose.connect(dbURL);
// const connection = mongoose.connection;

// connection.on("connected", () => {
//   console.log("connection Successfull");
// });

// connection.on("error", () => {
//   console.log("connection unsuccesssful");
// });


module.exports=connectDB