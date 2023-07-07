const express =  require("express");
const dotenv = require("dotenv").config();
const app = express();
const router = require('./routes/contactRoutes') ;
const errorHandler = require("./middleware/errorHandler");
const connectDB = require("./config/dbConnection");

connectDB();
const port = process.env.PORT || 5000
app.use(express.json());
app.use("/api/contacts",router)
app.use(errorHandler);
app.listen(port, () => {
  console.log("Server is running on port: ",port);
});