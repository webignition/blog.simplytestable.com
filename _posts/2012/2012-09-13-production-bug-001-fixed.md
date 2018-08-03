---
layout: default
title: "Production Bug #001 Fixed"
date: 2012-09-12 13:00:00
author: joncram
---
    
Following yesterday's private alpha release, I was trying to figure out
why some HTML validation tests were failing.

In some cases I was seeing not a JSON response from the validator but
an HTML response. This was odd; we ask the HTML validator to return JSON so
that it can be parsed more easily (where 'more easily' means 'at all, really').

Asking the W3C HTML validator to give you a JSON response, it turns out, only
has an effect on HTML validation tests that actually work.
Pass the validator nonsense values it can't understand and you don't get
back the JSON you asked for. That's fair.

Something we were passing to the HTML validator when trying to validate
a web page was being interpreted as nonsense.

When validating, we pass the validator the HTML content to validate and
tell it the character encoding that the HTML content uses. One of these
was confusing the validator.

It's pretty hard to confuse the HTML validator with invalid HTML, being
able to spot that is a lot of what it does for a living. So I looked at
the character encoding.

We have to figure out the character encoding after retrieving a web page
so that we can pass this useful detail along to the validator. our
[web page model](https://github.com/webignition/web-page-model) library does this for us.

For some web pages, we were asking the web page model for the character
encoding it reckons was being used. In response it was saying `null`.
That's computer speak for &ldquo;I have no idea whatsoever.&rdquo;

Odd. I paid attention to how one can choose to specify the character encoding
of a web page when making the web page model. There are three ways. I won't
go in to them here. But three ways there are and three ways I had covered.

What I hadn't considered were cases where the character encoding for a
web page could not be determined. Some times the character encoding is
not specified at all. Some times it is specified incorrectly, which really
means it is not specified at all.

So what happens if you pass a `null` value to the W3C HTML
validator as the character encoding? The validator returns an HTML page stating
the that the character encoding you provided isn't recognised.

A small change sorted this out: if the character encoding for a web page
cannot be determined, we tell the HTML validator nothing about the
character encoding. It's happy with this.

Production bug #001 fixed.
