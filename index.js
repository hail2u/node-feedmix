'use strict';

var xml2js = require('xml2js');

var parseFeedSync = function (feed, options) {
  var obj;
  xml2js.parseString(feed, options, function (error, data) {
    if (error) {
      throw error;
    }

    if (!data.rss) {
      error = new Error('The root element is not `rss`');
    } else if (!data.rss.channel) {
      error = new Error('There is no `channel` element');
    } else if (data.rss.channel.length !== 1) {
      error = new Error('There is more than one `channel` element');
    } else if (!data.rss.channel[0].item) {
      error = new Error('There is no `item` element');
    }

    if (error) {
      throw error;
    }

    obj = data;
  });

  return obj;
};

var mergeItems = function (items, feeds, options) {
  feeds.forEach(function (f) {
    items = items.concat(parseFeedSync(f, options).rss.channel[0].item);
  });

  return items.sort(function (a, b) {
    return new Date(a.pubDate).getTime() - new Date(b.pubDate).getTime();
  }).reverse();
};

exports.merge = function (feeds, options) {
  var channel;
  var feed;

  if (!options) {
    options = {};
  }

  feed = parseFeedSync(feeds.shift(), options);
  channel = feed.rss.channel[0];
  channel.item = mergeItems(channel.item, feeds, options);
  channel.lastBuildDate = channel.item[0].pubDate;

  return feed;
};

exports.stringify = function (feed, options) {
  if (!options) {
    options = {};
  }

  return new xml2js.Builder(options).buildObject(feed);
};
