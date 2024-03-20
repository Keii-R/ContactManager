const express = require("express");
const errorHandler = require("./middleware/errorhandler");
const dotenv = require("dotenv").config();
const app = express();

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`The app is active on port http://localhost:${port}`);
}); 

app.use(express.json());
app.use("/api/contacts", require("./routes/contactRoutes"));
app.use(errorHandler);
    
