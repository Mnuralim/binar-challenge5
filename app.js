const express = require("express");
const morgan = require("morgan");
const swaggerUI = require("swagger-ui-express");
const swaggerDocument = require("./docs/swagger.json");
const cors = require("cors");

const CarRouter = require("./routes/car");
const UserRouter = require("./routes/user");
const authRouter = require("./routes/auth");
const errorHandler = require("./controllers/errorHandler");
const ApiError = require("./utils/apiError");
const ActivityRouter = require("./routes/activity");

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

app.use("/api/v1/cars", CarRouter);
app.use("/api/v1/users", UserRouter);
app.use("/api/v1/auths", authRouter);
app.use("/api/v1/activities", ActivityRouter);

app.use("/api-docs", swaggerUI.serve);
app.use("/api-docs", swaggerUI.setup(swaggerDocument));

app.all("*", (req, res, next) => {
  next(new ApiError(`Routes does not exist`, 404));
});

app.use(errorHandler);

module.exports = app;
