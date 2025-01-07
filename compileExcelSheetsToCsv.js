// compileExcelSheetsToCsv.js
const XLSX = require("xlsx");
const fs = require("fs");
const { Parser: Json2CsvParser } = require("json2csv");

// Adjust as needed:
const excelFilePath = "./cycloneData.xlsm";
const outputCsvPath = "./public/data/combined.csv";

function cleanValue(val) {
  if (typeof val === "string") {
    const trimmed = val.trim();
    // Convert "--" or "-" to empty
    if (trimmed === "--" || trimmed === "-") {
      return "";
    }
    return trimmed;
  }
  return val;
}

/**
 * Convert numeric Excel date to "DD/M/YYYY",
 * or parse "DD/MM/YYYY" / "DD-MM-YYYY" => "DD/M/YYYY".
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
    return trimmedVal;
  }
  return "";
}

function compileExcelSheetsToCsv(excelFilePath, outputCsvPath) {
  const workbook = XLSX.readFile(excelFilePath);
  const combinedRows = [];

  // Serial number tracking
  let newSerialNumberCounter = 0;
  let lastRawSerialNumber = undefined;

  // Summary counters
  let processedCount = 0; // total rows processed
  let skippedNoDate = 0; // skipped due to missing/invalid date
  let skippedPre2000 = 0; // skipped due to year < 2000
  let keptCount = 0; // rows successfully kept

  workbook.SheetNames.forEach((sheetName) => {
    const worksheet = workbook.Sheets[sheetName];
    const sheetData = XLSX.utils.sheet_to_json(worksheet, {
      defval: null,
      raw: true,
    });

    // Fill-down date
    let lastKnownDate = null;

    for (const row of sheetData) {
      processedCount++;

      // 1) Fill-down date
      let dateRaw =
        cleanValue(row["Date(DD/MM/YYYY)"]) ||
        cleanValue(row["Date(DD-MM-YYYY)"]);
      if (!dateRaw) dateRaw = lastKnownDate;
      else lastKnownDate = dateRaw;

      // 2) If still no date, skip
      if (!dateRaw) {
        skippedNoDate++;
        continue;
      }

      // 3) Format date => "DD/M/YYYY"
      const finalDateStr = formatDateCell(dateRaw);
      if (!finalDateStr) {
        skippedNoDate++;
        continue;
      }

      // 4) Extract year; skip if < 2000
      const [ddStr, mmStr, yyyyStr] = finalDateStr.split("/");
      const yearNum = parseInt(yyyyStr, 10);
      if (yearNum < 2000) {
        skippedPre2000++;
        continue;
      }

      // 5) Serial number logic
      const rawSerialVal = cleanValue(
        row["Serial Number of system during year"]
      );
      const serialStr = String(rawSerialVal ?? "").trim();
      if (serialStr !== "" && serialStr !== lastRawSerialNumber) {
        newSerialNumberCounter++;
        lastRawSerialNumber = serialStr;
      }

      // 6) Extract basic fields
      const timeRaw = cleanValue(row["Time (UTC)"]) || "";
      const timeStr = String(timeRaw).trim();
      const toNumber = (val) => (isNaN(parseFloat(val)) ? 0 : parseFloat(val));

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

      // 7) Convert lat/long
      const latNum = toNumber(latVal);
      const longNum = toNumber(longVal);

      // 8) Basin & Name
      const basinRaw = cleanValue(row["Basin of origin"] || "");
      const nameRaw = cleanValue(row["Name"] || "");

      // If no name, auto-generate "basin-year"
      let finalName = nameRaw;
      if (!finalName) {
        finalName = `${basinRaw}-${yearNum}`;
      }

      // 9) Build final row w/ extra columns
      const finalRow = {
        serialnumberofsystemduringyear: String(newSerialNumberCounter),
        basinoforigin: String(basinRaw).trim(),
        name: String(finalName).trim(),
        "date-dd-mm-yyyy": finalDateStr,
        "time-utc": timeStr,
        "latitude-lat": latNum,
        "longitude-long": longNum,
        cinoorornot: toNumber(ciVal),
        estimatedcentralpressurehpaorecp: toNumber(ecpVal),
        "maximumsustainedsurfacewind-kt": toNumber(windVal),
        pressuredrophpaorealdelta: toNumber(dropVal),
        "grade-text": String(gradeVal).trim(),
        "latitude-lat-plus": latNum + 0.2,
        "longitude-long-plus": longNum + 0.2,
      };

      combinedRows.push(finalRow);
      keptCount++;
    }
  });

  // Log final results only
  console.log(`Total processed rows: ${processedCount}`);
  console.log(`Skipped (missing/invalid date): ${skippedNoDate}`);
  console.log(`Skipped (year < 2000): ${skippedPre2000}`);
  console.log(`Kept rows: ${keptCount}`);

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
    "latitude-lat-plus",
    "longitude-long-plus",
  ];
  const parser = new Json2CsvParser({ fields });
  const csvData = parser.parse(combinedRows);

  fs.writeFileSync(outputCsvPath, csvData, "utf8");
}

// If run via `node compileExcelSheetsToCsv.js`:
if (require.main === module) {
  compileExcelSheetsToCsv(excelFilePath, outputCsvPath);
}
