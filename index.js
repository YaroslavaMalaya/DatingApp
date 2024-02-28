const express = require('express');
const session = require('express-session');
const http = require('http');
const socketIO = require('socket.io');

const { mongoose, upload } = require('./mongooseConnection');
const PORT = require('./configs/port');
const SECRET_KEY = require('./configs/secret-key');
const authRoutes = require('./routes/authorization');
const uploadRoutes = require('./routes/uploadInfo');
const uploadMoreRoutes = require('./routes/uploadmoreinfo');
const loginRoutes = require('./routes/login');
const likeDislikeRoutes = require('./routes/likeDislike');
const interestsArray = require('./public/scripts/allinterests');
const allchatsRoutes = require('./routes/allChats');
const removeChatRoutes = require('./routes/removeMatched');
const User = require("./models/user");
const Message = require('./models/message');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: 'auto',
        httpOnly: true,
        maxAge: 10800000 // 3 hours
    }
}));

app.use(express.json());
app.use(authRoutes);
app.use(uploadRoutes);
app.use(uploadMoreRoutes);
app.use(loginRoutes);
app.use(likeDislikeRoutes);
app.use(allchatsRoutes);
app.use(removeChatRoutes);

app.set('view engine', 'pug');
app.set('views', './views');
app.use(express.static('public'));

const server = http.createServer(app);
const io = socketIO(server);

io.on('connection', (socket) => {
    socket.on('joinRoom', async ({ username, targetUsername }) => {
        const room = [username, targetUsername].sort().join('_');
        socket.join(room);
        // console.log("User in the room.")

        try {
            const messages = await Message.find({ room }).sort('createdAt');
            socket.emit('previousMessages', messages);
        } catch (err) {
            console.error('Error retrieving messages:', err);
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
            console.error('Error saving message:', err);
        }
    });

});

app.get(['/', '/home'], (req, res) => {
    res.render('home', { title: 'Home Page' });
});

app.get('/register', (req, res) => {
    res.render('register', { title: 'Register | Yama', query: req.query });
});

app.get('/login', (req, res) => {
    res.render('login', { title: 'Login | Yama', query: req.query || {} });
});

app.get('/register/upload', (req, res) => {
    res.render('register2', { title: 'Register - Upload Photos | Yama', interests: interestsArray, userId: req.query.userId, query: req.query});
});

app.get('/register/upload/moreinfo', (req, res) => {
    res.render('register3', { title: 'Register - More Info | Yama', query: req.query, userId: req.query.userId});
});

app.get('/search', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.userId);
        const allUsersQ = await User.find();
        const allUsers = Array.isArray(allUsersQ) ? allUsersQ : [allUsersQ];
        const filteredUsers = allUsers.filter(user => !currentUser.dontdisplay.includes(user._id));

        res.render('search', { users: filteredUsers, currentUserId: req.session.userId, username: currentUser.username});
    } catch (error) {
        console.error('Error retrieving users:', error);
        res.status(500).send('An error occurred while fetching users.');
    }
});

app.get('/:username/chat/:targetUsername', (req, res) => {
    res.render('chat', {
        username: req.params.username,
        targetUsername: req.params.targetUsername
    });
});

// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});