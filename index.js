const express = require('express');
const app = express();

// configs
const PORT = require('./configs/port');
require('./configs/express')(app);
const server = require('./configs/server')(app);

// routes
const authRoutes = require('./routes/authorization');
const loginRoutes = require('./routes/login');
const actionsRoutes = require('./routes/actions');
const homeRoutes = require('./routes/home');
const searchRoutes = require('./routes/search');
const chatRoutes = require('./routes/chat');

app.use(authRoutes);
app.use(loginRoutes);
app.use(actionsRoutes);
app.use(homeRoutes);
app.use(searchRoutes);
app.use(chatRoutes);

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});