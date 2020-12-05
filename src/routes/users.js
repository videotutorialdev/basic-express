const express =  require('express');
const { firstMiddleware, secondMiddleware } = require('../middleware');

const userRouter = express.Router();

const userList = require('../dummy/users.json');

const { NotFoundError } = require('../errors');
// Method Get / Get Request
userRouter.get('/', firstMiddleware(['USER', 'ADMIN']), (req, res) => {
    res.send({ user: userList });
})

// Method Get / Get Request By Query
userRouter.get('/requestTable', (req, res) => {
    const { page, perPage } = req.query;
    const newUserList = Array.from(userList).splice((+page - 1) * (+perPage), +perPage);
    res.send({ users: newUserList });
})

// Method Get / Get Request By Params
userRouter.get('/*', (req, res) => {
    const userParamMap = ['id', 'email', 'age'];
    const arrayParams = req.params['0'].split('/');
    const param = {};
    arrayParams.forEach((p, index) => {
        param[userParamMap[index]] = p;
    })
    const { id: userId } = param;
    const user = userList.filter(user => user.id === +userId)[0];
    if (!user) {
        throw new NotFoundError('User Not Found!');
    }
    res.send({ user });
});

// Method Post / Post Request
userRouter.post('/', firstMiddleware(['ADMIN']), secondMiddleware, (req, res) => {
    const payload = req.body;
    console.log(payload);
    // payload.id = userList[userList.length - 1].id + 1;
    userList.push(payload);
    res.status(201).send({ data: payload });
});

// Method Put / Put Request
userRouter.put('/', (req, res) => {
    const { id: userId } = req.params;
    const payload = req.body;
    const indexOfUser = userList.findIndex(user => user.id === +payload.id);
    if (indexOfUser === -1) {
        throw new NotFoundError('User Not Found!');
    }
    const oldUser = userList[indexOfUser];
    userList[indexOfUser] = { ...oldUser, ...payload };
    res.status(201).send({ data: userList[indexOfUser]});
})

// Method Delete / Delete Request
userRouter.delete('/:id', (req, res) => {
    const { id: userId } = req.params;
    const indexOfUser = userList.findIndex(user => user.id === +userId);
    if (indexOfUser === -1) {
        throw new NotFoundError('User Not Found!');
    };
    userList.splice(indexOfUser, 1);
    res.send({ message: 'User has been deleted!!!'});
})

module.exports = { userRouter };