---
layout: default
title: "Opensource Libraries We've Created and How We Use Them (Part Two Point Two: HTTP Testability)"
short_title: "Opensource Libraries We've Created and How We Use Them (Part 2.2)"
author:
    name: Jon Cram
    url: https://github.com/webignition
excerpt_separator: <!--more-->
---
    
I created some libraries for dealing with certain matters that would be common
across the Simply Testable service.

Such libraries address generic matters that should be useful to others. They
have been open-sourced under an MIT license from day one.

In [/opensource-libraries-weve-created-and-how-we-use-them-part-one-url-handling/](part one of this series),
I talked about what we use for handling URLs.
In [part two point one of this series](/opensource-libraries-weve-created-and-how-we-use-them-part-two-point-one-http-reliability/),
I talked about how we deal with many HTTP requests reliably.

<!--more-->
    
In part two point two, I look at how we unit test HTTP-based applications
whilst avoiding the ways in which HTTP can fail.
    
### Unit Testing HTTP-based Applications Without Unexpected HTTP Failure
<ul class="repository-list">
    <li>
        <i class="fab fa-github"></i>
        <a href="https://github.com/webignition/http-client">webignition/http-client</a>
        <a class="build-status" href="http://travis-ci.org/webignition/http-client"><img src="https://secure.travis-ci.org/webignition/http-client.png?branch=master" /></a>
    </li>
</ul>

In [&ldquo;HTTP Failures And What To Test For In HTTP Applications&rdquo;](/http-failures-and-what-to-test-for-in-http-applications/)
I introduced the means by which HTTP conversations can fail and the common
cases you need to cover to ensure your application is resilient:

- Invalid URL format
- DNS resolution failure
- Connection or transfer timeout

To be sure you deal correctly with these failure conditions, as well as
ensuring that you avoid such conditions when you're expecting code to
behave predictably during unit tests, you need a means of receiving
consistent responses or generating expected failure scenarios.
    
### Achieving Consistency in HTTP Conversations
    
If you want to consistently receive an expected successful HTTP response
for a given HTTP request you need to hard-code the desired response.
Similarly if you want to consistently encounter a predictable HTTP failure
condition for an HTTP request you need to hard-code the conditions for the
required failure to occur.

And you need for all of this to work in isolated, sandboxed test environments
such as Travis-CI. So no clusters of local web servers serving up fixed
responses to known requests. Indeed you can't even depend on there being
any other hosts at all.
    
### Mocking HTTP Conversations

