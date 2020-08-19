const User = require('../models/user');

module.exports = function (app, bodyParser) {
    // create application/json parser
    let jsonParser = bodyParser.json()
    // create application/x-www-form-urlencoded parser
    let urlencodedParser = bodyParser.urlencoded({ extended: false })

    app.get("/user", function (req, res) {
        User.find({}).then(function (users) {
            res.send(users);
        });
    });

    app.get("/user/:id", function (req, res) {
        res.end(`${req.params.id}_${req.query.token}`);
    });

    // POST - application/x-www-form-urlencoded
    app.post('/user', urlencodedParser, function (req, res) {
        res.send('welcome, ' + req.body.username)
    });

    // POST - application/json
    app.post('/api/user', jsonParser, function (req, res) {
        // create user in req.body
        // res.end(JSON.stringify(req.body, null, 2))

        var user = new User({
            code: req.body.code,
            name: req.body.name,
            age: req.body.age,
            roles: req.body.roleId
        });

        User.findOneAndDelete({ code: req.body.code }, function (err) {
            if (err) {
                return res.json({ kq: 0 });
            }
        });

        user.save(function (err) {
            if (err) {
                return res.json({ kq: 0 });
            }
        });

        res.json({ kq: 1 });
    });

    // PUT
    app.put('/api/user/:id', jsonParser, function (req, res) {
        var data = {
            id: req.params.id,
            body: req.body
        };
        res.end(JSON.stringify(data, null, 2));
    });

    // DELETE
    app.delete('/api/user/:id', function (req, res) {
        res.end(req.params.id);
    })
}