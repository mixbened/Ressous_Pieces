const bcrypt = require('bcrypt');
const saltRounds = 12;
const cloudinary = require('cloudinary');
const origin = require('./helper');
const reducer = require('./reducer');

module.exports = {
    login: (req, res) => {
        const { username, password } = req.body;
        const dbInstance = req.app.get('db');
        dbInstance.findUser(username).then( data => {
            if(data.length){
                bcrypt.compare(password, data[0].password).then(match =>{
                    if(match){
                        console.log('logged in')
                        req.session.user = data[0];
                        res.redirect(200, 'http://localhost:3000/dashboard')
                    } else {
                        res.status(200).send('Wrong Password')
                    }
                })
            } else {
                res.send("Couldnt find User")
            }
        })
    },
    fblogin: (req, res) => {
        req.app.get('db').findFBUser(req.body.fb_id).then(data => {
            if(data.length) {
                req.session.user = data[0];
                res.redirect(200, 'http://localhost:3000/dashboard')
            } else {
                req.app.get('db').createFBUser(req.body.name, req.body.fb_id, req.body.imageUrl).then(data => {
                req.session.user = data[0];
                res.redirect(200, 'http://localhost:3000/dashboard')
                })
            }
        })
    },
    checkSession: (req, res) => {
        if(req.session.user){
            res.status(200).send(req.session.user)
        } else {
            res.status(200).send('No Session found');
        }
    },
    createUser: (req, res) => {
        const { username, email, imageUrl, password } = req.body;
        console.log(imageUrl);
        const dbInstance = req.app.get('db');
        dbInstance.findUser(username).then(data => {
            console.log(data)
            if(data[0]){
                console.log('existing')
                res.status(200).send('This User already exists!')
            } else {
                console.log('not existing')
                bcrypt.hash( password, saltRounds).then( hashedPassword => {
                    dbInstance.createUser([username, email, imageUrl, hashedPassword]).then( data => {
                        console.log('Created User')
                        res.status(200).send('registered');
                    })
                })
            }
        })
    },
    logout: (req, res) => {
        req.session.destroy();
        res.status(200).send('Session ended');
    },
    deleteUser: (req, res) => {
        req.app.get('db').deleteUser(req.params.id).then(data => {
            res.status(200).send('deleted User')
        })
    },
    getWorkspace: (req, res) => {
        req.app.get('db').getWorkspace(req.params.id).then(data => {
            res.status(200).send(data)
        })
    },
    createWorkspace: (req,res) => {
        req.app.get('db').createWorkspace([req.body.title, req.body.descr, req.session.user.user_id]).then(data => {
            console.log(data)
            res.status(200).send(data)
        })
    },
    deleteWorkspace: (req, res) => {
        req.app.get('db').deleteWorkspace(req.params.id).then( data => {
            res.status(200).send(data)
        })
    },
    getAllWorkspacesForUser: (req, res) => {
        req.app.get('db').getAllWorkspaces(req.session.user.user_id).then(data => {
            res.status(200).send(data);
        })
    },
    createIssue: (req, res) => {
        req.app.get('db').createIssue([req.body.title, req.body.description, req.body.workspace_id, req.session.user.user_id]).then(data => {
            res.status(200).send(data)
        })
    },
    getIssues: (req, res) => {
        req.app.get('db').getIssues(req.params.id).then(data => {
            res.status(200).send(data)
        })
    },
    getIssue: (req, res) => {
        req.app.get('db').getIssue(req.params.id).then(data => {
            res.status(200).send(data)
        })
    },
    deleteIssue: (req, res) => {
        req.app.get('db').deleteIssue([req.params.iid, req.params.wid]).then(data => {
            res.status(200).send(data)
        })
    },
    createPractice: (req, res) => {
        req.app.get('db').createPractice([req.body.title, req.body.link,origin(req.body.link), req.body.issue_id, req.body.workspace_id, req.session.user.user_id]).then(data => {
            res.status(200).send(data)
        })
    },
    getPractices: (req, res) => {
        req.app.get('db').getPractices(req.params.id).then(data => {
            res.status(200).send(data)
        })
    },
    deletePractice: (req, res) => {
        req.app.get('db').deletePractice([req.params.pid, req.params.iid]).then(data => {
            res.status(200).send(data)
        })
    },
    imageUpload: (req, res) => {
        const timestamp = Math.round((new Date()).getTime() / 1000);
        const api_secret = process.env.CLOUDINARY_API_SECRET;
        const signature = cloudinary.utils.api_sign_request({ timestamp: timestamp }, api_secret);
        const payload = {
            signature: signature,
            timestamp: timestamp
        };
        res.json(payload);
    },
    createArticle: (req, res) => {
            req.app.get('db').createArticle([req.body.title, req.body.link, origin(req.body.link), req.body.workspace_id,req.body.issue_id, req.session.user.user_id]).then(data => {
                res.status(200).send(data)
            })
    },
    createArticleIssue: (req, res) => {
        req.app.get('db').createArticleIssue([req.body.title , req.body.link , origin(req.body.link) , req.body.issue_id, req.session.user.user_id]).then(data => {
            res.status(200).send(data)
        })
    },
    deleteArticle: (req, res) => {
        req.app.get('db').deleteArticle([req.params.aid, req.params.wid]).then(data => {
            res.status(200).send(data)
        })
    },
    getArticles: (req, res) => {
        req.app.get('db').getArticles([req.body.type, req.params.id]).then(data => {
            res.status(200).send(data)
        })
    },
    getProjects: (req, res) => {
        req.app.get('db').getProjects(req.params.id).then(data => {
            res.status(200).send(data)
        })
    },
    createProject: (req, res) => {
        req.app.get('db').createProject([req.body.title, req.body.link, origin(req.body.link), req.body.workspace_id, req.session.user.user_id]).then( data => {
            res.status(200).send(data);
        })
    },
    deleteProject: (req, res) => {
        req.app.get('db').deleteProject([req.params.pid, req.params.wid]).then( data => {
            res.status(200).send(data)
        })
    },
    deleteArticleIssue: (req, res) => {
        req.app.get('db').deleteArticleIssue([req.params.aid, req.params.iid]).then( data => {
            res.status(200).send(data)
        })
    },
    checkIssue: (req, res) => {
        req.app.get('db').checkIssue([req.params.id, req.params.check, req.params.wid]).then((data) => {
            console.log(data)
            res.status(200).send(data);
        })
    },
    getAllIssues: (req, res) => {
        req.app.get('db').getAllIssues().then(data => {
            res.status(200).send(data)
        })
    },
    getWorkspaceStats: (req, res) => {
        req.app.get('db').getWorkspaceStats(req.session.user.user_id).then(data => {
            let newArr = data.map(el => {
            return {
                workspace_id: el.workspace_id,
                suc: (parseInt(el.true, 10)/parseInt(el.total, 10) || 0 ),
                total: parseInt(el.total, 10 || 0),
                true: (parseInt(el.true, 10) || 0)
            }
        })
            req.session.user.stats = reducer.total(newArr);
            res.status(200).send(reducer.total(newArr))
        })
    },
    getUserData: (req, res) => {
        req.app.get('db').findUser(req.params.id).then( data => {
            res.status(200).send(data)
        })
    },
    getIssuesUser: (req, res) => {
        req.app.get('db').getIssuesUser(req.params.id).then(data => {
            console.log('DB Data', data)
            res.status(200).send(data)
        })
    },
    getWorkspacesUser: (req, res) => {
        req.app.get('db').getWorkspacesUser(req.params.id).then(data => {
            res.status(200).send(data)
        })
    },
    forkSpace: (req, res) => {
        req.app.get('db').forkSpace([req.params.id, req.session.user.user_id]).then(data => {
            res.status(200).send('Success')
        })
    },
    forkIssue: (req, res) => {
        req.app.get('db').forkIssue([req.params.iid, req.params.wid, req.session.user.user_id]).then(data => {
            // console.log(data)
            res.status(200).send('Success')
        })
    },
    getArticlesIssue: (req, res) => {
        req.app.get('db').getArticlesIssue(req.params.id).then( data => {
            // console.log(data)
            res.status(200).send(data)
        })
    },
    updateEditorInput: (req, res) => {
        req.app.get('db').updateEditorInput([req.body.newInput, req.body.editormode, req.params.id]).then( data => {
            // console.log(data)
            res.status(200).send('Success')
        })
    },
    getAllWorkspaces: (req, res) => {
        req.app.get('db').getEveryWorkspace().then( data => {
            // console.log(data)
            res.status(200).send(data)
        })
    },
    getRessents: (req, res) => {
        req.app.get('db').getRessents(req.params.username).then(data => {
           // console.log(data)
            res.status(200).send(data)
        })
    },
    getStatsforWorkspace: (req, res) => {
        req.app.get('db').getStatsForWorkspace(req.params.id).then(data => {
           // console.log(data)
            res.status(200).send(reducer.count(data))
        })
    }
}