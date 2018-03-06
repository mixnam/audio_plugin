var util = require('util');

module.exports = function(app, db){
   app.get('/plugin_config.js', function(req, res){
       res.setHeader('content-type','application/javascript');
       res.render(process.cwd() + "/plugin_config.js", {
           domain : util.format('http://%s:%s',process.env.DOMAIN, process.env.PORT)
       });
   });

   app.get('/plugin.js', function(req, res){
       res.sendFile(process.cwd() + '/plugin.js');
   })

};