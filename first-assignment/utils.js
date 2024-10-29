const fs = require("fs");

function writeDataToFile(filename, content) {
  fs.writeFileSync(filename, JSON.stringify(content), "utf8", (err) => {
    if (err) {
      console.log(err);
    }
  });
}

function getPostData(req) {
  return new Promise((resolve, reject) => {
    try {
      const body = [];

      req.on("data", (chunk) => {
        body.push(chunk);
      });

      req.on("end", () => {
        const parsedBody = Buffer.concat(body).toString();
        resolve(parsedBody);
      });
    } catch (error) {
      reject(err);
    }
  });
}

module.exports = {
  writeDataToFile,
  getPostData,
};
