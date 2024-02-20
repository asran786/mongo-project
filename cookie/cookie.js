const express = require("express");
const cookieParser = require("cookie-parser");
const flash = require("express-flash-message");
const session = require("express-session");
const app = express();
const port = 3000; // Using a conventional port number

// Middleware
app.use(cookieParser());
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

app.set("view engine", "ejs");

app.get("/register", (req, res) => {
    let { name = "anonymous" } = req.query;

    if (name === "anonymous") {
        req.flash("error", "something went wrong");
    } else {
        req.flash("success", "user registered");
    }

    res.redirect("/");
});

app.get("/", (req, res) => {
    let error = req.flash("error");
    let success = req.flash("success");

    res.render("message.ejs", { error, success });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});