---
layout: default
title: "Guide To Reliable HTTP Resource Retrieval In Applications"
author: joncram
---
    
You might think that coding up the *reliable* retrieval of a
resource at a given URL over HTTP is easy. You'd be wrong but quite
forgivably so.

Higher-level HTTP libraries can abstract away some issues
such that you forget they may occur, and some issues occur so infrequently
that you may never run into them.

Over the past year and a bit, [Simply Testable](https://simplytestable.com/) has processed the content
of a suitably large number of URLs that I've encountered many a rare issue.

This post covers, in a language-agnostic way, the issues you may
encounter when retrieving a resource over HTTP and what can be done
to increase the chance of retrieving the resource you're after.

### What We're Trying To Achieve And How

You're coding an application that needs to retrieve a resource located
at an arbitrary URL. Maybe it is a web page, a CSS file or an image.
What is being retrieved doesn't matter.

You start out with code along the lines of: `$resource = $request->send();`.
That's a PHP-ish example. The language doesn't matter.

What does matter is how you will deal with problems that the Internet
will throw at you when you run your code such that the code has
the greatest chance possible of getting you your resource in a way that
your application can use.

All topics focus around two main ideas:

- directly retrying a HTTP request in cases where it is possible that a retry
- modifying your request in ways that may yield more promising
results

Topics we will look at include:

- [Recoverable network-level errors](#recoverable-network-level-errors)
- [Recoverable HTTP-level errors](#recoverable-http-level-errors)
- [Setting a good user agent](#setting-a-good-user-agent)
- [User agent cycling](#user-agent-cycling)
- [Accept-Encoding precision](#accept-encoding-precision)
- [Content compression mismatches](#content-compression-mismatches)
- [URL encoding toggling](#url-encoding-toggling)
- [HTTP method toggling](#http-method-toggling)

### Recoverable network-level errors

Network-level errors are those raised by an underlying HTTP library
such as [libcurl](http://curl.haxx.se/libcurl/) and relate to
issues that arise when establishing, or reading from,
a [stream socket](https://en.wikipedia.org/wiki/Stream_socket).

Many network-level errors are a deal breaker, such as `CURLE_URL_MALFORMAT`
or `CURLE_COULDNT_RESOLVE_HOST`. These types of error will
be raised before a TCP connection has even been attempted and may be
due to nonsense data (a malformed URL) or a non-existent domain name.

Some network-level errors are indicative of potentially-temporary issues
that may be avoided if you simply try again.

This includes errors such as `CURLE_COULDNT_CONNECT` ()*Failed to connect() to host or proxy*) or
`CURLE_OPERATION_TIMEDOUT` (*Operation timeout*).

The inability for a packet to route through to a given host may well
be a very temporary matter. Network-level routing issues come and go in
the blink of an eye. Packets will one minute get lost as if that's their
only purpose before once again finding a reliable path. Logical network connections
are broken due to incorrectly-configured prioritisation.

You have nothing to lose in trying again and as long as you are considerate
in your approach you shouldn't significantly worsen any major problems.

To deal with potentially-temporary network-level issues:

- Wrap request-sending code in a `try { ... } catch (CurlException $e) { ...}`
  style construct
- Identify cases where a retry has a chance of working. You may at first
  have no idea. That's ok. Start out with retrying for     no network-level
  exceptions and work up from there.
- Retry in cases that you have determined are appropriate.
- Log every single case where a retry was deemed inappropriate.
  At first this will be for all cases.
- Periodically review all logged network-level error cases,
  understand each and every one and consider which are appropriate
  for retrying.
- Ensure you can mock network-level errors in your unit tests
  and verify that your application handles such errors correctly.

Retries must be handled in a way that increases the chance of success
without being overly inconsiderate. Limit the number of retries.
Up to 3 retries may be sensible; dozens may not. Pause between retries;
consider an <a href="https://en.wikipedia.org/wiki/Exponential_backoff">exponential backoff</a> approach.

Over time you will encounter network-level error cases that you thought
couldn't happen, some of which you can deal with not by retrying but
with approaches further on in this guide.

### Recoverable HTTP-level errors

HTTP-based applications can be fragile and can return HTTP client and
server errors in cases where a request could have succeeded.

Consider a familiar client error response: `HTTP/1.1 404 Not Found`.

This can occur for one of two reasons: either the requested resource
could not be found, or a bug in the application serving the request
returned a 404 instead of returning the relevant resource.

On more than one occasion I've investigated issues through using the curl
command line client and encountered something along the lines of:

    curl -I http://example.com/
    HTTP/1.1 404 Not Found
    ...
    
    curl -I http://example.com/
    HTTP/1.1 200 OK
    ...

You might think this doesn't happen. It happens. Maybe not often, but it does.

If the code for the application serving your request is being updated
as your request hits it is anyone's guess as to what will happen. If
the application serving your request is handled at just the right time
to satisfy the conditions for an infrequently-occurring bug you could
get a very odd response.

As with network-level errors, a considerate retry strategy can be employed
to increase the chance of success.

Follow the same steps as for <a href="#network-level-error-steps">handling network-level errors</a>, replacing 'network-level error' with 'HTTP-level error'
as you go.

There will be some HTTP-level errors that you cannot deal with by retrying.
Some of these will be covered below.

### Setting a good user agent

A HTTP application may vary the response based on the [user agent header](https://en.wikipedia.org/wiki/User_agent)
of the request.

Some HTTP applications vary the response through (possibly overly) broad
checks of the user agent string and with quite restrictive consequences.

I've encountered applications that return a HTTP client or server error response,
or which return nothing (resulting in curl error 52), in cases where the user agent
string contains "php" (or "test", more on that in the next section) or
when no user agent is set.

From my experience, it is not uncommon for HTTP applications to deny
access in cases where the user agent string contains the name of a widely-used
programming language (such as "php") or of a widely-used library (such
as "curl").

Avoid such pitfalls by setting a setting a good user agent.

A good user agent string is brief, constant with respect to the application
sending the request, and informative.

You can't go too wrong following the pattern set by 
[Google's various crawlers](https://support.google.com/webmasters/answer/1061943?hl=en)
and opt for: `Product Name/<version number> (http:/example.com/moreinfo)`.

### User agent cycling

You may not always receive the expected response when using a good
user agent string.

I've encountered applications that return a HTTP client or server error response,
or which return nothing (resulting in curl error 52), in cases where the user agent
string contains "test".

This proved problematic when I was using a user agent sting of:
`Simply Testable/1.0 (https://simplytestable.com/)`.

I've chosen to assume that the majority of cases where Simply Testable-initiated
requests encounter a HTTP error due to the user agent header
are false positives and that the circumvention of false positive filtering
is not morally wrong (not all filtering, just false positive filtering).

This assumption is based on investigating such incidents
and not finding a single case where the user agent filtering is in any
way precisely targeted.

You could opt for a nearly-good user agent string that doesn't include
broadly-filtered terms. I changed the default Simply Testable
user agent to `ST/1.0 (http://bit.ly/RlhKCL)` to remove
the word "test".

You can increase the chance of retrieving the expected resource through
modifying the user agent header and trying again in cases where a request
does not receive the expected response.

I call this *user agent cycling* as I will often cycle through
a set of user agent strings in cases where it is really worth the effort
to do so.

This can be implemented in a straightforward manner:

1. Choose a list of user agent strings that you want to use.
2. Be considerate and start out with the user agent string by which
   you wish your application to be identified.
3. When catching a HTTP error exception (you do catch these, don't you?),
   change the user agent header to the next in your list
   and retry.

This could be used to circumvent instances where a HTTP application really
doesn't want to respond nicely to your request.

Before implementing user agent cycling, start out with using only your
preferred good user agent string. Don't leave the user agent header unset.
Don't default to using the user agent string set by the HTTP client
library you're using. Don't impersonate a known user agent.

If you do encounter cases where your application's requests are being
denied due to the user agent, try to determine if you are being
precisely targeted before modifying or cycling. An application may
genuinely not want to speak to you.

### Accept-Encoding precision

The [Accept-Encoding](http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.3) request header informs the HTTP application
handling the request of the types of content encoding that your application is
able to understand.

For example, if you were to use `Accept-Encoding: gzip, deflate`
in your request, the responding application may opt to return a gzipped
response instead of a plain text response.

You might assume that when a request lacks the Accept-Encoding header
the responding application will default to a plain text response.

On this matter, [RFC2616 section 14.3](http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.3) says:

> If no Accept-Encoding field is present in a request, the server MAY assume that the client will accept any content coding.

This means that if your request lacks a Accept-Encoding header, the responding
server can opt to encode the response however it chooses.

For the best chance of receiving a response that your application is able
to decode, set a precise Accept-Encoding header.

Better still, use `Accept-Encoding: gzip, deflate`:

- If you ask for compressed content, you may well remember
  to prepare yourself for it and make sure you're equipped
  to decode compressed content.
- This may inform other developers working on your application of
  the expected encoding in HTTP responses.

  Consider this like type hinting. It will help with the identification of,
  and fixing of, bugs.
- You will still receive compressed content even if you don't
  ask for it. Be ready.

If you're not ready for decoding the content of the response you
receive such that your application raises an exception or throws
an error, you can't really call that a reliable means of retrieving
a resource over HTTP.

### Content compression mismatches

The [Content-Encoding](http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.11)
response header informs your application of any additional encoding
that has been applied to the response body.

Or, in other words, it tells you how to decode the response body if it
can't be understood as-is.

If you were to send a request with the header `Accept-Encoding: gzip, deflate`,
you might get a response with a header `Content-Encoding: gzip`.
This tells your application that it needs to ungzip the response body
to get the content of the requested resource.

On the matter of the Content-Encoding header
[RFC2616 section 14.11](http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.11) says:

> When present, its value indicates what additional content codings have been applied to the entity-body, 
> and thus what decoding mechanisms must be applied in order to obtain the media-type referenced by the 
> Content-Type header field.

You'd be forgiven for assuming that the response content has been encoded
as stated by the Content-Encoding header. You'd also be
forgiven for assuming no additional encoding if there is no Content-Encoding
header.

You may find that:

- the response content has been encoded but lacks a Content-Encoding
  header to tell you how to decode
- the response has a Content-Encoding header but the response
  content is not encoded as stated by the header

You can't always trust the Content-Encoding header, and you can't always
trust that the response content has not been encoded beyond what is
expected given the content type.

For binary content types, such as images, audio or video, there's nothing
you can do.

For text-based content types, such as HTML or CSS, you can assume
the content is either <a href="https://en.wikipedia.org/wiki/Gzip">gzip-encoded</a>, <a href="https://en.wikipedia.org/wiki/DEFLATE">delfate-encoded</a> or unencoded
and extract the resource from the response body as follows:

- Assume gzip encoding and use a method such as PHP's [gzdecode()](http://www.php.net/manual/en/function.gzdecode.php).<br>
  Gzdecode() will raise an error if the content is not gzip-encoded.
  No error? Return the decoded content, otherwise ...
- Assume deflate encoding and use a method such as PHP's [gzdeflate()](http://www.php.net/manual/en/function.gzdeflate.php).<br>
  GZdeflate() will raise an error if the content is not delfate-encoded.
  No error? Return the decoded content, otherwise ...
- Return the response body as-is.

### Url encoding toggling

Some URL characters have special meanings. One such special character is
the question mark (?) which is used to denote the start of the query
portion of a URL.

[Percent-encoding](https://en.wikipedia.org/wiki/Percent-encoding)
is used to convey such characters literally in cases where the special
meaning is not what you want.

Percent-encoding a question mark as `%3F` allows it to be
treated literally. It won't be treated as being a special character that
denotes that start of the query portion of a URL.

If I wanted to send a query pair to example.com with a key of "?foo" and
a value of "bar" I could use the URL `http://example.com/?%3Ffoo=bar`.
The question mark at the start of the query pair key is percent-encoded
and won't be treated as having a special meaning.

This example URL will be presented in the Chrome address bar
as `http://example.com/??foo=bar` as this makes more sense
to people. The second question mark will be percent-encoded behind the
scenes.

The [Guzzle HTTP client library](https://github.com/guzzle/guzzle)
applies similar behind-the-scenes percent-encoding such that you don't
need to correctly-encode URLs in your application when making requests.

Here's the fun part: some HTTP applications are weird and will not
respond as expected if some special characters that you really thought
should be percent-encoded are percent-encoded.

You will encounter cases where `http://example.com/??foo=bar`
always returns 200 OK and `http://example.com/?%3Ffoo=bar` always
returns 404 Not Found.

You will encounter cases where `http://example.com/??foo=bar`
returns 200 OK and `http://example.com/?%3Ffoo=bar` does
not *right now* due to a bug but may work again at a later time.

You will encounter cases where the HTTP application handling your request
doesn't conform to the relevant RFCs and does not understand a request
when special characters are percent-encoded.

The solution: retry, modifying the request URL to decode any percent-encoded
characters. There will be some cases where a correct percent-encoded
URL returns 404 Not Found and the equivalent decoded URL returns 200 OK.

I would not believe this had I not encountered it.

### HTTP method toggling

In most cases you need to perform a specific HTTP method against
a specific URL to get a specific response.

A GET request against a given
URL will retrieve a resource. A POST request against the same URL is not
guaranteed to retrieve any resource let alone the same resource.

In some cases the HTTP application handling your request will not
respond well for the HTTP method you chose as being the most appropriate
but will respond well for an equivalent method.

If the purpose of your request can be satisfied with an equivalent HTTP
method, retrying with a different method may work.

The only methods I can think of that could be considered equivalent
with respect to what you are trying to achieve are HEAD and GET.

In the words of [RFC2616 section 9.4](http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9.4):

> The HEAD method is identical to GET except that the server MUST NOT return a message-body in the response.

If you only want the headers associated with a resource and not the full resource, a HEAD request seems the
most sensible option. After all, if the HEAD request isn't supported by the application to which
your request is sent, it will return a [405 Method Not Allowed](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.6)
or [501 Not Implemented](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.5.2) response
and you can try again with a GET request.

Sadly not all HTTP applications respond to a HEAD request in a manner
equivalent to how they might respond to a GET request:

- some applications respond with 404 Not Found to a HEAD request
  ([Stack Overflow](http://stackoverflow.com/)> did so around 9 October 2013, it doesn't at the time of writing)
- some applications respond with nothing, eventually resulting
  in a timeout ([Myspace](https://myspace.com/) ... tsk tsk ... you still do this)

If you need to perform HEAD requests against *arbitrary* URLs
and you want to be able to reliably retrieve resource headers, don't.
Alway use a GET request. Responses to HEAD requests on arbitrary URLs are neither
reliable nor predictable.

### Anything to add?

The original title I prepared for this post was *The Complete Guide
To Reliable HTTP Resource Retrieval In Applications*.

I realised that despite it being the most complete guide I have, it
will surely be lacking in some way.

What other approaches are you aware of that can be used to increase
the reliability of HTTP resource retrieval?
