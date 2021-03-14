const controller = require("../controllers/file.controller");

module.exports = function (app) {
  app.post("/api/upload", controller.upload);
  app.get("/api/files", controller.getListFiles);
  app.get("/api/files/:name", controller.download);
};
