const express = require("express");
const cors = require("cors");
const app = express();

const indexRouter = require("./routes/index")

var corOptions = {
    origin: "http://localhost:3000",
};

app.set("port", 3000);

app.use(cors(corOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

require("./models/index");

app.use("/", indexRouter);

module.exports = app;