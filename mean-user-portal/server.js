let express     = require("express"),       // ExpressJS Framework
    myApp       = express(),                // Invoke express to variable for use in application
    port        = process.env.PORT || 4000, // set default port or assign a port in environment
    morgan      = require("morgan"),        // Import Morgan package
    mongoose    = require("mongoose"),      // HTTP request logger middleware for NodeJS
    bodyParser  = require("body-parser"),   // NodeJS body parsing middleware. Parses incoming request bodies in a middleware before your handlers, available under req.body
    router      = express.Router(),         // Invoke Express Router
    path        = require("path"),          // Import path module
    passport    = require("passport");      // Express-compatible authentication middleware for NodeJS

myApp.use(morgan("dev"));                           // Morgan Middleware
myApp.use(bodyParser.json());                       // Body-Parser Middleware
myApp.use(bodyParser.urlencoded({extended: true})); // For parsing application/x-www-form-urlencoded
myApp.use(express.static(__dirname + "/public"));   // Allow front end to access public folder

// Establish database connection
mongoose.connect("mongodb://localhost:27017/user-portal", (err) => {
    if (err) {
        console.log("Not connected to the database: " + err);
    } else {
        console.log("Successfully connected to MongoDB");
    }
});

// Set application static layout
myApp.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/public/app/views/index.html"));
});

// Start the server
myApp.listen(port, () => {
    console.log("Running the server on port " + port);
});