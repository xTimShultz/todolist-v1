const express = require("express");
const bodyParser = require("body-parser");

const app = express();

let items = ["Buy Food", "Cook Food", "Eat Food"];
let workItems = [];

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res) {

    var today = new Date();

    var options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };
    
    var day = today.toLocaleDateString("en-US", options);

    res.render("list", {listTitle: day, newItems: items});
});

app.post("/", function(req, res) {
    console.log(req.body);

    let item = req.body.newItem;

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

app.get("/work", function(req, res) {
    res.render("list", {listTitle: "Work List", newItems: workItems});
});

app.get("/about", function(req, res) {
    res.render("about");
});

app.post("/work", function (req, res) {
    let item = req.body.newItem;
    workItems.push(item);
    res.redirect("/work");
});

app.listen(3000, function() {
    console.log("Server listening on port 3000");
});