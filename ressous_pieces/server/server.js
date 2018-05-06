require('dotenv').config();
const express = require('express');
const massive = require('massive');
const bodyParser = require('body-parser');
const PORT = 3050;
const session = require('express-session');
const c = require('./controller');
const app = express();
const socket = require('socket.io');
const cors = require('cors');
const chat = require('./chatController');

// Middleware
app.use(bodyParser.json());
let db = null
massive(process.env.CONNECTION_STRING).then(database => {
    app.set('db', database)
    db = database
})
app.use(session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
  }));
app.use(cors())

let messagesWeb = [];
let connectionsWeb = 0;
let userWeb = [];
let messagesData = [];
let connectionsData = 0;
let userData = [];

  const io = socket(
    app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`)));

    // Socket Namespace for Web 
    const web = io.of('/web')
    web.on('connection', (socket) => {
        userWeb.push(socket.handshake.query.username);
        web.emit('SEND_USER', userWeb)
        connectionsWeb++;
        console.log('User connected', connectionsWeb);
        web.emit('RECEIVE_MESSAGE', messagesWeb);
  
        //Create and monitor Disconnect
        socket.on('disconnect', (req, res) => {
            connectionsWeb--;
            userWeb.splice(userWeb.indexOf(socket.handshake.query.username), 1);
            web.emit('SEND_USER', userWeb )
            if(connectionsWeb === 0){
                db.room_web_dev.insert(messagesWeb).then(data => {
                    console.log('Data Transportation', data)
                    if(data){
                        messagesWeb = []
                    }
                })
            }
        })

        socket.on('SET_USER', function(data){
            userWeb.push(data.username)
            console.log('webuser', userWeb)
            web.emit('RECEIVE_USER', userWeb)
        })
          
        socket.on('SEND_MESSAGE', function(data){
              console.log('Send Message Event', data)
                  messagesWeb.push(data)
                  web.emit('RECEIVE_MESSAGE', messagesWeb);
                  console.log('send Back to Web', messagesWeb)
        })
       /* socket.on('isTyping', name => {
              console.log(name)
              io.emit('currentTyper', name)
        })
        socket.on('stopTyping', name => {
              console.log('stop', name)
              io.emit('previousTyper', name)
        })*/
    });

// Socket Namespace for Data
    const d = io.of('/data')
        d.on('connection', (socket) => {
            connectionsData++;
            console.log('User connected Data', connectionsData);
            d.emit('RECEIVE_MESSAGE', messagesData);
    
            //Create and monitor Disconnect
            socket.on('disconnect', (req, res) => {
                connectionsData--;
                console.log('User disconnected Data', connectionsData);
                if(connectionsData === 0){
                    db.room_web_dev.insert(messagesData).then(data => {
                        console.log('Data Transportation', data)
                        if(data){
                            messagesData = []
                        }
                    })
                }
                })

            socket.on('SET_USER', function(data){
                console.log(data)
                userData.push(data.username)
                d.emit('RECEIVE_USER', userData)
            })

            socket.on('REMOVE_USER', function(data){
                userData.splice(userData.indexOf(data.username), 1)
                console.log('removed',userData)
            })
            
            socket.on('SEND_MESSAGE', function(data){
                console.log('Send Message Event', data)
                    messagesData.push(data)
                    d.emit('RECEIVE_MESSAGE', messagesData);
                    console.log('send Back to Web', messagesData)
            })
        })


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
app.get('/api/stats/:id', c.getStatsforWorkspace);

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
app.post('/api/issue/:id', c.updateEditorInput);
app.get('/api/ressents/:username', c.getRessents)

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

// Chat
app.get('/api/chatroom/:id', chat.getMessages)

app.use( express.static( `${__dirname}/../build` ) );


const path = require('path')
app.get('*', (req, res)=>{
    res.sendFile(path.join(__dirname, '../build/index.html')); 
})
