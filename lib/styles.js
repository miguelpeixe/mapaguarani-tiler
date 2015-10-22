var Tenures = require('./tenures.js');
var _ = require('underscore');

module.exports = {
  getCartoCSS: function(table) {

    var tenures = Tenures.getTenures();
    var status = Tenures.getStatus();

    var cartocss = '';

    switch(table) {
      case 'core_indigenousland':

        cartocss = '#' + table + ' { polygon-fill: #000; line-width: 1; line-opacity: 0.7; polygon-opacity: 0.7; } ';

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

        break;

      case 'core_indigenousvillage':

        cartocss = '#' + table + ' { marker-width: 3; marker-fill: #ff5c00; marker-fill-opacity: 0.9; marker-line-color: #fff; marker-line-opacity: 1; marker-line-width: 0.2; marker-type: ellipse; marker-placement: point; marker-allow-overlap: true; } ';

        cartocss += '#' + table + '[zoom>=6] { marker-width: 3.5; } ';
        cartocss += '#' + table + '[zoom>=7] { marker-width: 4; } ';
        cartocss += '#' + table + '[zoom>=8] { marker-width: 4.5; } ';
        cartocss += '#' + table + '[zoom>=9] { marker-width: 5; } ';
        cartocss += '#' + table + '[zoom>=10] { marker-width: 5.5; } ';
        cartocss += '#' + table + '[zoom>=11] { marker-width: 6; } ';

        // cartocss = "#" + table + " { marker-width: 7.2; marker-fill: #5CA2D1; marker-opacity: 0.6; marker-line-width: 0; marker-allow-overlap: true; marker-comp-op: dst-atop; [src = 'smalls'] { marker-width: 16.8; } [src = 'mids'] { marker-width: 33.6; } [src = 'bigs'] { marker-width: 67.2; } [zoom>11] { marker-width: 48; } } ";
        //
        // cartocss += "#" + table + "::lables { text-size: 0; text-fill: black; text-opacity: 0.8; text-name: [points_count]; text-face-name: 'DejaVu Sans Book'; text-halo-fill: #fff; text-halo-radius: 0; [src = 'smalls'] { text-size: 48 * 0.2; text-halo-radius: 1; } [src = 'mids'] { text-size: 48 * 0.3; text-halo-radius: 1; } [src = 'bigs'] { text-size: 48 * 0.5; text-halo-radius: 1; } text-allow-overlap: true; [zoom>11] { text-size: 48 * 0.66; } } ";

        break;

      case 'core_archaeologicalplace':

        cartocss = '#' + table + ' { marker-width: 3; marker-fill: #7000ff; marker-fill-opacity: 0.9; marker-line-color: #fff; marker-line-opacity: 1; marker-line-width: 0.2; marker-type: ellipse; marker-placement: point; marker-allow-overlap: true; } ';

        cartocss += '#' + table + '[zoom>=6] { marker-width: 3.5; } ';
        cartocss += '#' + table + '[zoom>=7] { marker-width: 4; } ';
        cartocss += '#' + table + '[zoom>=8] { marker-width: 4.5; } ';
        cartocss += '#' + table + '[zoom>=9] { marker-width: 5; } ';
        cartocss += '#' + table + '[zoom>=10] { marker-width: 5.5; } ';
        cartocss += '#' + table + '[zoom>=11] { marker-width: 6; } ';

        // cartocss = "#" + table + " { marker-width: 48 * 0.15; marker-fill: #5CA2D1; marker-opacity: 0.6; marker-line-width: 0; marker-allow-overlap: true; marker-comp-op: dst-atop; [src = 'smalls'] { marker-width: 48 * 0.35; } [src = 'mids'] { marker-width: 48 * 0.7; }  [src = 'bigs'] { marker-width: 48 * 1.4; } [zoom>11] { marker-width: 48; } } ";
        //
        // cartocss += "#" + table + "::lables { text-size: 0; text-fill: black; text-opacity: 0.8; text-name: [points_count]; text-face-name: 'DejaVu Sans Book'; text-halo-fill: #fff; text-halo-radius: 0; [src = 'smalls'] {text-size: 48 * 0.2; text-halo-radius: 1; } [src = 'mids'] { text-size: 48 * 0.3; text-halo-radius: 1; } [src = 'bigs'] { text-size: 48 * 0.5; text-halo-radius: 1; } text-allow-overlap: true; [zoom>11] { text-size: 48 * 0.66; } } ";

        break;
    }

    return cartocss;
  }
}
