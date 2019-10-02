
const express = require("express");
const port = 1906;
const hostname = "0.0.0.0";
const http = require("http");
const app = express();
const server = http.createServer(app);
require("./utils/db");
const cors = require("cors");
app.use(cors());   // cors 解决跨域问题  jsonp 代理  
app.use(express.json());     // from-data 
app.use(express.urlencoded({ extended: false }));   // x-www-form-urlencoded  获取 POST 请求 获取 参数数据
app.use(express.static("public"));
app.get("/demo", (req, res) => {
    res.send("这是一个 后台的接口 服1务器地址 " + req.query);
});

app.post("/index", (req, res) => {
    console.log(req.body);
    console.log(req.headers);
    res.send({
        status: 200
    })
});
const session = require("express-session");
app.use(session({
    secret: "test",
    name: "appTest",
    cookie: { maxAge: 60 * 60 * 1000 },  // session 记录数据的时长 
    resave: false,
    saveUninitialized: true
}))
const { checkToken } = require("./utils");
// app.use(checkToken)
const vue = require("./vue");
app.use("/vue", vue);
server.listen(port, hostname, () => {
    console.log(`我启动的服务是  http://${hostname}:${port}`)
})