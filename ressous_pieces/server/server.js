require('dotenv').config();
const express = require('express');
const massive = require('massive');
const bodyParser = require('body-parser');
const PORT = 3050;
const session = require('express-session');
const c = require('./controller');
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
app.use(express.static('public'));




app.get('/health-check', (req, res) => res.sendStatus(200));
app.get('/api/checkSession', c.checkSession);
app.post('/api/login', c.login);
app.post('/api/logout', c.logout);
app.post('/api/register', c.createUser);
app.delete('/api/deleteUser/:id', c.deleteUser);
app.get('/api/workspace/:id', c.getWorkspace);
app.post('/api/workspace/', c.createWorkspace);
app.get('/api/dashboard/', c.getAllWorkspacesForUser);
app.delete('/api/workspace/:id', c.deleteWorkspace);
app.post('/api/issue', c.createIssue);
app.get('/api/issues/:id', c.getIssues);
app.get('/api/issue/:id', c.getIssue);
app.delete('/api/issue/:iid/:wid', c.deleteIssue);
app.get('/api/practices/:id', c.getPractices);
app.post('/api/practices/', c.createPractice);
app.delete('/api/practices/:pid/:iid', c.deletePractice);
app.get('/api/upload', c.imageUpload);
app.post('/api/fblogin', c.fblogin)

app.listen(PORT, () => console.log('Server is listening on Port ' + PORT))