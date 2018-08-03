---
layout: default
title: "Test Timeouts Now Supported"
date: 2012-10-03 17:00
author: joncram
illustration:
    id: test-timeouts-now-supported
    url: https://i.imgur.com/Y4KE3.png
---
    
Timeouts. Sometimes they just happen.
    
Up until very recently, a timeout when trying to perform a HTML validation
test for a URL would leave the test stuck as being in progress. This
prevented the full site-wide test from ever showing as 100% complete, often
getting stuck at 90-something percent.   
    
Timeouts join a collection of three new test failure situations supported:
    
- Retrieval timeouts: a timeout when retrieving the HTML of a page
- DNS lookup timeouts: a timeout when trying to resolve the domain of a URL
- Malformed URLs: sometimes a URL can't work as it is just not quite made correctly
    
In any of the above three cases a test will be marked as failed and when
viewing the results of a test you'll get a brief description of why
the test could not happen.

