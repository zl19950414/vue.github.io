
const mongoose = require("mongoose");
mongoose.connect(
    `mongodb://0.0.0.0:27017/wh1906fuzhi`,
    {
        useUnifiedTopology: true,
        useNewUrlParser: true
    });

const connection = mongoose.connection;

connection.once("connect", () => {
    console.log("数据库链接成功");
});

module.exports = connection;