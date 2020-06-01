require('dotenv').config()
const path = require("path")
const express = require("express")
const app = express()
const mongoose = require("mongoose")
const port = 3333


// Import routes
const indexRoutes = require("./routes/index.routes")

// connect database
mongoose.connect(process.env.DATABASE_URL, 
    {useNewUrlParser: true, useUnifiedTopology: true}).then(function() {
        console.log("Successfully connected to the database");    
    }).catch(function(err) {
        console.log('Could not connect to the database. Exiting now...', err);
        process.exit();
    });

// Settings
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// routes
app.use(indexRoutes);

app.listen(port, function(){
    console.log(`Server listening ${port}`)
})