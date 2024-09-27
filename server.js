if(process.env.NODE_ENV !== 'production'){
  require('dotenv').config(); // Loads environment variables from a.env file
}

const mongoose = require("mongoose");
const express = require("express");
const expressLayout = require("express-ejs-layouts");
const app = express();

// Routes
const indexRouter = require("./routes/index");

// Middleware
app.set("view engine", "ejs");
app.set("views", __dirname + "/views"); // Note: use 'views' instead of 'view'
app.set("layout", "layouts/layout"); // 'layout' instead of 'layouts'

// Apply express-ejs-layouts middleware
app.use(expressLayout);
app.use(express.static("public"));

// MongoDB connection
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', error => console.error(error));
db.once('open', () => console.log('Connected to Mongoose'));


app.use('/', indexRouter);
// Start the server
app.listen(process.env.PORT || 3000);
