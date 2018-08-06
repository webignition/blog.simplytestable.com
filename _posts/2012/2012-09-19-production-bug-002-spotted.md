---
title: "Production Bug #002 Spotted - Redirect Loops"
date: 2012-09-19 10:30:00
author: joncram
---
    
Today I spotted a second case where an HTML validation test doesn't
complete properly - redirect loops.

A redirect loop occurs when a URL that issues a `301`, `302` or `303`
redirect to another URL (perhaps back to the previous URL) in such a way
that an unending loop of redirects is created.

This can never be intended for any meaningful website; a redirect loop
is a problem that should be addressed.

Our HTTP client library happily follows redirects and has a redirect limit.

What we don't yet have in the testing system is a means of spotting
that the HTTP client has reached its redirect limit and marking the test
as failed as a result.

Production bug #002 spotted.
