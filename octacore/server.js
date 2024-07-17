const express = require('express');
const app = express();
const port = 3000;

let tasks = [];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/tasks', (req, res) => {
    res.json(tasks);
});

app.post('/tasks', (req, res) => {
    const task = req.body;
    task.id = Date.now().toString();
    task.completed = false;
    tasks.push(task);
    res.status(201).json(task);
});

app.put('/tasks/:id', (req, res) => {
    const id = req.params.id;
    const newText = req.body.text;
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.text = newText;
        res.json(task);
    } else {
        res.status(404).json({ message: 'Task not found' });
    }
});

app.delete('/tasks/:id', (req, res) => {
    const id = req.params.id;
    tasks = tasks.filter(t => t.id !== id);
    res.sendStatus(204);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
