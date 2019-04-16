---
title: "HTTP Failures And What To Test For In HTTP Applications"
author: joncram
excerpt_separator: <!--more-->
---
    
In part two point two in the series of opensource libraries we've
created I'll talk about how we test HTTP-based applications.

In preparation for that, let's look at what can go wrong such that your
HTTP conversation fails and what you need to test for to ensure that your
HTTP application copes with such failure.

This goes beyond HTTP-specified 4xx and 5xx errors and examines failures
that result in no HTTP response being received.

<!--more-->

### The Need For HTTP Testability

You want to test your code with unit tests. Your code  retrieves data over
HTTP. You want to ensure that when your tests fail it's because your code
is faulty not because an HTTP conversation went
awry.

Using an HTTP client with [additional reliability aspects](/opensource-libraries-weve-created-and-how-we-use-them-part-two-point-one-http-reliability/)
helps ensure that your application works as best it can when carrying out
real work that needs to make real HTTP requests. No amount of additional
reliability aspects will ensure that your unit tests fail only due to
faults in your code if you're carrying out real HTTP requests in the code
you're testing.

Let's have a quick look at how your HTTP conversation could break and how
to spot the cause.
    
### How Many Ways Can Your HTTP Conversation Fail?

HTTP conversations over the Internet fail <em>all the time</em>. This is
hardly surprising as the Internet itself is a complex system with many
potential points of failure.

Make a quick guess - how many ways might your HTTP conversation fail?

Perhaps you considered that your application will generate an invalid HTTP
request message. Perhaps your application will generate an invalid URL
for the request. Maybe the HTTP server you're talking to is having a bad
day, or maybe the developer of the application behind the HTTP server
is having a bad day.
    
### We need to go deeper

[All non-trivial abstractions, to some degree, are leaky](http://www.joelonsoftware.com/articles/LeakyAbstractions.html)
HTTP conversations are no exception.

We're running an application-layer protocol on top of a range of
transport mechanisms which can use a broad range of authentication,
identification and encryption mechanisms which themselves can accept
various configurations.

We pretend we're sending simple text-based messages to machines that read
them and send back simple text-based messages in response. We can't see,
and so forget about, what goes on underneath.

Whilst you were quickly guessing the number of ways in which your HTTP
conversation might fail, I was quickly looking up the answer on my phone
when you thought I was paying attention to what you were saying.   
    
Take a list of [cURL error codes](http://curl.haxx.se/libcurl/c/libcurl-errors.html)
and trim this down to a [subset that is relevant to HTTP](https://github.com/webignition/http-client/blob/master/src/webignition/Http/Client/CurlException.php)
and then trim that down a little more to
ignore error cases about which our HTTP client library is overly pedantic.    
    
**There are about 30 or so relevant error cases**. Some
relate to underlying network transport matters (55: "Failed sending
network data.",  56: "Failure with receiving network data"), many relate
to SSL matters (errors 35, 51, 53, 54, 58, 59, 60, 66 and 77).

Thankfully most SSL-related matters relate to invalid SSL setup or configuration
and so aren't matters that would turn up too often.
    
### Common HTTP Failures You Need To Handle<

cURL errors 3, 6 and 28 are the ones to look out for which translate, respectively,
into:

- Invalid URL format
- DNS resolution failure
- Connection or transfer timeout

I run into these all the time.

Crawling an entire site to find all unique  URLs for that site will turn up
a few invalid URLs and a few timeouts.

The longer the crawl takes, the greater the chance you'll run into a DNS
resolution failure. No matter how well established a domain name is, the
DNS server you're querying to translate a domain into an IP will, at
various times throughout the day, either be too busy to get back to you
or will be updating its records and won't feel like talking to you.

It's these three most common modes of failure that your application needs
to handle.


- How does your application deal with cases where it tries to
request data from an externally-supplied URL which could be
invalid?
- How does your application deal with DNS failures when trying to
request data over HTTP?
- How does your application deal with request connection or transfer
timeouts?

You need to be aware of the common occurrence of these types of failure
and build mechanisms into your application to ensure such errors are
handled gracefully.

Once you think you've handled such failures, you need to be able to
unit-test your HTTP-based application without actually performing real
HTTP requests.

In part two point two in the series of open-source libraries we've
created I'll talk about we how use our HTTP client library to simulate not
only HTTP responses but also invalid URL format issues, DNS resolution
failures and connection or transfer timeouts without any test-specific
code inside the application so that we can be sure such cases are handled
correctly via unit tests without having to wait around for an actual real
life error to occur.
