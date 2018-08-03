---
layout: default
title: "The Switch to Guzzle is Complete"
date: 2013-04-24 14:30
author: joncram
---
    
I've spent the past 4 weeks (or so) switching from our [own HTTP client library](https://github.com/webignition/http-client) 
to a third-party HTTP client library called [Guzzle](http://guzzlephp.org/).

This change was brought about by the fact that our own HTTP client is
dependent on a PHP extension that (at least currently) doesn't work with
PHP 5.5 and which is not under any particular active development.

Guzzle, on the other hand, is not dependent on any PHP extensions and is
continually being improved and updated.

As the provider of a service that is heavily based around retrieving
resources from the web for later testing, the HTTP client we use to do this
is at the centre of everything that goes on.

Switching HTTP client libraries turned out to be a non-trivial task.

Guzzle handles error cases differently, presents a slightly different means
for mocking HTTP responses in code
tests and provides a slightly different means for retrying failed requests.
None of this is bad, it's just different and takes time to apply correctly.

Did I mention that the HTTP client is at the centre of everything? Changing
the HTTP client changes everything.

Well, maybe not everything, but lots:

- All code tests that make use of mock (or pretend) HTTP responses had to be
updated to use the slightly different means Guzzle uses for achieving this.
- Everything had to be re-tested.
- Areas of code that were changed that did not have code tests had to have
tests created.
- Minor issues spotted when creating and then running code tests had to be
fixed.
- At the end of this change, we now have a much more stable and future-proof
system:
- The code is more readily testable and has seen a large increase in the
number of code tests in use, reducing the chance of inadvertently-introduced
bugs getting released into the wild.
- Everything works under PHP 5.3, 5.4 and 5.5.
- Improved HTTP caching abilities present the option for further performance improvements.

For you, someone who uses Simply Testable to run full-site HTML validation,
CSS validation and JavaScript static analysis, the completion of this change
means two important things: everything will work much better, and I can
now start introducing new features and improvements to make Simply Testable
more useful.
