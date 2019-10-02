
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//----------------------------------------------------
const movie_schema = new Schema({
    name: String,
    classify: String,
    score: Number,
    actor: String,
    country: String,
    img: String,
});
exports.Hotplay = mongoose.model("hotplay", movie_schema);
//----------------------------------------------------
const Movie_detail = new Schema({
    id: Object,
    name: String,
    actors_name: Array,
    actors_role: Array,
    filmcategory: String,
    film_detail: String,
    filmnationruntime: String,
    filmpremieretime: String,
    grade: Number,
    imgs: Array,
    item: String
});
exports.Moviedetail = mongoose.model("hotplaydetails", Movie_detail);
//----------------------------------------------------
const movie_comingsoon = new Schema({
    name: String,
    classify: String,
    score: Number,
    actor: String,
    Release_data: String,
    img: String,
});
exports.Comingsoon = mongoose.model("comingsoon", movie_comingsoon);
//---------//----------------------------------------
const movie_schema1 = new Schema({
    genres: Array,
    rating: Object,
    title: String,
    casts: Array,
    directors: Array,
    images: Object,
    year: String,
    id: String
});
exports.Movie = mongoose.model("movie", movie_schema1);
//------------------------------------------------
const users_schema = new Schema({
    username: String,
    nickname: String,
    mobile: String,
    password: String,
    dbpwd: String
});
exports.User = mongoose.model("user", users_schema);
//--------------------------------------------------
const position_schema = new Schema({
    storename: String,
    position: String,
    price: String,
    type: String,
});
exports.Position = mongoose.model("position", position_schema);
//--------------------------------------------------