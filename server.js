
const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const PORT = 5000;
const db = require("./Model")
const connectDB=()=>require('./db');
connectDB();
app.use(bodyParser.json())
app.get("/",(req,res)=>{
res.json("Todo deleted");
})

app.get("/api/todos", async (req, res, next) => {
  try {
    const todos = await db.Todo.find({})
    res.json(todos);
}
  catch (err) {
    next({ status: 400, message: "failed to get todos" })
  }
})

app.post("/api/todo", async (req, res, next) => {
  try {
    const todo = await db.Todo.insertOne(req.body);
    res.json(todo);
  } catch (err) {
    next({ status: 400, message: "failed to create todo" })
    console.log(err);
  }
})

app.put("/api/todo/{todoId} ", async (req, res, next) => {
  try {
    const todo = await db.Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
    res.json(todo);
  } catch (err) {
    next({ status: 400, message: "failed to update todo" })
  }
})
app.delete("/api/todo/{todoId}/delete", async (req, res, next) => {
  try {
    await db.Todo.findByIdAndRemove(req.params.id)
    res.json("Todo deleted");
  } catch (err) {
    next({ status: 400, message: "failed to delete todo" })
  }
})
app.post("/api/todo/{todoId}/done",(req,res)=>{
    try{
        db
        .updateOne(
            { _id: req.params.id },
            { $set: { status:"done" } },);
    }
    catch (err) {
        next({ status: 400, message: "failed to update todo" })
      }
})



app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})