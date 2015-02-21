'use strict';

var feedmix = require('../index');
var fs = require('fs');
var path = require('path');

var dirFixtures = path.join(__dirname, 'fixtures/');
var dirExpected = path.join(__dirname, 'expected/');
var actual = feedmix([
  dirFixtures + '1.rss',
  dirFixtures + '2.rss'
]);
var expected = fs.readFileSync(dirExpected + 'm.rss', 'utf-8').trim();

exports.merge = function (test) {
  test.expect(1);

  test.strictEqual(actual, expected, 'should merge correctly.');

  test.done();
};
