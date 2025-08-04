const mongoose = require('mongoose');

const dbString =
 'mongodb+srv://ankitkumarakki85:9FBV0r09uPYqEeW0@cluster0.hsyxlda.mongodb.net/BMS?retryWrites=true&w=majority&appName=Cluster0'

mongoose.connect(dbString);

const connection = mongoose.connection;

connection.on("connected", () => {
  console.log("connection Successfull");
});

connection.on("error", () => {
  console.log("connection unsuccesssful");
});
