require('dotenv').config();
const express = require('express');
const massive = require('massive');
const bodyParser = require('body-parser');
const PORT = 3050;
const session = require('express-session');
const c = require('./controller')

const app = express();
app.use(bodyParser.json());
massive(process.env.CONNECTION_STRING).then(database => {
    app.set('db', database)
})
app.use(session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
  }));

app.get('/api/checkSession', c.checkSession);
app.post('/api/login', c.login);
app.post('/api/logout', c.logout);
app.post('/api/register', c.createUser);
app.delete('/api/deleteUser/:id', c.deleteUser);
app.get('/api/workspace/:id', c.getWorkspace);
app.post('/api/workspace/', c.createWorkspace);
app.get('/api/dashboard/', c.getAllWorkspacesForUser);
app.delete('/api/workspace/:id', c.deleteWorkspace);
app.post('/api/issue', c.createIssue)
app.get('/api/issues/:id', c.getIssues)

app.listen(PORT, () => console.log('Server is listening on Port ' + PORT))