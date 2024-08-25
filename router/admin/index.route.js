const taskRoute = require('./task.route.js');

module.exports = ((app) => {
    app.use('/task', taskRoute);
})