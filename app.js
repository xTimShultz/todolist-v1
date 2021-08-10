const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.set("view engine", "ejs");

app.get("/", function(req, res) {
    var today = new Date();
    var daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var dayOfWeek1 = daysOfWeek[today.getDay()];
    if (today.getDay() === 6 || today.getDay() === 0) {
        day = "Weekend";
    } else {
        day = "Weekday";
    };
    res.render("list", {kindOfDay: day, dayOfWeek: dayOfWeek1});
});


app.listen(3000, function() {
    console.log("Server listening on port 3000");
});