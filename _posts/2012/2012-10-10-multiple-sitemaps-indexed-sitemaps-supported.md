---
title: "Multiple Sitemaps, Indexed Sitemaps Supported"
date: 2012-10-10 10:30
author: joncram
---
    
The URLs to be tested when running a full-site test are gathered from a website's
[sitemap](http://sitemaps.org/).
    
A sitemap can list a collection of URLs for your site. A sitemap can also act as an index
listing a collection of sitemaps. Your robots.txt file can also list many
sitemaps (despite this not being part of the standard).   
    
Up until just a few minute ago, we supported only the first type: a sitemap
that listed a collection of URLs for your site.   
    
I rewrote our [sitemap finder](https://github.com/webignition/website-sitemap-finder),
[sitemap retriever](https://github.com/webignition/website-sitemap-retriever) and
[sitemap model](https://github.com/webignition/sitemap-model) libraries to support
multiple sitemaps and sitemap indexes so that all sitemap uses are supported. 
    
If your robots.txt lists a sitemap index URL, we'll now read the index and read in all
the referenced sitemaps and extract all URLs across all sitemaps for testing.  
    
If your robots.txt lists multiple sitemaps and are not using a sitemap index, we'll
just grab all those sitemaps and extract all the URLs across all sitemaps for testing.
