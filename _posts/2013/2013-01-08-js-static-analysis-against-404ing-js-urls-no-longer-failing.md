---
layout: default
title: "JS Static Analysis Against 404ing JS URLs No Longer Failing"
author:
    name: Jon Cram
    url: https://github.com/webignition
excerpt_separator: <!--more-->
---

I noticed yesterday that some full-site JavaScript static analysis tests
were failing quite ungracefully.

Such tests would fail without completing correctly, leaving the test
appearing to be stuck in progress and never completing. This was not good.

<!--more-->

A quick investigation revealed that such tests were being performed for
web pages that linked to external JavaScript files which did not exist.

Such issues are now recognised. If a JS static analysis test is run against
a web page that links to a 404ing JS resource, such a problem will be noted
and present in the results for the specific test.

As a bonus side effect, any non-200 HTTP status code encountered when
trying to retrieve external JS resources (not including redirects) will be
recognised and reported in a similar manner.
