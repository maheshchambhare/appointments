const express = require("express");
const https = require("https");
const fs = require("fs");
const path = require("path");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const hostname = "appointify.dev";
const port = 3000;
const application = next({ dev, hostname, port });

const handle = application.getRequestHandler();

const certificate = {
  key: fs.readFileSync(path.resolve("./appointify.dev-key.pem")),
  cert: fs.readFileSync(path.resolve("./appointify.dev.pem")),
};

const app = express();

application.prepare().then(() => {
  app.get("*", function (req:any, res:any) {
    return handle(req, res);
  });

  const server = https.createServer(certificate, app);

  server.listen(3000, () => {
    console.log(`HTTPS server is UP! https://${hostname}:${port}`);
  });
});
