const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js"); // getDate() - formatted date

// Setup and use EJS
const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// Pre-defined To Do lists
const items = ["Buy Food", "Cook Food", "Eat Food"];
const workItems = [];

// ROUTES

// Root
app.get("/", function(req, res) {
    const day = date.getDate();
    res.render("list", {listTitle: day, newItems: items});
});

app.post("/", function(req, res) {
    console.log(req.body);

    const item = req.body.newItem;

    // Use the button's name & value attribute to differentiate which list.
    // This is TRICKY, because the same button is used during render of the html
    // for both lists (today & work). Meaning, that when a new item is added
    // via the button, it ends up here. The button posts to "/" in the form element.
    // So some scriptlet code exists in the button in list.ejs
    // to set the value attribute for the button to the list title.
    // This is checked in the condition below, so that new items
    // are added to the correct list and redirected to the corresponding get for that list.
    if (req.body.list === "Work") {
        workItems.push(item);
        res.redirect("/work");
    } else {
        items.push(item);
        res.redirect("/");
    }

});

// Work list
app.get("/work", function(req, res) {
    res.render("list", {listTitle: "Work List", newItems: workItems});
});

app.post("/work", function (req, res) {
    const item = req.body.newItem;
    workItems.push(item);
    res.redirect("/work");
});

// About page
app.get("/about", function(req, res) {
    res.render("about");
});

// Start listening
app.listen(3000, function() {
    console.log("Server listening on port 3000");
});
