const Role = require('../models/role');

module.exports = function (app, bodyParser) {
    // create application/x-www-form-urlencoded parser
    let urlencodedParser = bodyParser.urlencoded({ extended: false })

    app.get("/role", function (req, res) {
        Role.find({}).then(function (roles) {
            res.send(roles);
        });
    });

    // POST - application/x-www-form-urlencoded
    app.post('/role', urlencodedParser, function (req, res) {
        var newRole = new Role({
            name: req.body.name,
        });
        newRole.save(function (err) {
            if (err) {
                console.log(`ERROR: ${err}`);
                res.json({ kq: 0 });
            } else {
                console.log('Save successfully.');
                res.json({ kq: 1 });
            }
        });
    });
}