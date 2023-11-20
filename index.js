const express = require("express");
const app = express();
const mongoose = require("mongoose");
const TodoTask = require("./models/Page");

const dotenv = require('dotenv');
dotenv.config();

app.use("/static", express.static("public"));
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to db!");
    app.listen(3000, () => console.log("Server Up and running"));
  })
  .catch((error) => {
    console.error("Error connecting to database:", error);
  });

app.set("view engine", "ejs");





app.get("/", async (req, res) => {
  try {
    const tasks = await TodoTask.find({});
    res.render("firstpage.ejs", { todoTasks: tasks });
  } catch (err) {
    console.error("Error fetching tasks:", err);
    res.status(500).send("Internal Server Error");
  }
});






app.post('/',async (req, res) => {
  console.log(req.body);
  const todoTask = new TodoTask({
  title: req.body.title,
  content: req.body.content
  });
  try {
  await todoTask.save();
  res.redirect("/");
  } catch (err) {
  res.redirect("/");
  }
  });






app.route("/edit/:id")
  .get(async (req, res) => {
    const id = req.params.id;
    try {
      const tasks = await TodoTask.find({});
      res.render("secondpage.ejs", { todoTasks: tasks, idTask: id });
    } catch (err) {
      console.error("Error fetching tasks:", err);
      res.status(500).send("Internal Server Error");
    }
  })
  .post(async (req, res) => {
    const id = req.params.id;
    try {
      await TodoTask.findByIdAndUpdate(id, { title: req.body.title, content: req.body.content });
      res.redirect("/");
    } catch (err) {
      console.error("Error updating task:", err);
      res.status(500).send("Internal Server Error");
    }
  });





app.route("/remove/:id").get(async (req, res) => {
  const id = req.params.id;
  try {
    await TodoTask.findByIdAndDelete(id);
    res.redirect("/");
  } catch (err) {
    console.error("Error removing task:", err);
    res.status(500).send("Internal Server Error");
  }
});







app.route("/edit/:id")
  .get(async (req, res) => {
    const id = req.params.id;
    try {
      const tasks = await TodoTask.find({});
      res.render("todoEdit.ejs", { todoTasks: tasks, idTask: id });
    } catch (err) {
      console.error("Error fetching tasks:", err);
      res.status(500).send("Internal Server Error");
    }
  })
  .post(async (req, res) => {
    const id = req.params.id;
    try {
      await TodoTask.findByIdAndUpdate(id, { content: req.body.content });
      res.redirect("/");
    } catch (err) {
      console.error("Error updating task:", err);
      res.status(500).send("Internal Server Error");
    }
  });






app.route("/remove/:id").get(async (req, res) => {
  const id = req.params.id;
  try {
    await TodoTask.findByIdAndDelete(id);
    res.redirect("/");
  } catch (err) {
    console.error("Error removing task:", err);
    res.status(500).send("Internal Server Error");
  }
});


