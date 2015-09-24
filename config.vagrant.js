module.exports = {
  port: 4000,
  postgres: {
    user: 'vagrant',
    host: '/var/run/postgresql',
    // host: '127.0.0.1',
    port: 5432,
    srid: 4326
  },
  dbname: 'mapaguarani',
  redis: {
    host: '127.0.0.1',
    port: 6379
  },
  geometry_field: 'polygon',
  cache_basedir: '/tmp/windshaft/millstone',
  land_tenures_api: 'http://localhost:8000/api/land_tenures',
  land_tenures_status_api: 'http://localhost:8000/api/land_tenures_status'
};
