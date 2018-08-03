---
layout: default
title: "Opensource Libraries We've Created and How We Use Them (Part One: URL Handling)"
short_title: "Opensource Libs We've Created and How We Use Them (URL Handling)"
author: joncram
---
    
I created some libraries for dealing with certain matters that would be common
across the Simply Testable service.

Such libraries address generic matters that should be useful to others. They
have been open-sourced under an MIT license from day one.

As well as being open source, those featured here are (fairly well) covered
by unit tests, are registered with the [Travis CI build platform](https://travis-ci.org/)
\- so you can see that they work (or are broken!) \- and are available
in the [Packagist](https://packagist.org/) PHP package repository
for straightforward inclusion in projects using the [Composer dependency manager](https://getcomposer.org/).

I've been using and improving many of these libraries on a daily basis and
thought I'd cover some of the most useful ones.

In part one of a series of posts, I'll look at what we've
created and use for handling URLs.
    

### URL Handling

<ul class="repository-list">
    <li class="repository-list-item">
        <i class="fab fa-github repository-list-icon"></i>
        <a href="https://github.com/webignition/url">webignition/url</a>
        <a class="build-status" href="http://travis-ci.org/webignition/url"><img src="https://secure.travis-ci.org/webignition/url.png?branch=master" /></a>
    </li>
    <li class="repository-list-item">
        <i class="fab fa-github repository-list-icon"></i>
        <a href="https://github.com/webignition/absolute-url-deriver">webignition/absolute-url-deriver</a>
        <a class="build-status" href="http://travis-ci.org/webignition/absolute-url-deriver"><img src="https://secure.travis-ci.org/webignition/absolute-url-deriver.png?branch=master" /></a>
    </li>
</ul>

A lot of URL handling goes on here. We need to find unique collections of URLs
in web pages, we need to GET data from URLs and we need to figure out the
correct absolute URL from a given relative URL.

Our [URL library](https://github.com/webignition/url) handles the modelling, parsing
and normalisation of URLs.
    
### Parsing

Parsing a URL into its component parts is essential for the processes of
both normalising a URL and forming a full, absolute URL from a given
relative URL.

You'd be forgiven, from reading its description, that PHP's [`parse_url`](http://php.net/manual/en/function.parse-url.php)
pretty much covers URL parsing:
        
> This function parses a URL and returns an associative array containing any of
> the various components of the URL that are present.
> 
> This function is not meant to validate the given URL, it only breaks it
> up into the above listed parts. Partial URLs are also accepted, parse_url()
> tries its best to parse them correctly.
    
Try parsing some common classes of URL, such as relative (<code>path/to/index.html</code>), root-relative
(<code>/path/to/index.html</code>) and protocol-relative (<code>//example.com/path/to/index.html</code>);
what PHP provides as standard doesn't quite hold up.    
    
Our URL library handles this for us:
    
{: .language-php}

    use webignition\Url\Url;
    
    $url = new Url('https://github.com/webignition/url/');
    $url->getScheme(); // returns 'https'
    $url->getHost();   // returns 'github'
    $url->getPath();   // returns '/webignition/url/'
    
    $url = new Url('/webignition/url/');
    $url->hasScheme(); // returns FALSE
    $url->hasHost();   // returns FALSE
    $url->getPath();   // returns '/webignition/url/'
    
    $url = new Url();
    $url->setHost('github.com');
    $url->setPath('/webignition/url/');
    (string)$url;      // returns '//github.com/webignition/url'


### Normalisation
   
Normalisation is a crucial feature for us. We often need to see if two URLs
are equivalent without the expense of an HTTP request to compare resources
themselves.

For example, a web page containing what appears to be two links, `http://Example.com/`
and `http://example.com`, is actually a page with one link repeated \- the host name
in a URL is case-insensitive and so these two URLs are identical.

Other aspects of normalisation, such as decoding characters that don't need
to be encoded and collapsing dot segments (`/../` and `/./`),
ensure that string-based URL comparison is as accurate as possible.
    
{: .language-php}

    use webignition\NormalisedUrl\NormalisedUrl;
    
    $url = new NormalisedUrl('https://githUB.com/webignition/../webignition/./url/');
    (string)$url; // returns 'https://github.com/webignition/url/'
    
    $url = new NormalisedUrl('http://example.com:80');
    (string)$url; // returns 'http://example.com/'
    
    $url = new NormalisedUrl('http://example.com/?a=1&amp;c=3&amp;b=2');
    (string)$url;  // returns 'http://example.com/?a=1&amp;b=2&amp;c=3';


### Absolute URL Deriving
    
Absolute URL deriving is another task we do all the time.

The URL of a link in a web page does not need to be totally complete, it
can be presented either relative to where you are at the moment or relative
to the root of the site. It can also be presented independently of the protocol
currently being used.

We crawl a web site to find a collection of all unique URLs for that site.
For those URLs to be useful later when passed to another process to carry
out various tests, the URLs extracted from a given web page need to be
totally complete. Relative URLs are not ok as later on we won't know what
they're relative *to*.

You'll periodically encounter HTTP 301 and 302 responses; these are redirects
telling the client (such as a browser) to look elsewhere for the requested
resource.

The 'look elsewhere' part is determined by the `Location` header
in the HTTP response.

The [relevant HTTP specification](http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.30)
clearly states that the redirect location is an absolute URL. Nevertheless,
some applications return relative URLs in 301 and 302 <code>Location</code>
header values, so we need to be able to transform these also into absolute
URLs.

Our simple [absolute URL deriving](https://github.com/webignition/absolute-url-deriver) library handles these tasks:
    
{: .language-php}

    use webignition\AbsoluteUrlDeriver\AbsoluteUrlDeriver;
    
    $deriver = new AbsoluteUrlDeriver(
        '/index.html',
        'http://example.com'
    );
    (string)$deriver->getAbsoluteUrl(); // returns 'http://example.com/index.html'
    
    
    $deriver = new AbsoluteUrlDeriver(
        '/server.php?param1=value1',
        'http://www.example.com/pathOne/pathTwo'
    );
    (string)$deriver->getAbsoluteUrl(); // returns 'http://www.example.com/server.php?param1=value1'

