const express = require("express");

const mongoose = require("mongoose");
const cors = require("cors");
const TodoModel = require("./models/todo");


const app = express();

app.use(cors());
app.use(express.json())

mongoose.connect("mongodb://localhost:27017/test");

app.post("/add", (req, res) => {
    const task = req.body.task;
    TodoModel.create({
        task: task
    }).then(result => res.json(result))
        .catch(err => res.json(err))
})

app.get("/get", (req, res) => {
    TodoModel.find()
        .then(result => res.json(result))
        .catch(err => res.json(err))
})

app.put("/update/:id", (req, res) => {
    const { id } = req.params;
    TodoModel.findByIdAndUpdate({ _id: id }, { done: true })
        .then(result => (res.json(result), console.log(result)))
        .catch(err => res.json(err))


})
app.delete("/delete/:id", (req, res) => {
    const { id } = req.params;
    TodoModel.findByIdAndDelete({ _id: id })
        .then(result => res.json(result))
        .catch(err => res.json(err))
})
app.put("/edit/", (req, res) => {
    const body = req.body
    const id = body.task._id
    const editTodo = body.editTodo
    

    TodoModel.findByIdAndUpdate({ _id: id }, { task: editTodo })
        .then(result => console.log(res.json(result)))
        .catch(error => res.json(error))


})

app.listen(3001, () => {
    console.log("Server is Running")
}) 