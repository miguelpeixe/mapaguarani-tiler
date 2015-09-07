// Note, currently to run this server your table must have a column called the_geom_webmercator with SRID of 3857
// to view the tiles, open ./viewer/index.html and set the fields
//
// If you want to get something running quickly, follow the instructions for a seed DB in test/windshaft.test.sql

var Windshaft = require('windshaft');
var _         = require('underscore');

// Force 'development' environment
var ENV = 'development';
var PORT = 4000;

// set environment specific variables
global.settings     = require('windshaft/config/settings');
global.environment  = require('./config');
_.extend(global.settings, global.environment);

var config = {
  base_url: '/database/:dbname/table/:table',
  base_url_mapconfig: '/tiles',
  grainstore: {
    datasource: {
      user: 'postgres',
      host: '127.0.0.1',
      port: 5432,
      geometry_field: 'polygon',
      srid: 4326
    }
  }, //see grainstore npm for other options
  renderCache: {
    ttl: 60000 // seconds
  },
  mapnik: {
    metatile: 4,
    bufferSize: 64
  },
  redis: {host: '127.0.0.1', port: 6379},
  // enable_cors: true,
  req2params: function(req, callback){

    req.params.dbname = 'mapaguarani';

    // no default interactivity. to enable specify the database column you'd like to interact with
    req.params.interactivity = null;

    // this is in case you want to test sql parameters eg ...png?sql=select * from my_table limit 10
    req.params =  _.extend({}, req.params);
    _.extend(req.params, req.query);

    console.log(req.query);

    req.params.config = {
      srid: 4326,
      layers: [
        {
          type: 'mapnik',
          options: {
            sql: 'SELECT * FROM core_indigenousland',
            cartocss: req.query.styles || '#core_indigenousland { polygon-fill: #000; }',
            cartocss_version: '2.0.1',
            geom_column: 'polygon',
            geom_type: 'geometry',
            srid: 4326
          }
        }
      ]
    };
    req.params.config = JSON.stringify(req.params.config);

    // send the finished req object on
    callback(null,req);
  }
};

// Initialize tile server
var ws = new Windshaft.Server(config);
ws.listen(PORT);

console.log("map tiles are now being served out of: http://localhost:" + PORT + config.base_url_mapconfig);
