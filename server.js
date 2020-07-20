// Dependencies
const express = require("express");
const path = require("path");
const session = require("express-session");
const passport = require("passport");

// Setting up port and requiring models for syncing
const PORT = process.env.PORT || 9000;
const db = require("./models");

// Instantiate our app
const app = express();

// View engine setup
app.set("view engine", "handlebars");

// Set up handlebars
const exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({
    defaultLayout: "main"
}));
app.set("view engine", "handlebars");
app.use(express.static("public/assets/img"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Load passport strategies
require("./config/passport")(passport, db.User);
app.use(passport.initialize());
// Persistent login sessions
app.use(passport.session());
// Session secret
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));

require("./routes")(app, passport);

// Catch 404 and forward to error handler
// app.use(function(req, res, next) {
//     const err = new Error("Not Found");
//     err.status = 404;
//     next(err);
// });

// Error handler
// app.use(function(err, req, res, next) {
//     res.status(err.status || 500);
//     res.render("error", {
//         message: err.message,
//         error: (app.get("env") === "development") ? err: {}
//     })
// });

db.sequelize.sync().then(function() {
    app.listen(PORT, function() {
        console.log(`==> 🌎 Listening on port %s. Visit http://localhost:%s/ in your browser.`, PORT);
    });
});