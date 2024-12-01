const express = require('express');
const session = require('express-session');
const cors = require('cors');

// Import all routes
const loginRoute = require('./routes/login');
const logoutRoute = require('./routes/logout');
const getAllPostsRoute = require('./routes/get_all_posts');
const createPostRoute = require('./routes/create_post');
const likePostRoute = require('./routes/like_unlike_post');
const unlikePostRoute = require('./routes/like_unlike_post');
const sharePostRoute = require('./routes/share_post');
const unsharePostRoute = require('./routes/unshare_post');
const getSharedPostsRoute = require('./routes/get_shared_posts');

const app = express();




// Middleware setup

app.use(express.json());
app.use(session({
    secret: process.env.SESSION_SECRET || 'your-secret-key',
    resave: false,
    saveUninitialized: false
}));

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:3001');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

// Mount routes
app.use('/api/auth', loginRoute);      // POST /api/auth/login
app.use('/api/auth', logoutRoute);     // POST /api/auth/logout




app.use('/api/posts', getAllPostsRoute);    // GET /api/posts
app.use('/api/posts', createPostRoute);     // POST /api/posts
app.use('/api/posts', likePostRoute);       // POST /api/posts/:postId/like
app.use('/api/posts', unlikePostRoute);     // DELETE /api/posts/:postId/like
app.use('/api/posts', sharePostRoute);      // POST /api/posts/:postId/share
app.use('/api/posts', getSharedPostsRoute); // GET /api/posts/shared-with-me

app.use('/api/shares', unsharePostRoute);   // DELETE /api/shares/:shareId

module.exports = app;