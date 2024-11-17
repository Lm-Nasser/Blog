const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;
app.set("view engine", "ejs");
app.use(express.static('Public'));
app.use(bodyParser.urlencoded({extended: true}));
// ---------------------------------------------------------------------
// ----------------- VARIABLES ---------------
let blogPosts = [];

// -------------------------------------------

app.get("/about-us", function (req, res) {
    res.render("about")
});

app.get("/contact-us", function (req, res) {
    res.render("contact")
});
app.get("/admin", function (req, res) {
    res.render("admin")
});
/* app.get(newRoute, function (req, res) {
    res.render("posts", { xTitles : newRoute, xPosts : newXPosts });
}) */


app.post("/", function (req, res) {
    const pages = req.body.page;
    console.log(pages);
    if (pages === "about-us") {
        res.redirect("/about-us");
    } else if (pages === "contact-us") {
        res.redirect("/contact-us");
    } else {
        res.redirect("/");
    } 
});

app.post("/admin", function (req, res) {
    let bpt = req.body.title;
    let bpb = req.body.post;
    const newPost = {
        ttitle : bpt,
        ppost : bpb,
        rm : " ...Read More"
    };
    blogPosts.push(newPost);
    res.redirect("/");
    // console.log();
});
app.get("/", function (req, res) {
    res.render("index", { posts : blogPosts }); 
});

app.post("/posts", function (req, res) {
    const postIndex = req.body.postIndex;
    const selectedPost = blogPosts[postIndex];
    res.render("posts", {xTitles: selectedPost.ttitle, xPosts: selectedPost.ppost} );
})




/* app.post("/", function (req, res) {
    let titleAdmin = req.body.Title;
    let postAdmin = req.body.Post;
    res.render("index", {titleIndex: titleAdmin, postIndex: postAdmin})
}); */

// ---------------------------------------------------------------------
app.listen(port, function (req, res) {
    console.log(`this app is using prot ${port}, http://localhost:${port}/`)
});