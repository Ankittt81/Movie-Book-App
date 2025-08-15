const express = require("express");
const app = express();
const dbConfig = require("./config/dbConfig");
const userRoutes = require("./routes/userRoutes");
const movieRoutes=require('./routes/movieRoutes')
const theatreRoutes=require('./routes/theatreRoutes')
const cors = require("cors");
app.use(cors({ origin: "*" })); //middleware


app.use(express.json()); //middleware
//all middleware called before router middleware


app.use("/api/users", userRoutes);
app.use('/api/movies',movieRoutes)
app.use('/api/theatre',theatreRoutes)

app.listen(8088, () => {
  console.log("Server started at port 8088");
});
