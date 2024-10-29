const http = require("http");
const path = require("path");
const fs = require("fs");

const HOST_NAME = "localhost";
const PORT = 4000;

function requestHandler(req, res) {
  res.setHeader("Content-Type", "text/html");

  let path = "./views/";
  switch (req.url) {
    case "/":
      path += "index.html";
      res.statusCode = 200;

      break;
    case "/index.html":
      path += "index.html";
      res.statusCode = 200;
      break;
    default:
      path += "404.html";
      res.statusCode = 404;
      break;
  }

  //send an HTML file
  fs.readFile(path, (err, data) => {
    if (err) {
      console.log(err);
      res.end();
    } else {
      // res.write(data)
      res.end(data);
    }
  });
}

const server = http.createServer(requestHandler);

server.listen(PORT, HOST_NAME, () => {
  console.log(`Server is ruuning at http://${HOST_NAME}:${PORT}`);
});
