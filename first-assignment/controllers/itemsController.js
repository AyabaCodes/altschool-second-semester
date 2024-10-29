const Item = require("../models/itemsModel");
const { getPostData } = require("../utils");

// @desc Gets All items
// @route GET /api/items
async function getAllItems(req, res) {
  try {
    const items = await Item.findAll();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(items));
  } catch (error) {
    console.log(error);
  }
}

// @desc Create a single item
// @route POST /api/items
async function addItem(req, res) {
  try {
    const body = await getPostData(req);

    const parsedItem = JSON.parse(body);
    console.log(parsedItem);

    const newItem = await Item.create(parsedItem);
    res.writeHead(201, { "Content-Type": "application/json" });

    return res.end(JSON.stringify(newItem));
  } catch (error) {
    console.log(error);
  }
}

// @desc Gets a single item
// @route GET /api/items/:id
async function getItem(req, res, id) {
  try {
    const item = await Item.findById(id);
    if (!item) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Item Not Found" }));
    } else {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(item));
    }
  } catch (error) {
    console.log(error);
  }
}

// @desc Update an Item
// @route PUT /api/items/:id
async function updateItem(req, res, id) {
  try {
    const item = await Item.findById(id);
    if (!item) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Item Not Found" }));
    } else {
      const body = await getPostData(req);

      const { name, price, size } = JSON.parse(body);
      const itemData = {
        name: name || item.name,
        price: price || item.price,
        size: size || item.size,
      };
      const updatedItem = await Item.update(id, itemData);
      res.writeHead(200, { "Content-Type": "application/json" });

      return res.end(JSON.stringify(updatedItem));
    }
  } catch (error) {
    console.log(error);
  }
}

// @desc delete a single product
// @route DELETE /api/product/:id
async function deleteItem(req, res, id) {
  try {
    const item = await Item.findById(id);
    if (!item) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Item Not Found" }));
    } else {
      await Item.remove(id);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({ message: `Item with id ${id} has been removed` })
      );
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getAllItems,
  addItem,
  getItem,
  updateItem,
  deleteItem,
};
