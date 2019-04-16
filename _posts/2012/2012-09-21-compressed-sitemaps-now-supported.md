---
title: "Compressed Sitemaps Now Supported"
date: 2012-09-21 15:00
author: joncram
---

The URLs against which to run a full-site test are ideally collected from
a website's sitemap.xml. This is usually a plain XML file containing a list
of URLs and some metadata regarding those URLs.

The [official sitemap FAQ](http://www.sitemaps.org/faq.html#faq_sitemap_size)
states that a sitemap.xml file must be no larger than 10MB and that the overall file
size can be reduced, to stay within this limit, through gzip compression.

We now support the extraction of site URLs from gzip-compressed sitemaps
as well as uncompressed sitemaps.
