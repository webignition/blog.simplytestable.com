---
layout: default
title: "Batch of Content-Retrieval Bugs Fixed"
author:
    name: Jon Cram
    url: https://github.com/webignition
excerpt_separator: <!--more-->
---
    
Today has been focused on fixing bugs that just so happen to all relate
to content retrieval.

With the volumes of web pages retrieved and tested daily by Simply Testable,
I always think I've seen all the ways in which people produce HTML incorrectly.

With the volumes of code I write daily for Simply Testable I always think
I've covered (nearly) all the ways in which content retrieval can go wrong.

I'm still amazed by what I find.

<!--more-->

Today's latest bug fixes:

### Fixed retrieval of JavaScript resources referenced by relative URLs

Ever referenced a JavaScript resource like this: `<script src='../jquery.js'></script>`

We weren't correctly deriving the full absolute path to the referenced
resource in some cases where a relative URL is used.

Fixed.

### Ignoring invalid Content-Type attributes

The HTTP Content-Type header includes details on the type of content
present in a HTTP response.

Here's a common example: `Content-Type: application/javascript; charset=UTF-8`.

That example is perfectly correct. It tells us that the content we're getting
is JavaScript and it tells us what character encoding to use when interpretting
the JavaScript.

Here's a bad example: `Content-Type: application/javascript; charset: UTF-8`.

That example is invalid. It tells us, quite probably, that the content
we're getting is JavaScript and it tells us that the &hellip; ahh, wait &hellip;
what? &hellip; it contains nonsense from then onwards.

Our <a href="https://github.com/webignition/internet-media-type">library for making sense of this</a>
wasn't prepared for things being quite as invalid as the above bad example is.

I updated the library to allow invalid attributes to be ignored entirely.

Feel free now to return Content-Type headers with jibberish attributes if you fancy.

Fixed.

### Handling cURL Errors 6 and &hellip; 37

Somewhere towards the bottom of the stack when retrieving web content
is a library called cURL. It gives us very detailed reasons why something
went wrong if it went wrong.

When retrieving some web pages and some JavaScript resources, things were
going wrong. We weren't spotting them.

It is now the case when retrieving a JavaScript resource to run through JSLint
that all errors cURL can throw our way are handled gracefully.

This specifically covers two cases of uncaught cURL errors that we were seeing.

Firstly there is
the quite-likely-to-occur error 6 which more or less translates to the fact
that the domain name in a URL does not exist.

Secondly there is
the blimey-did-that-happen error 37 which occurs if you try to use a `file://`
URL on the Internet.

Feel free now to make such mistakes, I don't mind at all.

Fixed.
