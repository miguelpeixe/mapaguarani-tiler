var Tenures = require('./tenures.js');
var _ = require('underscore');

module.exports = {
  getCartoCSS: function(table) {

    var tenures = Tenures.getTenures();
    var status = Tenures.getStatus();

    var cartocss = '#' + table + ' { polygon-fill: #000; line-width: 1; line-opacity: 0.7; polygon-opacity: 0.7; } ';

    _.each(tenures, function(tenure) {
      if(tenure.map_color) {
        cartocss += '#' + table + '[land_tenure_id=' + tenure.id + '] { polygon-fill: ' + tenure.map_color + '; } ';
      }
    });

    _.each(status, function(stat) {
      if(stat.map_color) {
        cartocss += '#' + table + '[land_tenure_status_id=' + stat.id + '] { line-color: ' + stat.map_color + '; } ';
      }
    });

    return cartocss;
  }
}
