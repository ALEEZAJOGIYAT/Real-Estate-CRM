const express = require("express");
const config = require("./config_files/db_config");
const morgan = require("morgan");
const app = express();

var authRouter = require("./components/auth/routes");
var tenantRouter = require("./components/tenant/routes");
var userRouter = require("./components/users/routes");
var buildingRouter = require("./components/buildings/routes.js");
var apartmentRouter = require("./components/apartments/routes.js");
var receiptRouter = require("./components/receipts/routes.js");
var maintenanceRouter = require("./components/maintenance/routes.js");
var realEstateRouter = require("./components/realEstate/routes.js");
var cors = require("cors");

app.use(morgan("dev"));
app.use(express.json());
app.use(cors());
// Define routes and middleware here
app.use("/tenant", tenantRouter);
app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/building", buildingRouter);
app.use("/apartment", apartmentRouter);
app.use("/receipt", receiptRouter);
app.use("/maintenance", maintenanceRouter);
app.use("/realEstate", realEstateRouter)

config.connectDatabase();
const port = 4000; // Set the port number you want to use

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
