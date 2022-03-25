const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000;

const connectToDB = require("./configs/db");

const userRoutes = require("./routes/user");
const tokenResetRoutes = require("./routes/tokenReset");

// configs
require("dotenv").config();

// connect to db
connectToDB();

// middlewares
app.use(cors());
app.use(express.json());

// routes
app.use("/api/user", userRoutes);
app.use("/api/auth", tokenResetRoutes);

// error handler
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).send({
    message: err.message,
  });
});

app.listen(PORT, () => {
  console.log("server is up and listening on port:", PORT);
});
