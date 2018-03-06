$(function () {

    var socket = io();

    $('form').submit(function () {
        socket.emit('chat message', $('#m').val());
        $('#m').val('');
        return false;
    });

    socket.on('chat message', function (msg) {
        $('#messages').append($('<li>').text(msg));
    });

});

var global_stream;


function successCallback(stream) {
    recorder = RecordRTC(stream, { type : 'audio'});
    recorder.startRecording();
    global_stream = stream;
}


function errorCallback(error) {
    console.log(error);
}


var mediaConstraints = { video: false, audio: true };


$(function () {
    var socket = io(pluginConfig.domain);
    $('#start_recording').click(function() {
        navigator.mediaDevices.getUserMedia(mediaConstraints).then(successCallback).catch(errorCallback);
    });

    $('#stop_recording').click(function(){
        recorder.stopRecording(function(audioURL){
            var obj = {
                blob_url : audioURL,
                domain : document.domain,
                date : new Date().toLocaleString()
            };
            var json = JSON.stringify(obj);
            var blob = recorder.getBlob();
            socket.emit("new record", { blob : blob , info : json});
            recorder.stopRecording();
            global_stream.stop();
        });
    });
});