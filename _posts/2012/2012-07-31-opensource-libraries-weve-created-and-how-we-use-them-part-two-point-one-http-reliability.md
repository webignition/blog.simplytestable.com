---
layout: default
title: "Opensource Libraries We've Created and How We Use Them (Part Two Point One: HTTP Reliability)"
short_title: "Opensource Libraries We've Created and How We Use Them (Part 2.1)"
author: joncram
excerpt_separator: <!--more-->
---

I created some libraries for dealing with certain matters that would be common
across the Simply Testable service.

Such libraries address generic matters that should be useful to others. They
have been opensource under an MIT license from day one.

In [part one of this series](/opensource-libraries-weve-created-and-how-we-use-them-part-one-url-handling/), I talked about what we use for handling URLs.

In part two point one, I look at what we've created and use for handling HTTP
requests *reliably*. Part two point two will expand on this and
look at how we test HTTP-based applications.

<!--more-->

### Reliable HTTP requests

<ul class="repository-list">
    <li>
        <i class="fab fa-github"></i>
        <a href="https://github.com/webignition/http-client">webignition/http-client</a>
        <a class="build-status" href="http://travis-ci.org/webignition/http-client"><img src="https://secure.travis-ci.org/webignition/http-client.png?branch=master" /></a>
    </li>
</ul>
    
We need to query robots.txt and sitemap.xml or sitemap.txt files to get
a list of URLs to be tested. We need to request every page of a site
when testing to run a set of tests against every page.    

In short, we test the web. The web uses HTTP. We deal with a ton of HTTP requests.    

Our [https://github.com/webignition/http-client](HTTP client library) handles getting responses to HTTP requests 
in a way upon which we can rely.
    
### The need for an HTTP client
    
In PHP, you can handle HTTP messaging in variety of ways. You can create
your own HTTP layer on top of bare socket connections, you can use the
PECL HTTP extension or you can just take advantage of HTTP wrappers for
file-based operations and pretend you're just reading a file.    
    
We use the PECL HTTP extension which provides [HTTPRequest](http://php.net/manual/en/class.httprequest.php),
<a href="http://php.net/manual/en/class.httpresponse.php">HTTPResponse</a>
and <a href="http://php.net/manual/en/class.httpmessage.php">HTTPMessage</a>
objects for interacting with HTTP-based services.
       
> The HTTP extension eases handling of HTTP URLs, dates, redirects,
> headers and messages in a HTTP context (both incoming and outgoing).
> 
> It also provides means for client negotiation of preferred language and
> charset, as well as a convenient way to exchange arbitrary data with
> caching and resuming capabilities.
    
Sounds like we can use the HTTP extension for all our HTTP needs. But try
regularly handling many, many HTTP requests and you'll start to appreciate
the brittleness of bare HTTP messaging.

An HTTP request is sent and an HTTP response containing what you expected
is retrieved. This happens for the majority of requests.

This doesn't happen for a minority of cases and that minority is
significant. I'd say between 5-10% of HTTP requests get you back an HTTP
response you didn't really expect. The response is often perfectly valid
but may well not present the resource you hoped for.

Some responses (quite validly) don't contain the resource you requested
but instead contain a pointer to the resource you requested, with 301
and 302 responses being most common.

You'll also notice that requests fail *all the time*.    
    
An HTTP conversation in isolation is subject to a range of failure modes.
One of many DNS systems may be in a huff and the request to resolve a
domain to an IP may timeout. An HTTP server may be busy and may take
too long to respond to your request but may be perfectly able to respond
quickly the next time you try. A complex HTTP application may fail and
return a 500 error but may be perfectly able to respond as expected the
next time you try.

A isolated HTTP conversion is unreliable. For the odd occasional HTTP
request such unreliabilty may go unnoticed. When regularly dealing with
many, many HTTP requests and responses, unreliable is not good.
    
### Making HTTP more reliable
    
You can send an [HTTPRequest](http://php.net/manual/en/class.httprequest.php)
and get directly back an [HTTPMessage](http://php.net/manual/en/class.httpmessage.php)
containing what you want. Unless the resource you want is actually at another URL,
either temporarily or permanently. Unless a DNS or HTTP server somewhere
along the way isn't too busy right now. Unless an HTTP server somewhere
along the way isn't faulty.
    
Modern browsers spoil us, they make us feel that HTTP is reliable. You
visit a URL and a page loads. And that page loads almost every single time
unless there's a significant problem.

You don't see how your browser follows redirect requests, how your browser
doesn't give up the instant something times out, how your browser might
be smart enough to try again for errors that, from experience, tend to be
temporary.

Our [HTTP client library](https://github.com/webignition/http-client) handles all this for us.
    
You give it an HTTP request and it then gives back an HTTP message in
response. Internally it follows redirects if you tell it to, it tries
a few times if something times out and it tries again if it encounters
an error which we've seen tends to be temporary.
    
### The significance of making HTTP more reliable

Try crawling a site and try to keep going until you gather a collection of
unique URLs for the entire site. You start at the homepage and gather
all URLs relevant to the site that you find. For each of those URLs you do
the same. Sounds straightforward, doesn't it?

For very small sites with perhaps 10-20 unique URLs, you might get away
with it without running into any timeouts or recoverable errors.

For respectable-sized small sites with around 100 unique URLs, you might
get away with it more often than not. The entire crawling process will fail
maybe 1 in 10 times you try.

For medium-sized sites with around 500-1000 unique URLs, you might get
away with it if you're lucky. The entire crawling process will fail maybe
9 times out of 10.

For larger sites with 10,000+ unique URLs, you might get away with it once
in a lifetime if you're particularly lucky. The entire crawling process will
fail every single time as far as you can tell.

I can say this is the case having developed the tools our sitemap generator
will be using. The sitemap generator crawls an entire site and gathers
a collection of unique URLs. This is then used to figure out the URLs of a
site that need testing.

I've successfully managed to crawl [Stack Overflow](https://stackoverflow.com/)
to the point of collecting around 300,000 unique URLs before getting bored.
Without any additional reliability mechanisms, this would be a once in a
lifetime achievement.

That's at the very least 300,000 HTTP requests in series that succeeded in
retrieving the requested resource.

That crawl was carried out over a 3G wireless Internet service, purely to
throw in a few more failure modes than you'd more commonly encounter for
a wired server.
