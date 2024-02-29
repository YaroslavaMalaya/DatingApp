const Message = require('../models/message');
const logger = require('../middleware/logging');

module.exports = function (io) {
    io.on('connection', (socket) => {
        socket.on('joinRoom', async ({ username, targetUsername }) => {
            const room = [username, targetUsername].sort().join('_');
            socket.join(room);
            // console.log("User in the room.")

            try {
                const messages = await Message.find({ room }).sort('createdAt');
                socket.emit('previousMessages', messages);
            } catch (err) {
                logger.error('Error retrieving messages', { error: err.toString(), room });
            }
        });

        socket.on('chatMessage', async ({ room, msg, username }) => {
            const message = new Message({
                room: room,
                username: username,
                text: msg
            });
            try {
                const savedMessage = await message.save();

                io.to(room).emit('message', savedMessage);
            } catch (err) {
                logger.error('Error saving message', { error: err.toString(), room, username, message: msg });
            }
        });

    });
};
