const bcrypt = require('bcrypt');
const saltRounds = 12;
const cloudinary = require('cloudinary');

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
    checkSession: (req, res) => {
        if(req.session.user){
            res.status(200).send(req.session.user)
        } else {
            res.status(403).send('No Session found');
        }
    },
    createUser: (req, res) => {
        const { username, email, imageUrl, password } = req.body;
        console.log(imageUrl);
        const dbInstance = req.app.get('db');
        bcrypt.hash( password, saltRounds).then( hashedPassword => {
            dbInstance.createUser([username, email, imageUrl, hashedPassword]).then( data => {
                console.log('Created User')
                res.status(200).send('registered');
            })
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
        req.app.get('db').createPractice([req.body.title, req.body.link,req.body.origin, req.body.issue_id, req.body.workspace_id, req.session.user.user_id]).then(data => {
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
    }
}