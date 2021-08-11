const express = require("express");
const bodyParser = require("body-parser");

const app = express();

var items = ["Buy Food", "Cook Food", "Eat Food"];

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {

    var today = new Date();

    var options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };
    
    var day = today.toLocaleDateString("en-US", options);

    res.render("list", {kindOfDay: day, newItems: items});
});

app.post("/", function(req, res) {
    item = req.body.newItem;
    items.push(item);
    res.redirect("/");
});

app.listen(3000, function() {
    console.log("Server listening on port 3000");
});