

module.exports = {
    getMessages: (req, res) => {
        req.app.get('db').getMessagesForChatRoom(req.params.id).then(data => {
            res.status(200).send(data)
        }).catch(err => console.log(err))
    }
}