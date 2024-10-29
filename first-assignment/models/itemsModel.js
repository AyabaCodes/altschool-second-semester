let items = require("../db/items");
const { writeDataToFile } = require("../utils");

function findAll() {
  return new Promise((resolve, reject) => {
    resolve(items);
  });
}

function findById(id) {
  return new Promise((resolve, reject) => {
    console.log(items);
    let passedId = parseInt(id);
    const item = items.find((p) => p.id === passedId);
    resolve(item);
  });
}

function create(parsedItem) {
  return new Promise((resolve, reject) => {
    //get ID of last item in the JSON database
    console.log(parsedItem);
    const lastItem = items[items.length - 1];
    const lastItemId = parseInt(lastItem.id);
    console.log(
      `inside the create function the id of lastitemid is ${lastItemId} with type: ${typeof lastItemId}`
    );
    parsedItem.id = lastItemId + 1;
    console.log(parsedItem);

    items.push(parsedItem);
    writeDataToFile("./db/items.json", items);
    resolve(parsedItem);
  });
}

function update(id, itemData) {
  return new Promise((resolve, reject) => {
    passedId = parseInt(id);
    const index = items.findIndex((p) => p.id === passedId);
    // items[index] = { id: passedId, ...itemData };

    //update the database
    items[index] = { ...items[index], ...itemData };

    //save to the database
    writeDataToFile("./db/items.json", items);
    resolve(items[index]);
  });
}

function remove(id) {
  return new Promise((resolve, reject) => {
    passedId = parseInt(id);
    items = items.filter((p) => p.id !== passedId);
    writeDataToFile("./db/items.json", items);
    resolve();
  });
}

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove,
};
