const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");

// Define the input and output file paths
const inputFile = path.join(__dirname, "input.csv");
const outputFile = path.join(__dirname, "sorted_output.csv");

// Manually define the column headers
const headers = [
  "Filename",
  "Timestamp",
  "GT_Lat",
  "GT_Lon",
  "Pred_Lat",
  "Pred_Lon",
  "ClassName",
  "Confidence",
  "Distance_km",
];

// Function to parse the timestamp and return a Date object
const parseTimestamp = (timestamp) => {
  try {
    const [datePart] = timestamp.split(",");
    return new Date(Date.parse(datePart.replace(/-/g, " ")));
  } catch (error) {
    console.warn(`Invalid timestamp format: "${timestamp}"`);
    return null; // Return null if parsing fails
  }
};

// Read, process, and sort the CSV file
const processCSV = async () => {
  const rows = [];

  // Read the CSV file
  fs.createReadStream(inputFile)
    .pipe(
      csv({
        separator: ",",
        headers: headers,
        skipLines: 1, // Skip the first row if it is malformed or redundant
      })
    )
    .on("data", (row) => {
      if (row["Timestamp"]) {
        const parsedDate = parseTimestamp(row["Timestamp"]);
        if (parsedDate) {
          row._parsedDate = parsedDate; // Add parsed date to the row for sorting
          rows.push(row);
        } else {
          console.warn(`Skipping row with unparseable Timestamp:`, row);
        }
      } else {
        console.warn("Skipping row with missing Timestamp:", row);
      }
    })
    .on("end", () => {
      if (rows.length === 0) {
        console.error("No valid rows to process. Exiting.");
        return;
      }

      // Sort the rows based on the parsed date
      rows.sort((a, b) => a._parsedDate - b._parsedDate);

      // Write the sorted rows back to a new CSV file
      const outputData = [
        headers.join(","), // Write headers as the first row
        ...rows.map((row) =>
          headers.map((header) => row[header] || "").join(",")
        ),
      ].join("\n");

      fs.writeFileSync(outputFile, outputData);

      console.log(
        `CSV file has been sorted by the 'Timestamp' column and saved to '${outputFile}'.`
      );
    })
    .on("error", (err) => {
      console.error("Error reading CSV:", err);
    });
};

processCSV().catch((err) => console.error("Error processing CSV:", err));
