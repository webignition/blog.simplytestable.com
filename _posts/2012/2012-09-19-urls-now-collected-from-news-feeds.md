---
title: "URLs Now Collected From News Feeds"
date: 2012-09-19 13:15:00
author: joncram
---
    
A full-site test that aims to carry out a set of tests against every URL
for a site needs to get the URLs from somewhere.

Up until just a few minutes ago, the URLs to test against were collected
from a site's sitemap.xml file. This was fine for sites that had sitemaps.
Many don't. I'd say most don't.

For sites that have no sitemap, we collect what URLs we can from the news
feed - either the RSS feed or ATOM feed.

The URLs present in a news feed are likely a subset of all the URLs for a site
and are commonly a small subset.

Nevertheless, a small subset of URLs to test against is infinity percent
better than no URLs to test against.

And given that HTML validation errors are common to many pages of a site,
due to there being common page elements such as navigation, if you fix
the errors for pages listed in your news feed you'll likely be fixing
errors present on pages that weren't directly tested.
