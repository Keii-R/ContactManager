const express = require("express");
const connectDb = require("./config/dbConnection");
const errorHandler = require("./middleware/errorhandler");
const dotenv = require("dotenv").config();
const app = express();

connectDb();
const port = process.env.PORT;

app.listen(port, () => {
    console.log(`The app is active on port http://localhost:${port}`);
}); 

app.use(express.json());
app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use(errorHandler);
    
