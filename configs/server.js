const http = require('http');
const socketIO = require('socket.io');
const socketHandler = require('../handlers/socketHandler');

module.exports = function (app) {
    const server = http.createServer(app);
    const io = socketIO(server);
    socketHandler(io);

    return server;
};
