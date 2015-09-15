var request = require('request');

var tenures = [];
var status = [];

var update = function() {
  // Tenures
  request('http://localhost:8000/api/land_tenures', function(err, res, body) {
    tenures = JSON.parse(body);
  });
  // Tenures status
  request('http://localhost:8000/api/land_tenures_status/', function(err, res, body) {
    status = JSON.parse(body);
  });
}

setInterval(function() {
  update();
}, 1000 * 60);
update();

module.exports = {
  getTenures: function() {
    return tenures;
  },
  getStatus: function() {
    return status;
  }
}
