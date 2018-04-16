const bcrypt = require('bcrypt');
const saltRounds = 12;

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
        const dbInstance = req.app.get('db');
        bcrypt.hash( password, saltRounds).then( hashedPassword => {
            dbInstance.createUser([username, email, imageUrl, hashedPassword]).then( data => {
                console.log('Created User')
                res.status(200).send(data);
            })
        })
    },
    logout: (req, res) => {
        req.session.destroy();
        res.status(200).send('Session ended');
    }
}