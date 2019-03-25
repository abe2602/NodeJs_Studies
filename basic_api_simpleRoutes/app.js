const express = require("express");
const app = express();

const indexRoutes = require("./routes/index.js");
const userRoutes = require("./routes/users.js");

app.use("/", indexRoutes);
app.use("/users", userRoutes);
app.listen(3000);

module.exports = app;