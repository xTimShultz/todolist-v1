// Return a formatted date, e.g. Wednesday, August 11
exports.getDate = function () {
    const today = new Date();

    const options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };

    return today.toLocaleDateString("en-US", options);
}

// Return a day: Sunday, Monday, ...
exports.getDay = function() {
    const today = new Date();

    const options = {
        weekday: "long"
    };

    return day = today.toLocaleDateString("en-US", options);
}

console.log(module.exports);