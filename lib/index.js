var Windshaft = require('windshaft');
var _         = require('underscore');
var Styles = require('./styles');
var config = require('../config');

// Force 'development' environment
// var ENV = 'development';
var PORT = config.port;

// set environment specific variables
global.environment = {
  postgres: config.postgres,
  millstone: {
    cache_basedir: config.cache_basedir
  },
  renderer: {
    poolSize: 8,
    metatile: 2,
    bufferSize: 64,
    snapToGrid: false,
    clipByBox2d: false,
    limits: {}
  },
  oneDay: 86400000
};
global.settings = {};

_.extend(global.settings, global.environment);

var wsConfig = {
  base_url: '/:table',
  base_url_mapconfig: '/api',
  grainstore: {
    datasource: _.extend({geometry_field: config.geometry_field}, config.postgres)
  }, //see grainstore npm for other options
  renderCache: {
    ttl: 60000 // seconds
  },
  enable_cors: true,
  mapnik: {
    poolSize: 8,
    metatile: 2,
    bufferSize: 64,
    snapToGrid: false,
    clipByBox2d: false,
    limits: {}
  },
  redis: config.redis,
  req2params: function(req, callback) {

    req.params.dbname = config.dbname;

    // import query to params
    req.params = _.extend({}, req.params);
    _.extend(req.params, req.query);

    if(req.params.table) {

      if(req.params.table.indexOf('core_') == -1) {
        req.params.table = 'core_' + req.params.table;
      }

      req.params.style = Styles.getCartoCSS(req.params.table);

    }

    callback(null,req);
  },
  // this two filters are optional
  beforeTileRender: function(req, res, callback) {
    callback(null);
  },
  afterTileRender: function(req, res, tile, headers, callback) {
    callback(null, tile, headers);
  }
};

// Initialize tile server
module.exports = function() {
  var ws = new Windshaft.Server(wsConfig);
  ws.listen(PORT);
  console.log("map tiles are now being served out of: http://localhost:" + PORT + wsConfig.base_url + '/:z/:x/:y.*');
}
