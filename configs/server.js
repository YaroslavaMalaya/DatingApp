const http = require('http');
const socketIO = require('socket.io');
const socketConfig = require('./socket');

module.exports = function (app) {
    const server = http.createServer(app);
    const io = socketIO(server);
    socketConfig(io);

    return server;
};
