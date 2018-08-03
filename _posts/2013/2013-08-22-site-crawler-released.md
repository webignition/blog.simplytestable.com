---
layout: default
title: "Site Crawler Released (And The Story Behind It)"
author: joncram
---

The Simply Testable service lets you run a set of frontend web testing
tools against your entire site all in one go.

When I started building the service I had to decide
on how to collect URLs such that your entire site is tested.
In this respect there are two options: try to figure this out, or ask
someone who knows.

I decided to go with the 'ask someone who knows' option, that is to
check a site's XML sitemap to discover URLs to be tested. I decided it
was more important to build a tool to test websites than it was to build
a tool to find URLs to test.

Now that I have built a tool to test websites, I checked how many
tests cannot start due to a site not having a sitemap.

If there was a significantly high number of these, I told myself, I should
add a crawler that can discover URLs to be tested. I wasn't sure how to
measure 'significant' but didn't let that stop me.

Armed with a database of past results and the power of SQL, I set about
the task of finding out. And in 0.0002 seconds I had my answer: about
30% of tests failed due to there being no sitemap.

Well, that's what I initially thought until I wasn't calculating things
correctly.

The true answer: nearly 70% of tests were not able to proceed due
to there being no sitemap. Turns out I don't need to define 'significant'. 70% is significant no
matter how you define it.

A couple of weeks ago I set about putting in place a crawler to
discover URLs to be tested if a site has no sitemap and about a week
ago this was silently released.

It's now the case that if you try to test a site and the test cannot
proceed due to the site having no sitemap, you'll be given an option
to crawl the site to find URLs to test.

There is now no site that we cannot test. You might just find that useful.
