const express = require("express");
const app = express();
const helmet = require("helmet")
const cors = require("cors")
const morgan = require("morgan")

//Routes
const RegisterRouter = require("../routes/RegisterRouter/RegisterRouter")
const LoginRouter = require("../routes/LoginRouter/LoginRouter");

app.use(morgan("tiny"));
app.use(cors());
app.use(helmet());

app.use("/api", RegisterRouter);
app.use("/api", LoginRouter);

app.use("/", (req, res)=>{
    return res.send("Working");
})


module.exports = app;