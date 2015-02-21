'use strict';

var fs = require('fs');
var xml2js = require('xml2js');

var readFeedSync = function (file) {
  var obj = {};
  xml2js.parseString(fs.readFileSync(file, 'utf8'), function (error, data) {
    if (error) {
      throw error;
    }

    obj = data;
  });

  return obj;
};

var mergeItems = function (items, feeds) {
  feeds.forEach(function (s) {
    items = items.concat(readFeedSync(s).rss.channel[0].item);
  });

  return items.sort(function (a, b) {
    return new Date(a.pubDate).getTime() - new Date(b.pubDate).getTime();
  }).reverse();
};

module.exports = function (feeds) {
  var feed = readFeedSync(feeds.shift());
  var channel = feed.rss.channel[0];
  channel.item = mergeItems(channel.item, feeds);
  channel.lastBuildDate = channel.item[0].pubDate;

  return new xml2js.Builder({
    cdata: true,
    xmldec: {
      encoding: 'UTF-8',
      version: '1.0'
    }
  }).buildObject(feed);
};
