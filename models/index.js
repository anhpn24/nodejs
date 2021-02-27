const dbConfig = require("../config/db.config.js");
const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.tutorials = require("./tutorial.model")(mongoose, mongoosePaginate);

db.user = require("./user.model")(mongoose);
db.role = require("./role.model")(mongoose);
db.ROLES = ["user", "admin", "moderator"];

db.initial = () => {
  const Role = db.role;
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });

      new Role({
        name: "moderator",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'moderator' to roles collection");
      });

      new Role({
        name: "admin",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  });
};

module.exports = db;
