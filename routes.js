const db = require("./models");

module.exports = function (app) {
    app.get("/", function (req, res) {
        res.render("index");
    });

    app.get("/view-data", function (req, res) {
        // console.log(req.user);
        // if (req.user) {
        db.Fuel.findAll({
            // Sorted by descending order to get newest entry at the top
            order: [
                ["id", "DESC"]
            ]
        }).then(function (data) {
            console.log(data);
            res.render("view-data", { fueldata: data });
        });
        // } else {
        //     res.send("You must be signed in");
        // // };
    });

    app.get("/submit-data", function (req, res) {
        res.render("submit-data", {
            layout: "main-submit"
        });
    })

    app.post("/submit-data", function (req, res) {
        db.Fuel.create(req.body).then(function (results) {
            res.json(results);
        });
    });

    app.post("/signup", function (req, res) {
        // console.log(req.user);
        res.render("two-buttons");
    });

    app.post("/signin", function (req, res) {
        // console.log(req.user);
        res.render("two-buttons");
    });
}