const taskRoute = require('./task.route.js');
const userRoute = require('./user.route.js');
const authenMiddlewares = require('../middlewares/authen.middlewares.js')
module.exports = ((app) => {
    app.use('/task', authenMiddlewares, taskRoute);
    app.use('/user', userRoute);
})