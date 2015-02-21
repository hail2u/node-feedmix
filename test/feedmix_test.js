'use strict';

var feedmix = require('../index');
var fs = require('fs');
var path = require('path');

var dirFixtures = path.join(__dirname, 'fixtures/');
var dirExpected = path.join(__dirname, 'expected/');
var actual = feedmix.merge([
  fs.readFileSync(dirFixtures + '1.rss', 'utf8'),
  fs.readFileSync(dirFixtures + '2.rss', 'utf8')
]);
var expected = fs.readFileSync(dirExpected + 'm.rss', 'utf8').trim();

exports.merge = function (test) {
  test.expect(6);

  var feed = '<rss><channel><title> Test </title>' +
    '<item><pubDate>Sun, 22 Fed 2015 03:06:11 +0900</pubDate></item>' +
    '</channel></rss>';
  var obj = {
    foo: 'bar'
  };

  test.strictEqual(
    feedmix.merge([feed]).rss.channel[0].lastBuildDate[0],
    'Sun, 22 Fed 2015 03:06:11 +0900'
  );

  test.strictEqual(
    feedmix.merge([feed], {
      trim: true
    }).rss.channel[0].title[0],
    'Test'
  );

  test.strictEqual(
    feedmix.merge([feed], {
      explicitArray: false
    }).rss.channel[0].title[0],
    ' Test '
  );

  test.strictEqual(
    feedmix.stringify(obj),
    '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n<foo>bar</foo>'
  );

  test.strictEqual(
    feedmix.stringify(obj, {
      xmldec: {
        encoding: 'UTF-8',
        version: '1.0'
      }
    }),
    '<?xml version="1.0" encoding="UTF-8"?>\n<foo>bar</foo>'
  );

  test.strictEqual(feedmix.stringify(actual), expected);

  test.done();
};
