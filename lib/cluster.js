var fs = require('fs');
var $ = require('cheerio');

module.exports = function() {

  var templates = {};

  fs.readFile('lib/sql-templates/cluster.html', 'utf8', function(err, data) {
    templates.cluster = $(data).find('#cluster_template').html();
  });

  return {
    cluster: function(table) {

      return templates.cluster.replace('{{table}}', table);

    }
  }

}
