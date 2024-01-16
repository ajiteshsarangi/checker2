const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3001; // You can choose any port you like

app.use(bodyParser.json());
const cdpFolderPath = "./cdp";
const cdhFolderPath = "./cdh";
app.post("/api/getMissingData", (req, res) => {
  // Assuming cdpData and cdhData are available
  const cdpData = readAndStoreFiles(cdpFolderPath, "cdp");
  const cdhData = readAndStoreFiles(cdhFolderPath, "cdh");

  // Assuming checkValues returns an object with notPresent and isMissing
  const cdpResult = checkValues(global[cdpData.dataVariables[0]], global[cdhData.dataVariables[0]]);
  const cdhResult = checkValues(global[cdhData.dataVariables[0]], global[cdpData.dataVariables[0]]);

  const responseData = {
    cdpNotPresent: cdpResult.notPresent,
    cdhNotPresent: cdhResult.notPresent,
    isMissingCdp: cdpResult.isMissing,
    isMissingCdh: cdhResult.isMissing,
  };

  res.json(responseData);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
