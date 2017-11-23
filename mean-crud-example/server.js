const express = require("express"),
    bodyParser = require("body-parser"),
    mongoClient = require("mongodb").MongoClient,
    myApp = express();

myApp.use(bodyParser.urlencoded({extended: true}));
myApp.use(bodyParser.json());

// using ejs template engine
myApp.set("view engine", "ejs");

// define static path
myApp.use(express.static("public"));

// define express routes
myApp.get("/", (req, res) => {
    db.collection("quotes").find().toArray((err, result) => {
        if (err) return console.log(err);

        // renders index.ejs
        res.render("index.ejs", {quotes: result});
    });
});
myApp.post("/quotes", (req, res) => {
    console.log(req.body);
    db.collection('quotes').save(req.body, (err, result) => {
        if (err) return console.log(err);

        console.log("Saved to database");
        res.redirect("/");
    });
});
myApp.put("/quotes", (req, res) => {
    db.collection("quotes")
        .findOneAndUpdate(
            {
                name: "Ashwani Kumar Luhaniwal"
            },
            {
                $set: {
                    name: req.body.name,
                    quote: req.body.quote
                }
            },
            {
                sort: {_id: -1},
                upsert: true
            },
            (err, result) => {
                if (err) return res.send(err);
                res.send(result);
            }
        )
});
myApp.delete("/quotes", (req, res) => {
    db.collection("quotes")
        .findOneAndDelete(
            {
                name: req.body.name
            }, 
            (err, result) => {
                if (err) return res.send(500, err);
                res.send({message: "Your comment is deleted now."});
            }
        )
});

// connect to MongoDB
let db;
mongoClient.connect("mongodb://localhost:27017/star-wars-quotes", (err, database) => {
    if (err) return console.log(err);
    db = database;
    myApp.listen(4000, () => {
        console.log("Listening on 4000");
    });
});

/**
 * MongoDB CRUD Methods
 */

/**
 * // Following is the syntax for update query in MongoDB
 * db.collection('collection-name').findOneAndUpdate(
 *  query,
 *  update,
 *  options,
 *  callback
 * )
 */

/**
 * // Following is the syntax for delete query in MongoDB
 * db.collection("quotes").findOneAndDelete(
 *  query,
 *  options,
 *  callback
 * )
 */