const express = require("express");
const app = express();
const helmet = require("helmet")
const cors = require("cors")
const morgan = require("morgan")

app.use(morgan("tiny"));
app.use(cors());
app.use(helmet());


app.use("/", (req, res)=>{
    return res.send("Working");
})


module.exports = app;