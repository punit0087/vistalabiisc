// debugCompileExcelSheetsToCsv.js
const XLSX = require("xlsx");
const fs = require("fs");
const { Parser: Json2CsvParser } = require("json2csv");

// Adjust as needed:
const excelFilePath = "./cycloneData.xlsm";
const outputCsvPath = "./public/data/combined.csv";

function cleanValue(val) {
  // Also handle single "-"
  if (typeof val === "string") {
    const trimmed = val.trim();
    if (trimmed === "--" || trimmed === "-") {
      return "";
    }
    // If there are weird non-ASCII spaces
    // return trimmed.replace(/\u00A0/g, "");
    return trimmed;
  }
  return val;
}

/**
 * Convert numeric Excel date to "DD/M/YYYY", or parse "DD/MM/YYYY"/"DD-MM-YYYY".
 */
function formatDateCell(cellValue) {
  const XLSX_SSF = require("xlsx").SSF;

  if (typeof cellValue === "number") {
    const parsed = XLSX_SSF.parse_date_code(cellValue);
    if (parsed) {
      return `${parsed.d}/${parsed.m}/${parsed.y}`;
    }
  }
  if (typeof cellValue === "string") {
    const trimmedVal = cellValue.trim();

    let parts = trimmedVal.split("/");
    if (parts.length === 3) {
      const [dd, mm, yyyy] = parts.map((p) => parseInt(p, 10));
      if (!isNaN(dd) && !isNaN(mm) && !isNaN(yyyy)) {
        return `${dd}/${mm}/${yyyy}`;
      }
    }
    parts = trimmedVal.split("-");
    if (parts.length === 3) {
      const [dd, mm, yyyy] = parts.map((p) => parseInt(p, 10));
      if (!isNaN(dd) && !isNaN(mm) && !isNaN(yyyy)) {
        return `${dd}/${mm}/${yyyy}`;
      }
    }
    return trimmedVal; // fallback
  }

  return "";
}

