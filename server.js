const express = require('express');
const socket = require('socket.io');

const app = express();
const server = app.listen(8000, () => {
  console.log('Server is running on Port:', 8000)
});
const io = socket(server);
io.on('connection', (socket) => {
  socket.emit('updateData', tasks)
  socket.on('addTask', (task)=> {
    tasks.push(task)
    socket.broadcast.emit('addTask', task)
  })
  socket.on('removeTask', (taskId) => {
    const taskIndex = tasks.findIndex(t => t.id === taskId)
    tasks.splice(taskIndex, 1)
    socket.broadcast.emit('removeTask', taskId)
  })
});


const tasks = [];

app.use((req, res) => {
  res.status(404).send({ message: 'Not found...' });
});