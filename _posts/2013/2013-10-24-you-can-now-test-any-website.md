---
title: "You Can Now Test Any Website"
author: joncram
---

The goal all along of Simply Testable has been to let you easily
run a set of frontend tests against any website of your choosing
with the minimum possible effort.

Until recently you could only test a large subset of the
Internet. It was a large subset of the Internet, but not the entirety.

For some sites you'd encounter a polite notice informing you
that the given site is too large to be tested. For other sites your
test would get stuck at "Finding URLs to test: looking for sitemap or news feed"
and stay like that forever.

As of a few minutes ago, you can now test absolutely any website.
Here is story of how we went from being able to test only a tiny subset
of all websites to being able to test absolutely any website.

### The Beginning: Simple Sitemaps Only

When the service first launched you could only run full-site tests for
sites with simple sitemaps.

Collecting URLs to test from a sitemap is much easier than crawling
a site to find URLs. And simple sitemaps are much easier to collect
and process than compressed sitemaps, indexed sitemaps and multiple sitemaps.

There was a whole range of sites you couldn't test but it was better
than nothing and allowed me to focus on building a great testing tool
instead of building a great sitemap reading tool.

The [private alpha](/private-alpha-release-available/) was
released on September 12, 2012 and all was good. Limited, covering
only a small subset of the Internet and offering just the one feature, but good.

### News Feed (RSS, Atom) Support

Some sites have no sitemap but do publish news feeds, either in RSS
or Atom format. And some such sites have been around since the dawn
of time and if they haven't added a sitemap yet they may well never do.

Whereas a sitemap will ideally list all URLs, a news feed will typically
list a subset of all URLs and commonly these will be the most recent.
This turns out to be a good substitute for a sitemap.

