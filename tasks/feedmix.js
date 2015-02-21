'use strict';

module.exports = function (grunt) {
  var pkg = require('../package.json');

  grunt.registerMultiTask(pkg.name, pkg.escription, function () {
    var feedmix = require('../index');
    var fs = require('fs-extra');

    this.files.forEach(function (file) {
      file.src.filter(function (f) {
        if (!fs.existsSync(f)) {
          grunt.log.warn('Source file "' + f + '" not found.');

          return false;
        }

        return true;
      });

      fs.outputFileSync(file.dest, feedmix(file.src) + '\n');
      grunt.log.writeln('File "' + file.dest + '" created.');
    });
  });
};