// Main function (debug version)
function compileExcelSheetsToCsv(excelFilePath, outputCsvPath) {
  const workbook = XLSX.readFile(excelFilePath);
  const combinedRows = [];

  let newSerialNumberCounter = 0;
  let lastRawSerialNumber = undefined;

  // For debug: keep track of how many rows we skip or keep
  let processedCount = 0;
  let skippedNoDate = 0;
  let skippedPre2000 = 0;
  let keptCount = 0;

  workbook.SheetNames.forEach((sheetName) => {
    console.log(`\n=== SHEET: ${sheetName} ===`);
    const worksheet = workbook.Sheets[sheetName];
    const sheetData = XLSX.utils.sheet_to_json(worksheet, {
      defval: null,
      raw: true,
    });

    let lastKnownDate = null; // fill-down date

    for (const row of sheetData) {
      // Construct an object of interest just for debug
      const debugInfo = {};

      // 1) Extract raw date columns
      let dateRaw =
        cleanValue(row["Date(DD/MM/YYYY)"]) ||
        cleanValue(row["Date(DD-MM-YYYY)"]);
      // Fill-down
      if (!dateRaw) {
        dateRaw = lastKnownDate;
      } else {
        lastKnownDate = dateRaw;
      }

      debugInfo["RowDateRaw"] = dateRaw || "(empty)";
      debugInfo["RowBasin"] = row["Basin of origin"] || "";
      debugInfo["RowName"] = row["Name"] || "";
      debugInfo["RowTime"] = row["Time (UTC)"] || "";

      processedCount++;

      // If date is still blank => skip
      if (!dateRaw) {
        skippedNoDate++;
        console.log(
          `Skipping row #${processedCount} in sheet '${sheetName}' (no date). Raw:`,
          debugInfo
        );
        continue;
      }

      // Format date => "DD/M/YYYY"
      const finalDateStr = formatDateCell(dateRaw);
      debugInfo["FinalDateStr"] = finalDateStr || "(empty)";

      if (!finalDateStr) {
        // means we couldn't parse anything meaningful
        skippedNoDate++;
        console.log(
          `Skipping row #${processedCount} in sheet '${sheetName}' (invalid date parse). Raw:`,
          debugInfo
        );
        continue;
      }

      // Extract the year
      const [ddStr, mmStr, yyyyStr] = finalDateStr.split("/");
      const yearNum = parseInt(yyyyStr, 10);
      debugInfo["YearParsed"] = yearNum || "(NaN?)";

      // Skip if year < 2000
      if (yearNum < 2000) {
        skippedPre2000++;
        console.log(
          `Skipping row #${processedCount} (year < 2000):`,
          debugInfo
        );
        continue;
      }

      // Now handle serial number
      const rawSerialVal = cleanValue(
        row["Serial Number of system during year"]
      );
      const serialStr = String(rawSerialVal ?? "").trim();
      debugInfo["SerialRaw"] = serialStr || "(empty)";

      if (serialStr !== "" && serialStr !== lastRawSerialNumber) {
        newSerialNumberCounter++;
        lastRawSerialNumber = serialStr;
      }

      // Time
      const timeRaw = cleanValue(row["Time (UTC)"]) || "";
      const timeStr = String(timeRaw).trim();

      // Parse numeric columns
      const toNumber = (val) => {
        const n = parseFloat(val);
        return isNaN(n) ? 0 : n;
      };

      const latVal =
        cleanValue(row["Latitude (lat)"]) ||
        cleanValue(row["Latitude (lat.)"]) ||
        0;
      const longVal =
        cleanValue(row["longitude  (Long)"]) ||
        cleanValue(row["Longitude (lon.)"]) ||
        0;
      const ciVal = cleanValue(row['CI No [or "T. No"]']) || "";
      const ecpVal =
        cleanValue(row['Estimated Central Pressure (hPa) [or "E.C.P"]']) || "";
      const windVal =
        cleanValue(row["Maximum Sustained Surface Wind (kt)"]) || "";
      const dropVal =
        cleanValue(row['Pressure Drop (hPa)[or "delta P"]']) || "";
      const gradeVal = cleanValue(row["Grade (text)"]) || "";

      // Build final object
      const finalRow = {
        serialnumberofsystemduringyear: String(newSerialNumberCounter),
        basinoforigin: String(debugInfo["RowBasin"]).trim(),
        name: String(debugInfo["RowName"]).trim(),
        "date-dd-mm-yyyy": finalDateStr,
        "time-utc": timeStr,
        "latitude-lat": toNumber(latVal),
        "longitude-long": toNumber(longVal),
        cinoorornot: toNumber(ciVal),
        estimatedcentralpressurehpaorecp: toNumber(ecpVal),
        "maximumsustainedsurfacewind-kt": toNumber(windVal),
        pressuredrophpaorealdelta: toNumber(dropVal),
        "grade-text": String(gradeVal).trim(),
      };

      combinedRows.push(finalRow);
      keptCount++;
      // Log the row we kept
      console.log(`Kept row #${processedCount}:`, debugInfo);
    }
  });

  // Summaries
  console.log("\n=== Debug Summary ===");
  console.log("Total processed rows:", processedCount);
  console.log("Skipped (no date or invalid date parse):", skippedNoDate);
  console.log("Skipped (year < 2000):", skippedPre2000);
  console.log("Kept rows:", keptCount, "\n");

  // Convert to CSV
  const fields = [
    "serialnumberofsystemduringyear",
    "basinoforigin",
    "name",
    "date-dd-mm-yyyy",
    "time-utc",
    "latitude-lat",
    "longitude-long",
    "cinoorornot",
    "estimatedcentralpressurehpaorecp",
    "maximumsustainedsurfacewind-kt",
    "pressuredrophpaorealdelta",
    "grade-text",
  ];
  const parser = new Json2CsvParser({ fields });
  const csvData = parser.parse(combinedRows);

  fs.writeFileSync(outputCsvPath, csvData, "utf8");
  console.log(`Final CSV generated at: ${outputCsvPath}`);
}

if (require.main === module) {
  compileExcelSheetsToCsv(excelFilePath, outputCsvPath);
}