On September 19, 2012, support for 
[news feeds](https://us5.campaign-archive1.com/?u=ac75e33d993d2b502e333ddd0&amp;id=5c86a943e3)
was mentioned in the weekly newsletter and so support for this was
probably added around then.

Millions of WordPress blogs and Blogger sites could now be tested.

### Compressed Sitemaps

Instead of serving an XML document listing URLs and metadata about those
URLs, some people take their XML sitemap and gzip it and serve the gzipped
archive.

Who'd have thought it?

Well, anyone who has read the official spec might have thought of it,
that's who.

In relation to [sitemap size](http://www.sitemaps.org/protocol.html#index),
the spec states:

> If you would like, you may compress your Sitemap files using gzip to reduce your bandwidth requirement &hellip;

On September 21, 2012, support for [compressed sitemaps](/compressed-sitemaps-now-supported/) was added
and the small subset of the Internet that could be tested grew a little.

### Multiple Sitemaps and Indexed Sitemaps

On the subject of [sitemap size](http://www.sitemaps.org/protocol.html#index),
the spec states:

> You can provide multiple Sitemap files, but each Sitemap file that you
> provide must have no more than 50,000 URLs and must be no larger than
> 10MB (10,485,760 bytes). &hellip; If you want
> to list more than 50,000 URLs, you must create multiple Sitemap files.

Some sites have more than 50,000 URLs. The staff of some have stalled
at the stage of trying to manually count the number of URLs to verify
the situation for management so we'll ignore them for now.

At this point in time we supported only single, simple sitemaps. If
your sitemap was an index that listed other sitemaps you were out of luck.
And if you listed many sitemaps in your robots.txt you were out of luck.

On October 10, 2012, just nipping in prior to the public launch,
support for [multiple sitemaps and indexed sitemaps](/multiple-sitemaps-indexed-sitemaps-supported/) was added.

As an aside as an implementor of a tool that discovers and retrieves
sitemaps, I'd like to point out the range of sitemap combinations
that you as a site owner could opt for:

- a single simple sitemap (listed either in robots.txt or just floating around hoping to get noticed)
- a single simple sitemap index providing URLs to your actual sitemaps (listed either in robots.txt or just floating around hoping to get noticed)
- multiple simple sitemaps listed in robots.txt
- multiple simple sitemaps indexes listed in robots.txt, each listing URLs to your actual sitemaps
- multiple sitemaps listed in robots.txt, some simple sitemaps and some indexes to other sitemaps, in any combination you fancy

With support for multiple sitemaps and indexed sitemaps added, you could
opt for any of the above.

### Crawling To Discover URLs

All of the above changes allowed the subset of the Internet that could
be tested to expand quite a bit but it still failed to cover a
notable portion of the Internet: sites with no sitemap and no news
feed that will never have a sitemap or news feed.

I knew from the start that there would always be some sites that had
no sitemap and no news feed. It wasn't possible to discover URLs to test
and so such sites couldn't be tested.

This might seem like a problem, but when you have to choose between
improving support for sites that can be tested and improving the breadth
of sites that can be tested, it's only a problem if the number of sites
that can't be tested is significant.

Armed with a database of past results and the power of SQL, I set
about the task of finding out. In 0.0002 seconds I had my answer:
about 70% of tests failed due to there being no sitemap and no news
feed.

7 out of every 10 full-site tests that were attempted couldn't happen
due to there being no sitemap and no news feed.
Even with my limited understanding of statistical analysis I could tell
that 70% is significant.

On August 22, 2013 I [announced the new site crawler](/site-crawler-released/)
that would walk all over your site finding URLs to test.

I boldly stated at the time that:

> There is now no site that we cannot test.

I was wrong about this but didn't realise it at the time. I thought
I was telling the truth.

### There is now no site that we cannot test. And I mean it this time.

Back when I last claimed that there was no site we cannot test I was
wrong but not by much.

Sites that have sitemaps provided in an array of possible ways could be
tested. Sites with news feeds could be tested. And sites without sitemaps
and without news feeds could be tested.

What was missing was the ability to test sites that did have sitemaps
but where on a scale of 1 to 10 regarding the size of the sitemap
they rated somewhere around 27.

One thing I quickly spotted after the public launch was that sites
with insanely large sitemaps caused problems.

The background process that was kicked off to collect the sitemap for a
site with an insanely large sitemap would take quite a while going
about it, consuming more and more server resources as it went. Over time,
this would approximate to consuming all server resources and bring
things to a grinding halt. All things.

As a quick and messy fix to the problem of the production server breaking
in style every now and again without warning, I scheduled a job
to run every few minutes that would kill any sitemap-gathering process
that had been running for longer than 2 minutes.

The fix was quick and messy but allowed me to do anything other than
keep a constant eye on the production server. That was good enough for me
and let me get on with anything else.

This did mean that there was still a small subset of the Internet
that could not be tested. And if you tried to test one of such sites,
you test would get stuck at "Finding URLs to test: looking for sitemap
or news feed" and stay like that forever. This is not a good experience.

This week I set about sorting out this mess once and for all.

### Handling Sites With Insanely Large Sitemaps

I was examining a particular site earlier this week. It had a very large sitemap.
"How large is large?", I hear you ask.

The site I was examining had a single index listing 1396 sitemaps, each
listing about 8,000 URLs. That's about 11 million URLs.

This particular site also had an interesting property: it was very slow.
When a slow site serves a single web page it may take some seconds
longer than you expect.

When a slow site is so slow that it times out serving a single sitemap
and when the site has 1396 sitemaps to give you, you end up waiting
around a long time.

Each request to retrieve each sitemap is given 30 seconds to go about it.
This is more than enough time for the majority of sites and includes plenty
of waiting time for any regularly-slow site.

But for a site with 1396 sitemaps each timing out after 30 seconds,
you have to wait 1396 * 30 seconds to finish the process of retrieving
the full sitemap from which to gather URLs to be tested.

1396 * 30 seconds might sound like a while but it's hard to fully appreciate
as we don't normally encounter large amounts of seconds. It seems long,
but how long? It's about 11 hours, that's how long.

Even if the production server didn't have a background process that
periodically killed off long-running processes that were stuck
collecting sitemaps, I can't imagine you'd sit around waiting
11 hours for your test to start. Personally, I'd definitely give up
after 5 hours.

The ability to specify a timeout value for a HTTP request is pretty
universal and certainly available to, and most likely used by, any
application that uses cURL in the background to handle HTTP communication.

In this case that wasn't helping. I could reduce the timeout per HTTP
request from 30 seconds to 1 second. I'd then only have to wait about
20 minutes to fail to retrieve a very large collection of sitemaps.

Well, that's not going to work. 20 minutes is still about 19 minutes
longer than I'd like. And then there would be a problem with regularly-slow
sites that spent a whole 2 seconds to serve up their sitemaps.

I then hit upon the so-obvious-why-didn't-I-think-of-it-before solution
of specifying a timeout to be applied to a collection of HTTP requests
instead of just one.

Bingo!

Every site now has a full 60 seconds for the full sitemap to be retrieved.
It your site has 1396 large sitemaps and isn't slow and serves them up
at a rate of 1 per second, the first 60 would be retrieved and the
rest would be ignored.

Not all the URLs of such a site would be discovered, but a lot would,
certainly enough to give you a good idea of the overall quality
of your site once all the tests you selected had finished.

There is now definitely no site that cannot be tested.

Updates will follow as soon as I found out that this is not true.
