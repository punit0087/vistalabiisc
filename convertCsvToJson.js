const fs = require("fs");
const path = require("path");
const csv = require("csvtojson");

const csvFilePath = path.join(
  __dirname,
  "public",
  "data",
  "cyclonic_events.csv"
);
const jsonFilePath = path.join(
  __dirname,
  "public",
  "data",
  "cyclonic_events.json"
);

csv()
  .fromFile(csvFilePath)
  .then((jsonObj) => {
    fs.writeFileSync(jsonFilePath, JSON.stringify(jsonObj, null, 2));
    console.log("CSV file successfully converted to JSON");
  })
  .catch((err) => {
    console.error("Error converting CSV to JSON:", err);
  });
