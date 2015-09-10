// Note, currently to run this server your table must have a column called the_geom_webmercator with SRID of 3857
// to view the tiles, open ./viewer/index.html and set the fields
//
// If you want to get something running quickly, follow the instructions for a seed DB in test/windshaft.test.sql

var Windshaft = require('windshaft');
var _         = require('underscore');

// Force 'development' environment
// var ENV = 'development';
var PORT = 4000;

// set environment specific variables
global.environment = {
  postgres: {
    user: 'postgres',
    host: '127.0.0.1',
    port: 5432,
    srid: 4326
  },
  millstone: {
    cache_basedir: '/tmp/windshaft/millstone'
  },
  oneDay: 86400000
};

var config = {
  base_url: '/:table',
  base_url_notable: '/api',
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
  enable_cors: true,
  mapnik: {
    metatile: 4,
    bufferSize: 64
  },
  redis: {
    host: '127.0.0.1',
    port: 6379
  },
  req2params: function(req, callback){

    // import query to params
    req.params = _.extend({}, req.params);
    _.extend(req.params, req.query);

    if(req.params.table.indexOf('core_') == -1) {
      req.params.table = 'core_' + req.params.table;
    }

    req.params.dbname = 'mapaguarani';

    callback(null,req)
  },
  beforeTileRender: function(req, res, callback) {
    callback(null);
  },
  afterTileRender: function(req, res, tile, headers, callback) {
    callback(null, tile, headers);
  }
};

// Initialize tile server
var ws = new Windshaft.Server(config);
ws.listen(PORT);
console.log("map tiles are now being served out of: http://localhost:4000" + config.base_url + '/:z/:x/:y.*');
