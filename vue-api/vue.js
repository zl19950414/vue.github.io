// 
// 
// 
const express = require("express");
const router = express.Router();
const { Hotplay, User, Comingsoon, Movie, Moviedetail, Position } = require("./utils/schema");
const Mock = require("mockjs");
const { keys, aesEncrypt } = require("./utils");
const multer = require("multer");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/avatar");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "wh" + file.originalname);
    }
})
const upload = multer({ storage }).any();
router.post("/uploadAvatar", upload, (req, res) => {
    console.log(req.files);
    var pic = req.files[0].path;
    res.json({
        msg: "头像上传成功",
        code: 200,
        pic,
    })
})
router.get("/search", (req, res) => {
    const {
        search
    } = req.query;
    var keyword = eval(`/${search}/`);
    Position.find({ $or: [{ storename: keyword }, { position: keyword }, { price: keyword }, { type: keyword }] }).then(result => {
        res.json({
            code: 200,
            msg: "信息筛选成功",
            result
        })
    })
})
router.get("/position", (req, res) => {
    const {
        id
    } = req.query;
    if (id !== "全城") {
        Position.find({ type: id }).then(result => {
            res.json({
                code: 200,
                msg: "信息筛选成功",
                result
            })
        })
    } else if (id === "全城") {
        Position.find({}).then(result => {
            res.json({
                code: 200,
                msg: "信息获取成功",
                result
            })
        })
    } else {
        Position.find({}).then(result => {
            res.json({
                code: 200,
                msg: "信息获取成功",
                result
            })
        })
    }
})
router.get("/movie_hotplay", (req, res) => {
    const {
        limit
    } = req.query;
    Hotplay.find({}, {}).limit(parseInt(limit)).sort({ _id: -1 }).then(result => {
        res.json({
            code: 200,
            msg: "正在热映电影获取成功",
            result
        })
    })
})
router.get("/movie_detail", (req, res) => {
    const {
        id
    } = req.query;
    console.log("1111111111111" + id + typeof (id));
    Moviedetail.find({ id: id }).then(result => {
        res.json({
            code: 200,
            msg: "正在热映电影获取成功",
            result
        })
    })
})
router.get("/movie_comingsoon", (req, res) => {
    const {
        limit
    } = req.query;
    Comingsoon.find({}, {}).limit(parseInt(limit)).sort({ _id: -1 }).then(result => {
        res.json({
            code: 200,
            msg: "即将上映电影获取成功",
            result
        })
    })
})
router.get("/movie", (req, res) => {
    const {
        limit
    } = req.query;
    Movie.find({}, {}).limit(parseInt(limit)).sort({ _id: -1 }).then(result => {
        res.json({
            code: 200,
            msg: "获取电影数据成功",
            result
        })
    })
})

const Random = Mock.Random;
router.get("/mock/data", (req, res) => {
    var list = [];
    for (var i = 0; i < 200; i++) {
        let obj = {
            uid: Random.id(),
            title: Random.csentence(5, 28),
            city: Random.city(),
            names: Random.cname(),
            pic: Random.image('200x100', '#02adea', 'wuhan1906'),
            time: Random.date('yyyy-MM-dd') + " " + Random.time()
        }
        list.push(obj)
    }
    res.json({
        code: 200,
        msg: '获取mock数据成功',
        result: list
    })
})
router.post('/nickname', (req, res) => {
    User.updateOne({ username: req.body.username }, {
        $set: { nickname: req.body.nickname }
    }).then(result => {
        res.json({
            code: 200,
            msg: "昵称更新成功",
        })
    })
})
router.post("/register", (req, res) => {
    const body = req.body;
    console.log(req.body);
    User.findOne({
        $or: [
            {
                username: body.username,
            },
            {
                mobile: body.mobile
            }
        ]
    }, {}).then(result => {
        console.log(result)
        if (result) {
            res.json({
                code: 200,
                msg: "注册失败,用户名或者手机号已经存在",
                type: 0
            })
        } else {
            User.insertMany(body).then(result => {
                res.json({
                    code: 200,
                    msg: "注册成功...",
                    type: 1
                })
            })
        }
    })
})

router.post("/login", (req, res) => {
    const body = req.body;
    console.log(body);
    User.findOne({
        $or: [
            {
                username: body.keys,
            },
            {
                mobile: body.keys,
            }
        ]
    }, {}).then(result => {
        console.log(result);
        if (result) {
            if (result.password == body.password) {
                const token = aesEncrypt(result.username, keys);
                req.session.token = token;
                res.json({
                    code: 200,
                    msg: "登录成功",
                    token,
                    type: 1,
                    result
                })
            } else {
                res.json({
                    code: 200,
                    msg: "密码错误",
                    type: 0
                })
            }
        } else {
            res.json({
                code: 200,
                msg: "用户名或者手机号不存在",
                type: 0
            })
        }
    })

})

module.exports = router;