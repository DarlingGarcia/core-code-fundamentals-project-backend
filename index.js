const express = require("express")
const morgan = require("morgan")
const app = express()
const db = require("./db/tasks")
const cors = require('cors');

// to avoid CORS errors when integrating with the Front end
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'DELETE', 'PATCH']
}));

// allows to get the requests body
app.use(express.json())

app.post("/tasks", async (req, res) => {
    const results = await db.createTask(req.body)
    res.status(201).json()
})

app.get("/tasks", async (req, res) => {
    const tasks = await db.getAllTasks()
    res.status(200).json({ tasks })
})

app.patch("/tasks/:id", async (req, res) => {
    const id = await db.updateTask(req.params.id, req.body)
    res.status(204).json()
})

app.delete("/tasks/:id", async (req, res) => {
    const id = await db.deleteTask(req.params.id)
    res.status(204).json()
})

app.listen(4000, () => {
})