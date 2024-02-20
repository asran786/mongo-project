const express = require("express")
const bodyParser = require("body-parser")
const methodOverride = require('method-override')
const engine = require('ejs-mate')
const listingRouter = require('./routes/listing') //import the route module for listings
const reviewRouter = require('./routes/review') //import the route module for listings
const userRouter = require('./routes/users') //import the route module for listings
const ExpressError = require("./utils/expressError.js")
const session = require("express-session")
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const UserData = require("./models/user.js");
const dbConnect = require("./models/dbConnection.js")
const app = express();
const port = 1200;



app.set("view engine", "ejs")
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.engine('ejs', engine);
app.use(express.static("public"))

const session1 = session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true
    }
})
app.use(session1);
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(UserData.authenticate()));

passport.serializeUser(UserData.serializeUser());
passport.deserializeUser(UserData.deserializeUser());

app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.CurUser = req.user;
    next();
})

// routes
app.use("/listing", listingRouter)
app.use("/listing/new/:id/reviews", reviewRouter)
app.use("/user", userRouter)






app.all("*", (req, res, next) => {
    const error = new ExpressError(404, "Page not found");
    next(error);
});
app.use((err, req, res, next) => {
    let { statusCode = 500, message = "something went wrong" } = err;
    console.log(statusCode, message);
    res.status(statusCode).render("error.ejs", { err })
});



app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})