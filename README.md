Feedmix
=======

Merge RSS 2.0 feed(s) into a feed.


INSTALL
-------

    $ npm install feedmix


USAGE
-----

    var feedmix = require('feedmix');
    var fs = require('fs');
    
    var a = fs.readFileSync('a.rss', utf8');
    var b = fs.readFileSync('b.rss', utf8');
    var c = fs.readFileSync('c.rss', utf8');
    var m = feedmix.merge([a, b, c], {
      trim: true
    });
    // do something with `m`
    console.log(feedmix.stringify(m, {
      xmldec: {
        version: '1.0',
        encoding: 'UTF-8'
      }
    }));

This merges `b.rss` and `c.rss` into `a.rss`. All items are sorted, and
`lastBuildDate` element will be updated.

Alos you can pass [xml2js’s parser options][1] to `merge()` and [builder
options][2] to `stringify()`.


LICENSE
-------

MIT: http://hail2u.mit-license.org/2015


[1]: https://github.com/Leonidas-from-XIV/node-xml2js#options
[2]: https://github.com/Leonidas-from-XIV/node-xml2js#options-for-the-builder-class
