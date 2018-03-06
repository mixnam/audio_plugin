var app = require('express')();
var http = require('http').Server(app);

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index2.html');
});

http.listen(2000, function () {
    console.log('listening : *2000');
});