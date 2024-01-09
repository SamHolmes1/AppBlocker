(
    function() {
        "use strict";
        let express = require('express');
        let ourApp = express();
        ourApp.get('/', function(req, res) {
           res.sendFile(`${__dirname}/redirect.html`);
        });
        let server = ourApp.listen(3000, function () {
            console.log('Express server listening on port ' + server.address().port);
        });
        module.exports = {ourApp}
    }()
);

