const fsPromises = require('fs').promises;


const getDataFromFile = (pathToFile) => {
  return fsPromises
    .readFile(pathToFile, { encoding: "utf8" })
    .then((data) => JSON.parse(data))
    .catch((err) => err)
}

module.exports = getDataFromFile;


