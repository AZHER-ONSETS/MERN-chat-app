const express = require('express')
const socketio = require('socket.io')
const http = require('http')
const router = require('./router')
const { addUser, removeUser, getUser, getUserInRoom } = require('./users')

const PORT = process.env.PORT || 5000

const app = express()
const server = http.createServer(app)
const io = require('socket.io')(server, {
    cors: {
        origin: '*',
    }
});

io.on('connection', (socket) => {
    console.log('we have a new connection')

    socket.on('join', ({ name, room }, callback) => {
        const { error, user } = addUser({ id: socket.id, name, room })
        if (error) { callback(error) }

        socket.emit('message', { user: 'admin', text: `${user.name} welcome to the room ${user.room}` })
        socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined` })



        socket.join(user.room)

    })

    socket.on('disconnect', () => {
        console.log('user had left')
    })
})

app.use(router)

server.listen(PORT, () => console.log('Server has started'))