We use the mocking feature of our [HTTP client library](https://github.com/webignition/http-client)
to ensure that code executing under unit tests receives consistent HTTP responses or
encounters consistent HTTP failure conditions.

The mock HTTP client is isolated from everything and is aware of nothing
unless told about it. It's not aware of the Internet and, by default,
is unable to find any resource requested of it.
    
```php
<?php
use webignition\Http\Mock\Client\Client as HttpClient;

$request = new \HttpRequest('https://blog.simplytestable.com/');

$httpClient = new HttpClient();

$response = $httpClient->getResponse($request);
print $response->getResponseCode(); // 404
```
    
If you need a `200 OK` accompanied by some meaningful
content, you need to tell the HTTP client in advance the response you
want back for a request:
    
```php
<?php
use webignition\Http\Mock\Client\Client as HttpClient;

$request = new \HttpRequest('https://blog.simplytestable.com/');

$httpClient = new HttpClient();
$httpClient->getRequestReponseList()->set(
    $request,
    new \HttpMessage("HTTP/1.1 200 Ok\n\nHello World!")
);

$response = $httpClient->getResponse($request);
print $response->getResponseCode(); // 200
print $response->getBody(); // Hello World!
```
    
This is great if you have a request object to hand and a response object
to match. If you're expecting a chain of `301` responses to be followed,
you're unable to control the automatic generation of requests to follow
such redirects.

If you know the essence of the request that will be made, you can tie in a
response to a known HTTP command:
    
```php
<?php
use webignition\Http\Mock\Client\Client as HttpClient;

$request = new \HttpRequest('https://blog.simplytestable.com/gets-301-response');

$httpClient = new HttpClient();
$httpClient->getCommandReponseList()->set(
    $request,
    new \HttpMessage("HTTP/1.1 301 Moved Permanently
                      Location: https://blog.simplytestable.com/destination")
);
$httpClient->getCommandResponseList()->set(
    "GET https://blog.simplytestable.com/destination",
    new \HttpMessage("HTTP/1.1 200 Ok\n\nHello Again!")
);

$response = $httpClient->getResponse($request);
print $response->getResponseCode(); // 200
print $response->getBody(); // Hello Again!
```
    
The [RequestResponseList](https://github.com/webignition/http-client/blob/master/src/webignition/Http/Mock/ResponseList/RequestResponseList.php)
lets you specify directly responses for `\HttpRequest` objects
that just so happen to be lying around. The [CommandResponseList](https://github.com/webignition/http-client/blob/master/src/webignition/Http/Mock/ResponseList/CommandResponseList.php)
lets you specify directly responses for HTTP commands you know are to be
issued.

This is great if you happen to have a HttpClient object to hand to
which you can feed responses for requests or HTTP commands known to happen.

When running unit tests you know the test data that is to be sent in
requests and you know the responses you want to receive back but without being
able to modify the application logic you can't tell the HttpClient
directly the responses to use.

The [StoredResponseList](https://github.com/webignition/http-client/blob/master/src/webignition/Http/Mock/ResponseList/StoredResponseList.php)
solves this.

You pass the StoredResponseList the path to HTTP message fixtures to be used.
Each fixture is the plain text of an `\HttpMessage` stored in a
file named the same as the corresponding request's hash.    
    
The request's what? The hash. It's a hash of a request, unique to a request and something
that fits comfortably into a filename.
    
```php
<?php
use webignition\Http\Mock\Client\Client as HttpClient;

$request = new \HttpRequest('https://blog.simplytestable.com/');

$httpClient = new HttpClient();
$httpClient->getStoredResponseList()->setFixturesPath(
    '/home/example/fixtures/cda711beab03b2677abd1b15ed4d1114'
);

$response = $httpClient->getResponse($request);
print $response->getResponseCode(); // 200
print $response->getBody(); // Hello World!
```
    
The file `/home/example/fixtures/cda711beab03b2677abd1b15ed4d1114`
contains:
    
```
HTTP/1.1 200 Ok

Hello World!
```
    
Guessing the right hash is tricky. When developing your tests you will
know the HTTP requests that will issued and can ask the mock client
to tell you where to store your fixtures:
    
```php
<?php
use webignition\Http\Mock\Client\Client as HttpClient;

$request = new \HttpRequest('https://blog.simplytestable.com/');

$httpClient = new HttpClient();
$httpClient->getStoredResponseList()->setFixturePath('/home/example/HttpResponses');
print $httpClient->getStoredResponseList()->getRequestFixturePath($request);
// /home/example/HttpResponses/cda711beab03b2677abd1b15ed4d1114
```

### Mocking Failure Conditions
    
We can return known responses to known requests but we also need things
to break in known ways.

The mock HTTP client simulates failed DNS lookups, with
simulated timeouts and simulated invalid URL cases to follow.

The [regular HTTP client](https://github.com/webignition/http-client/blob/master/src/webignition/Http/Client/Client.php)
throws a [CurlException](https://github.com/webignition/http-client/blob/master/src/webignition/Http/Client/CurlException.php)
if a response contains a CURL code of anything other than zero.

The mock HTTP client achieves the same by using the
[CurlExceptionFactory](https://github.com/webignition/http-client/blob/master/src/webignition/Http/Mock/Client/CurlExceptionFactory.php)
to throw pre-determined exceptions when requesting specified URLs.

The mock HTTP client defaults to knowing all hosts and will never
encounter a DNS lookup failure. This is what you want for the
majority of your unit tests.

You can tell the HTTP client that it knows no hosts, resulting
in DNS lookup failure exceptions for all requests. Or, slightly more
usefully, you can tell the client which hosts it knows, causing DNS lookup
failure exceptions to occur for all other hosts.
    
```php
<?php
use webignition\Http\Mock\Client\Client as HttpClient;

$request = new \HttpRequest('https://blog.simplytestable.com/');

$httpClient = new HttpClient();
$httpClient->setKnowsSpecifiedHostsOnly();
$httpClient->setKnownHost('example.com');

try {
    $response = $httpClient->getResponse($request);
} catch (CurlException $curlException) {
    // We'll end up here as the client can't lookup blog.simplytestable.com
}
```

### Tying This Into Testable HTTP Applications And Test Environments
    
You application code needs to be testable with no test-specific logic paths
and you need to be able to reach into your application code during unit
tests to fake HTTP conversations that would otherwise be very real.

I ensure all classes that need to make HTTP requests have a settable `httpClient`
property. If this is accessed before being set, it is set to a regular
HTTP client. It is then up to the test environment to set the `httpClient`
property to a mock HTTP client with specified fixture path before
and requests are made.

<a href="http://symfony.com/">Symfony</a> services make this very easy. A
`httpClient` service is defined and is injected into whichever
other services require it when they are instantiated. The test environment
uses [a test-specific service definition](https://github.com/webignition/app.simplytestable.com/blob/master/src/SimplyTestable/ApiBundle/Resources/config/services_test.yml)
which simply specifies that the `httpClient` service use the mock HTTP client
class.

So long as any class that has a `httpClient` property passes
this on to any service it makes use of that has a `setHttpClient()`
method, the real or mock HTTP client will get passed as far down into
the application as is needed.

The same application logic runs for all environments and knows nothing about,
and doesn't need to care about, how the HTTP client it possesses implements
the retrieval of responses for requests.

Application code can be unit tested quickly and reliably with no need to mess
about within the application internals to get this to work.
