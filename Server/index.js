const express = require("express");
const cors = require("cors");
const app = express();
 
require("dotenv").config();  //load environment variables

const connectDB = require("./config/dbConfig");
const userRoutes = require("./routes/userRoutes");
const movieRoutes = require("./routes/movieRoutes");
const theatreRoutes = require("./routes/theatreRoutes");
const showRoute = require("./routes/showRoutes");
const bookingRoute = require("./routes/bookingRoute");


connectDB() //connect to DB


//Correct Middleware Order
app.use(express.json()); //middleware
app.use(cors())
//all middleware called before router middleware

//Routes
app.use("/api/users", userRoutes);
app.use("/api/movies", movieRoutes);
app.use("/api/theatre", theatreRoutes);
app.use("/api/shows", showRoute);
app.use("/api/bookings", bookingRoute);

app.listen(8088, () => {
  console.log("Server started at port 8088");
});
