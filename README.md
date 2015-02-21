Feedmix
=======

Merge RSS 2.0 feed(s) into a feed.


INSTALL
-------

    $ npm install feedmix


USAGE
-----

    var feedmix = require('feedmix');
    
    console.log(feedmix([
      'a.rss',
      'b.rss',
      'c.rss'
    ]);

This merges `b.rss` and `c.rss` into `a.rss`. All items are sorted, and
`lastBuildDate` element will be updated.


LICENSE
-------

MIT: http://hail2u.mit-license.org/2015
