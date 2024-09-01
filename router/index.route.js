const taskRoute = require('./task.route.js');
const userRoute = require('./user.route.js');
module.exports = ((app) => {
    app.use('/task', taskRoute);
    app.use('/user', userRoute);
})