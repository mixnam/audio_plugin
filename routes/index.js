const plugin_routs = require('./plugin_routs');

module.exports = function (app, db) {

    app.get('/', function (req, res) {
        res.sendFile(process.cwd() + '/index.html');
    });

    plugin_routs(app, db);

};