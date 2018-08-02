---
layout: default
title: "Awesome Link Integrity Testing Now Available (If You Have An Account)"
author:
    date: 2013-10-16 11:00
    name: Jon Cram
    url: https://github.com/webignition
---

### Link Integrity Testing Now Available

Broken links are a pain for you as a website owner, an annoyance for you
as a website user and a please-kill-me-now experience for you as a
professional website tester.

I've recently added a link integrity tester to [Simply Testable](https://simplytestable.com)
which will make you as a website tester live longer. Or at the very
least it will turn a mundane, monotonous and tedious task into a painless one-click
experience. Either way it's good. Very good.

This is currently being offered only to those with an account.
[Sign in](https://gears.simplytestable.com/signin/) or [create a free account now](https://gears.simplytestable.com/signup/)
to give it a go.

Try it right now: [Start a new full-site test](https://gears.simplytestable.com/)
for your website, expand the test options and check that link integrity testing
is selected.

Read on to find out how it is awesome.

### Benefit Highlights

I tried out a range of link checking tools when adding the new link
integrity tester to see how they work and what they offer. All are lacking in one way or another.

Here is what makes the Simply Testable link checker awesome in ways that
no other link checker does:

- Easily check all links across your entire site
- Find and check all links in each page, not just clickable links that you can see
- Find all URLs <em>correctly</em>, including all non-absolute and protocol-relative URLs
- Find out <em>why</em> a given link does not work
- Get realistic results that you don't have to double-check by hand

If you need to test websites professionally, that's all you need to know.

Read on if you want to find out how our new link integrity tester
is better than many existing tools, how it is more reliable and dependable, how it will tell you why a broken link is
broken and how it is much better than the de-facto W3C link checker.

### We Can Find All Broken Links Across Your Entire Site

Can you otherwise easily find all broken links across your entire site?

You could download and install an application that can do this. There
are plenty.
And this is fine if you don't ever switch computers and don't
want to kick off a new test from your tablet whilst you're on the train
and don't want to demonstrate the lack of broken links in a brand
new site whilst you're at a client site giving a demo.

There are various online tools that do this. I researched many when
building this new feature.

Some work for constrained definitions of "work", some plague you with
adverts, some will tell you which links are broken but will not help you easily
find them nor tell you why the links don't work.

So, no, I'd argue that you cannot easily find all broken links across
your entire site.

### We Give You Realistic, Dependable Results

Assuming you know what URLs you want to check, it's pretty easy to code
up a simple tool that checks each to see if it works. With a competent
software developer this might take a morning, perhaps a day if you're
stringent about quality.

List of URLs goes in, results come out; all appears to work.

That's assuming you can correctly find all the URLs in a page that
must be checked. You need to correctly resolve relative URLs, taking into consideration
the `<base>` element; that's where some of the existing online tools fail.

Try checking the results by hand and perhaps things don't quite
match with reality. The W3C link checker is an example of this.

A web server can choose to respond in one way for regular users and
a different way for an automated tool. If you're not careful, your
link checking tool will report issues which, from the perspective of a
regular user, don't exist.

A link checking service where you have to manually verify the results
is broken. You could argue that on a technical level it works
but as far as it helping you find out which links in your site will
cause issues for real-life users it does not work.

I've vigourously tested the new link integrity tester, comparing
the results with reality to be sure that it gives you realistic, dependable,
reliable results.

### We Can Tell You Why Broken Links Are Broken

You might think you can easily manually determine why a broken link is
broken. Getting to the true reason is not as straightforward
as it might seem.

Yes, you can click on a link and see if it takes you to an obvious
404 Not Found page.

Yes, you can click on a link and see if it takes you to what appears
to be a regular page but is in fact a 404 Not Found page masquerading
as a regular page. You're going to need to use the Chrome developer
tools for this, or FireBug, or you're going to fire off some curl commands
from the command line. It takes a little more effort but not much, you can
do it.

What if you don't get a 404 Not Found or a 500 Internal Server Error. What
if you try out a link and &hellip; nothing. Blank. White. Screen. Nothing.

If you really want to get down to a fine level of detail you're going to have to
start firing off some curl commands if you want to determine if a given failure
is due to the domain name no longer existing or if there was a network-level
interruption when transferring data either to or from a remote host.

Yes, you can do this by hand, maybe once or twice. I did so by hand many,
many times when developing the new link integrity tester. I would not wish
the same on anyone else.

### Better Than the W3C Link Checker

The W3C link checker is a great reference implementation for how
to check links in a given web page in a world where all tools were treated
equally.

Many servers will return a 403 Forbidden response
if accessed by the W3C link checker. This is fine for a reference implementation
but not of great use in practice.

In some cases you can't check for broken links at all if a web server
flat out refuses to allow access to the link checker tool.

In other cases you can test some, maybe most, links in a web page
but only those linking to web servers that don't refuse access to the link
checker tool.

For some web pages it will not work at all. For others it will work
flawlessly. For others still it will partially work, leaving you
some links to check by hand. And again for some other web pages it will
appear to work but will report some links as being broken when they
work just fine.

And that's perfectly fine for the approach the contributors to the W3C
link checker chose to make. I'm certainly not complaining nor deriding
the contributors for this choice. It's a free tool, open to all, that
works for some definitions of "work".

But it's not fine for testing real-world websites at scale.

### Try Out The Simply Testable Link Integrity Tester

[Start a new full-site test](https://gears.simplytestable.com/)
for your website, expand the test options and check that link integrity testing
is selected.

This is currently being offered only to those with an account.
[Sign in](https://gears.simplytestable.com/signin/) or [create a free account now](https://gears.simplytestable.com/signup/)
to give it a go.
