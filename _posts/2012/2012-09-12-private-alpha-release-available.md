---
layout: default
title: "Private alpha release available"
author:
    name: Jon Cram
    url: https://github.com/webignition
illustration:
    id: private-alpha
    url: https://i.imgur.com/viz6l.png
excerpt_separator: <!--more-->
---
    
The private alpha release is now available: [http://alpha1.simplytestable.com/](http://alpha1.simplytestable.com/).

You can run full-site HTML validation tests on any site that has a sitemap.xml file; it's from the sitemap that
the URLs to be tested are retrieved.

<!--more-->

There are a few known issues which translate into matters I'll be addressing this coming week:

- the progress and results for large sites (2000+ URLs) will tend to not
load more often than not
- individual tests (that are part of a full-site test) that fail will
tend to prevent the rest of the test from progressing

There are some improvements to be worked on also, including:

- adding support for compressed sitemaps
- retrieving URLs from a site's RSS feed if no sitemap is present
