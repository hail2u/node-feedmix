'use strict';

module.exports = function (grunt) {
  var pkg = require('../package.json');

  grunt.registerMultiTask(pkg.name, pkg.escription, function () {
    var feedmix = require('../index');
    var fs = require('fs-extra');

    var options = this.options({
      builder: {},
      parser: {}
    });

    var le = '\n';

    if (options.builder.renderOpts && options.builder.renderOpts.newline) {
      le = options.builder.renderOpts.newline;
    }

    this.files.forEach(function (file) {
      var feeds = [];
      var feed;
      file.src.filter(function (f) {
        if (!fs.existsSync(f)) {
          grunt.log.warn('Source file "' + f + '" not found.');

          return false;
        }

        return true;
      }).forEach(function (f) {
        feeds.push(fs.readFileSync(f, 'utf8'));
      });
      feed = feedmix.merge(feeds, options.parser);

      fs.outputFileSync(file.dest, feedmix.stringify(feed, options.builder) + le);
      grunt.log.writeln('File "' + file.dest + '" created.');
    });
  });
};
