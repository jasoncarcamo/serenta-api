const express = require("express");
const app = express();
const helmet = require("helmet")
const cors = require("cors")
const morgan = require("morgan")

//Routes
const RegisterRouter = require("../routes/RegisterRouter/RegisterRouter")
const LoginRouter = require("../routes/LoginRouter/LoginRouter");
const AdsRouter = require("../routes/AdsRouter/AdsRouter");
const UserRouter = require("../routes/UserRouter/UserRouter");

app.use(morgan("tiny"));
app.use(cors());
app.use(helmet());

app.use("/api", RegisterRouter);
app.use("/api", LoginRouter);
app.use("/api", AdsRouter);
app.use("/api", UserRouter);

app.use("/", (req, res)=>{
    return res.send("Working");
})


module.exports = app;