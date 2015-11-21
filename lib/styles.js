var Tenures = require('./tenures');
var _ = require('underscore');

module.exports = {
  getCartoCSS: function(table) {

    var tenures = Tenures.getTenures();
    var status = Tenures.getStatus();

    var cartocss = '';

    switch(table) {
      case 'core_indigenousland':

        cartocss = '#' + table + ' { polygon-fill: #000; line-width: 1.5; line-opacity: 0.7; polygon-opacity: 0.7; } ';

        _.each(tenures, function(tenure) {
          if(tenure.map_color) {
            cartocss += '#' + table + '[land_tenure_id=' + tenure.id + '] { polygon-fill: ' + tenure.map_color + '; } ';
          }
        });

        cartocss += '#' + table + "[zoom>=12] { polygon-opacity: 0.4; text-fill: #fff; text-opacity: 0.8; text-name: [name]; text-face-name: 'DejaVu Sans Book'; text-halo-fill: #000; text-halo-radius: 1; text-placement-type: simple; text-placements: 'E,NE,SE,W,NW,SW'; text-size: 26; }";

        cartocss += '#' + table + "[zoom>=15] { text-size: 22; }";

        cartocss += '#' + table + "[dashed_border=true] { line-dasharray: 8, 5; }";

        cartocss += '#' + table + '[exclusive_guarani_land=true] { line-color: #c9d119 ; }';
        cartocss += '#' + table + '[exclusive_guarani_land=false] { line-color: #f24e23 ; }';

        break;

      case 'core_indigenousvillage':

        cartocss = '#' + table + ' { marker-width: 3; marker-fill: #ff5c00; marker-fill-opacity: 0.9; marker-line-color: #fff; marker-line-opacity: 1; marker-line-width: 0.2; marker-type: ellipse; marker-placement: point; marker-allow-overlap: true; } ';

        cartocss += '#' + table + '[zoom>=6] { marker-width: 3.5; } ';
        cartocss += '#' + table + '[zoom>=7] { marker-width: 4; } ';
        cartocss += '#' + table + '[zoom>=8] { marker-width: 4.5; } ';
        cartocss += '#' + table + '[zoom>=9] { marker-width: 5; } ';
        cartocss += '#' + table + '[zoom>=10] { marker-width: 5.5; } ';
        cartocss += '#' + table + '[zoom>=11] { marker-width: 6; } ';

        cartocss += '#' + table + "[guarani_presence=false] { marker-width: 5; marker-fill-opacity: 0.0; }";

        break;

      case 'core_archaeologicalplace':

        cartocss = '#' + table + ' { marker-width: 3; marker-fill: #7000ff; marker-fill-opacity: 0.9; marker-line-color: #fff; marker-line-opacity: 1; marker-line-width: 0.2; marker-type: ellipse; marker-placement: point; marker-allow-overlap: true; } ';

        cartocss += '#' + table + '[zoom>=6] { marker-width: 3.5; } ';
        cartocss += '#' + table + '[zoom>=7] { marker-width: 4; } ';
        cartocss += '#' + table + '[zoom>=8] { marker-width: 4.5; } ';
        cartocss += '#' + table + '[zoom>=9] { marker-width: 5; } ';
        cartocss += '#' + table + '[zoom>=10] { marker-width: 5.5; } ';
        cartocss += '#' + table + '[zoom>=11] { marker-width: 6; } ';

        break;
    }

    return cartocss;
  }
}
