var request = require('request');
var config = require('../config.js');

var tenures = [];
var status = [];

var update = function() {
  // Tenures
  request(config.land_tenures_api, function(err, res, body) {
    tenures = JSON.parse(body);
  });
  // Tenures status
  request(config.land_tenures_status_api, function(err, res, body) {
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
