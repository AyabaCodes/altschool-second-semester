const http = require("http");
const fs = require("fs");
const path = require("path");
const {
  getAllItems,
  addItem,
  getItem,
  updateItem,
  deleteItem,
} = require("./controllers/itemsController");

const itemsDbPath = path.join(__dirname, "db", "items.json");
let itemsDB = [];
const PORT = 5500;

const HOST_NAME = "localhost";

function requestHandler(req, res) {
  res.setHeader("Content-Type", "application/json");
  if (req.url === "/api/items" && req.method === "GET") {
    getAllItems(req, res);
  } else if (req.url === "/api/items" && req.method === "POST") {
    addItem(req, res);
  } else if (req.url.match(/\/api\/items\/([0-9]+)/) && req.method === "GET") {
    let id = req.url.split("/")[3];
    getItem(req, res, id);
  } else if (req.url.match(/\/api\/items\/([0-9]+)/) && req.method === "PUT") {
    let id = req.url.split("/")[3];
    updateItem(req, res, id);
  } else if (
    req.url.match(/\/api\/items\/([0-9]+)/) &&
    req.method === "DELETE"
  ) {
    let id = req.url.split("/")[3];
    deleteItem(req, res, id);
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        message: "Route Not Found",
      })
    );
  }
}

// create server
const server = http.createServer(requestHandler);
server.listen(PORT, HOST_NAME, () => {
  console.log(`Server is listening on ${HOST_NAME}:${PORT}`);
});
