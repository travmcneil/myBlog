//jshint esversion:6

const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const _ = require("lodash");

const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/myBlogDB', { useNewUrlParser: true });

const blogSchema = new mongoose.Schema ({
  title: {
    type: String,
    required: [true, "Must have a title"]
  },
  body: {
    type: String,
    required: [true, "Must have a body"]
  },
})

const Blog = mongoose.model("Blog", blogSchema);

const blog = new Blog({
  title: "Day 7",
  body: "This is my day 7 entry"
})

const userSchema = new mongoose.Schema ({
  id: {
    type: String,
    required: [true, "Must have a id"]
  },
  firstName: {
    type: String,
    required: [true, "Must have a first name"]
  },
  lastName: {
    type: String,
    required: [true, "Must have a last name"]
  },
  email: {
    type: String,
  },
})

const User = mongoose.model("User", userSchema);

const userName = new User({
  id: "myId",
  firstName: "Travis",
  lastName: "McNeil",
  email: "travmcneil@gmail.com"
})

// userName.save();

// blog.save();

// UPDATE EXAMPLE
// User.updateOne({ firstName: "Travis" }, { id: "a4084" }).then((data) => {
//   console.log("update complete");
// });



User.find().then((data) => {
  // console.log(data);
  data.forEach(function(d){
    console.log(d.firstName + " " + d.lastName + " " + d.id);
  });
 });


const homeStartingContent =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet fermentum sapien. Nulla facilisi. Etiam quis eros vitae magna placerat pellentesque. Proin posuere ullamcorper lectus eget maximus. Nam ultrices pulvinar justo. Sed velit magna, pharetra rutrum ex sed, convallis pretium felis. Mauris maximus urna id suscipit ullamcorper. Quisque quis lectus arcu. Sed accumsan euismod nisi id scelerisque. Curabitur ut vestibulum erat, quis sollicitudin justo. Cras tempor, velit id aliquam scelerisque, erat lacus tempus odio, vel iaculis felis ex ut quam. Maecenas ultrices ullamcorper metus, non aliquet felis ultricies sed. Ut volutpat turpis vel diam pulvinar, quis pretium est interdum. Aliquam eget ultricies quam. Nulla eu bibendum turpis.";

const aboutContent =
  "Aliquam semper risus eget hendrerit commodo. Nunc eu tincidunt velit. Nam lobortis ex et interdum auctor. Ut viverra, dui et congue mollis, magna sapien ultrices turpis, ut fermentum mauris lacus et risus. Curabitur rutrum iaculis risus, nec hendrerit tellus pellentesque id. Duis scelerisque orci a magna imperdiet dignissim. Proin volutpat vulputate libero id accumsan. Maecenas venenatis est vel augue vulputate maximus vehicula in magna. Nulla at tortor vitae orci feugiat fermentum. Cras ac nunc elit. Maecenas laoreet accumsan dolor vitae varius.";

const contactContent =
  "Duis vitae facilisis eros. Donec non ante hendrerit, eleifend nisi sed, porttitor ipsum. Nulla iaculis interdum velit. Donec lobortis ultrices nibh eu tincidunt. Pellentesque egestas consectetur magna eu hendrerit. Curabitur ac metus congue, vulputate velit a, rutrum nibh. Nunc justo metus, fringilla in consectetur sed, vestibulum vel orci. Vestibulum facilisis mi elit. Nullam sed nisi purus. Curabitur vel odio urna. Fusce sit amet nibh bibendum, tincidunt risus non, fermentum nunc. Nulla consequat diam sit amet consectetur accumsan. Sed nec ante hendrerit, tempus ligula vel, viverra quam. Sed turpis metus, semper id magna vel, dictum consectetur neque.";

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(
  bodyParser.urlencoded({
    // to support URL-encoded bodies
    extended: true,
  })
);

let posts = [];

app.get("/", (req, res) => {
  res.render("home", {
    homeStartingContent: homeStartingContent,
    posts: posts,
  });
});

app.get("/about", (req, res) => {
  res.render("about", { aboutContent: aboutContent });
});

app.get("/contact", (req, res) => {
  res.render("contact", { contactContent: contactContent });
});

app.get("/compose", (req, res) => {
  res.render("compose");
});

app.post("/compose", (req, res) => {
  const postObject = {
    title: req.body.postTitle,
    body: req.body.postBody,
  };

  posts.push(postObject);
  res.redirect("/");
});

app.get("/post/:postid", (req, res) => {
  id = req.params.postid;
  post = posts[id];
  console.log(post);
  res.render("post", { post: post });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
