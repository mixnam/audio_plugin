var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var util = require('util');
var js_to_js = require('js-to-js');
require('dotenv').config();

app.engine('js', js_to_js);
app.locals.pretty = true;
require('./routes')(app, {});



io.on('connection', function (socket) {
    socket.on('chat message', function (msg) {
        console.log('message - ' + msg);
        io.emit('chat message', msg);
    });

    socket.on('new record', function (record) {
        console.log('new record - ', record);
        var info = JSON.parse(record.info);
        var blob = record.blob;

        console.log(info);
    })
});


http.listen(process.env.PORT, function(){
    console.log(util.format('listening on *:%s', process.env.PORT));
});