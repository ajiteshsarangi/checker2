const fs = require("fs");
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 3001; // You can choose any port you like

app.use(bodyParser.json());
app.use(cors());
// Function to read and store JSON files from a folder
function readAndStoreFiles(folderPath, prefix) {
  const files = fs.readdirSync(folderPath);
  const dataVariables = [];
  const dataArray = [];

  files.forEach((file, index) => {
    const filePath = path.join(folderPath, file);
    const jsonData = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    // Assuming the JSON structure you provided
    const variableName = `${prefix}${index + 1}`;
    global[variableName] = jsonData;
    dataVariables.push(variableName);
    dataArray.push(jsonData);
  });

  return { dataVariables, dataArray };
}

// Folder paths for "cdp" and "cdh"
const cdpFolderPath = "./cdp";
const cdhFolderPath = "./cdh";

// Read and store files for "cdp"
const cdpData = readAndStoreFiles(cdpFolderPath, "cdp");
const cdpFinal = cdpData.dataArray;

// Read and store files for "cdh"
const cdhData = readAndStoreFiles(cdhFolderPath, "cdh");
const cdhFinal = cdhData.dataArray;

// Display the variables created and final arrays
console.log("CDP Variables:", cdpData.dataVariables);
// console.log("CDP Final Array:", cdpFinal);

console.log("CDH Variables:", cdhData.dataVariables);
// console.log("CDH Final Array:", cdhFinal);

// ================================================================

function checkValues(cdpVar, cdhVar) {
  const notPresent = [];
  let isMissing = false;

  cdpVar.ResultSet.row_elements.row.forEach((cdpRow) => {
    const cdpValues = cdpRow.value;
    let found = false;

    cdhVar.ResultSet.row_elements.row.forEach((cdhRow) => {
      const cdhValues = cdhRow.value;

      // Check if cdp values are present in cdh
      if (cdpValues.every((cdpValue, index) => cdpValue === cdhValues[index])) {
        found = true;
      }
    });

    // If not found in cdh, add to the "NotPresent" array
    if (!found) {
      notPresent.push(cdpValues);
      isMissing = true;
    }
  });

  return { notPresent, isMissing };
}

// Example usage:
// Replace 'cdp1' and 'cdh1' with your actual variables
// const cdpNotPresent = checkValues(cdp1, cdh1);
// const cdhNotPresent = checkValues(cdh1, cdp1);

// Display the values not present in cdh
// console.log("Values not present in cdh:", cdpNotPresent);
// console.log("Values not present in cdp:", cdhNotPresent);

for (let index = 0; index < 2; index++) {
  const cdpNotPresent = checkValues(
    global[cdpData.dataVariables[index]],
    global[cdhData.dataVariables[index]]
  );
  const cdhNotPresent = checkValues(
    global[cdhData.dataVariables[index]],
    global[cdpData.dataVariables[index]]
  );
  //   console.log(flag);
  console.log(`Values not present in cdh:${index + 1}`, cdpNotPresent);
  console.log(`Values not present in cdp:${index + 1}`, cdhNotPresent);
}

// ================================================================

// function saveCdpFinalToJson(cdpFinal, filename) {
//   const filePath = `${filename}.json`;
//   const jsonData = JSON.stringify(cdpFinal, null, 2);

//   fs.writeFileSync(filePath, jsonData, "utf-8");

//   console.log(`CDP Final Array saved to ${filePath}`);
// }
// saveCdpFinalToJson(cdpFinal, "Final");

app.post("/api/getMissingData", (req, res) => {
  // Assuming cdpData and cdhData are available
  const cdpData = readAndStoreFiles(cdpFolderPath, "cdp");
  const cdhData = readAndStoreFiles(cdhFolderPath, "cdh");

  const responseData = [];

  // Iterate over cdp variables
  cdpData.dataVariables.forEach((cdpVarName, index) => {
    const cdhVarName = cdhData.dataVariables[index];

    const cdpVar = global[cdpVarName];
    const cdhVar = global[cdhVarName];

    // Assuming checkValues returns an object with notPresent and isMissing
    const cdpResult = checkValues(cdpVar, cdhVar);
    const cdhResult = checkValues(cdhVar, cdpVar);

    const resultObject = {
      [`${cdpVarName}_NotPresent`]: cdpResult.notPresent,
      [`${cdhVarName}_NotPresent`]: cdhResult.notPresent,
      [`${cdpVarName}_IsMissing`]: cdpResult.isMissing,
      [`${cdhVarName}_IsMissing`]: cdhResult.isMissing,
    };

    responseData.push(resultObject);
  });

  res.json(responseData);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
