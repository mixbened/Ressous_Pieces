require('dotenv').config();
const express = require('express');
const massive = require('massive');
const bodyParser = require('body-parser');
const PORT = 3050;
const session = require('express-session');
const c = require('./controller');
const app = express();

// Middleware
app.use(bodyParser.json());
massive(process.env.CONNECTION_STRING).then(database => {
    app.set('db', database)
})
app.use(session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
  }));


// App Endpoints

// Auth 
app.post('/api/register', c.createUser);
app.post('/api/login', c.login);
app.post('/api/logout', c.logout);
app.get('/api/checkSession', c.checkSession);
app.delete('/api/deleteUser/:id', c.deleteUser);
app.get('/api/upload', c.imageUpload);
app.post('/api/fblogin', c.fblogin);

// Workspace
app.post('/api/workspace/', c.createWorkspace);
app.get('/api/workspace/:id', c.getWorkspace);
app.get('/api/dashboard/', c.getAllWorkspacesForUser);
app.delete('/api/workspace/:id', c.deleteWorkspace);
app.put('/api/issues/:id/:check/:wid', c.checkIssue);
app.get('/api/workspaces/', c.getWorkspaceStats);
app.get('/api/allWorkspaces/', c.getAllWorkspaces);

// Articles - Workspaces
app.post('/api/articles/:id', c.getArticles);
app.post('/api/article', c.createArticle);
app.delete('/api/article/:aid/:wid', c.deleteArticle);

// Projects - Workspace
app.get('/api/projects/:id', c.getProjects);
app.post('/api/project/', c.createProject);
app.delete('/api/project/:pid/:wid', c.deleteProject),

// Issue
app.post('/api/issue', c.createIssue);
app.get('/api/issues/:id', c.getIssues);
app.get('/api/issue/:id', c.getIssue);
app.delete('/api/issue/:iid/:wid', c.deleteIssue);
app.get('/api/issues', c.getAllIssues);
app.post('/api/issue/:id', c.updateEditorInput)

// Practices - Issue
app.get('/api/practices/:id', c.getPractices);
app.post('/api/practices/', c.createPractice);
app.delete('/api/practices/:pid/:iid', c.deletePractice);

// Article - Issue
app.delete('/api/articleis/:aid/:iid', c.deleteArticleIssue)
app.post('/api/articleis', c.createArticleIssue)
app.get('/api/articles/:id', c.getArticlesIssue)

// Profile 
app.get('/api/user/:id', c.getUserData);
app.get('/api/issuesUser/:id', c.getIssuesUser);
app.get('/api/workspacesUser/:id', c.getWorkspacesUser);
app.post('/api/forkSpace/:id', c.forkSpace);
app.post('/api/forkIssue/:iid/:wid', c.forkIssue);

app.use( express.static( `${__dirname}/../build` ) );
app.listen(PORT, () => console.log('Server is listening on Port ' + PORT))


const path = require('path')
app.get('*', (req, res)=>{
    res.sendFile(path.join(__dirname, '../build/index.html')); 
})