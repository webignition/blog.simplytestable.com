---
title: "Custom Cookie Support (Testing User-Specific Content and Features)"
author: joncram
---
    
You can now specify cookies to be set on all HTTP requests made whilst
running your tests.

If the cookie information you specify identifies a given user, the site
or page you are testing will be tested as if you are signed in as that user.

If the cookie information you specify enables a feature not available
to everyone, the site or page you are testing will be tested with that
feature enabled.

This post explains [how you can do that](#specifying-custom-cookies),
[when this is useful](#uses-cookie-based-authentication-user-specific-content-) (hint: cookie-based authentication
and user-specific content/features) and [when the cookies you specify will be used](#when-custom-cookies-are-set)
 (hint 1: not for every request, hint 2: security).

### Specifying Custom Cookies

<img class="img-fluid" src="https://i.imgur.com/ADXGtDZ.png">

Immediately below the form to start a new test is a new option named
'custom cookies' (in grey in the centre below the large input field).

You'll see that this option is shown as being not enabled as no cookies
have yet been set.

Select 'change' next to the custom cookies option to open the custom
cookies dialog box. For each cookie to be set, you will need to know
the name of the cookie and the value you need it to take.

<img class="img-fluid" src="https://i.imgur.com/YYEYy7C.png">

Enter however many cookies are needed for the site being tested and
select the done button. That's it.

### Uses: Cookie-Based Authentication, User-Specific Content, ...

Cookies are commonly used as a means of user identification for sites
that offer user-specific content or features.

You visit a site, sign in and an identification cookie is set. This
identification cookie is sent on subsequent requests to tell the site
who you are.

This covers the majority of sites where you first have to sign in before
being able to carry out certain tasks or where you first have to sign in
before seeing content specific to you. Facebook, Twitter, Amazon, Stack
Overflow, almost any Internet forum or discussion site.

Setting custom cookies on HTTP requests made whilst running your tests
allows you to:

- test pages when signed in as different users (or as no-one)
- test pages with "hidden" features enabled (before enabling
  such feature for everyone)
- test how your site handles cases where identification cookies
  are not set or are intentionally modified

### When Custom Cookies Are Set

The custom cookies you specify are not set for every single request.

This is ok as that's how the web works - cookies set on your computer
by Facebook are not sent to Twitter and vice-versa. Setting all cookies
on all requests would be very insecure.

Custom cookies are set on requests where the domain in the request URL matches
the domain of the cookie (as set out in [RFC6265 section 5.1.3](https://tools.ietf.org/html/rfc6265#section-5.1.3)).

This leads to the question of what value the cookie domain takes, as you'll
see from the above screenshots that you can set the cookie name and value
only.

We set the cookie domain automatically as the full <em>registerable domain</em>
of the site being tested, that is the domain one level down from the
<a href="https://publicsuffix.org/">public suffix</a>.

An example: the domains <em>blog.simplytestable.com</em>, <em>gears.simplytestable.com</em>,
<em>www.simplytestable.com</em> and <em>simplytestable.com</em> all have the same
registerable domain of <em>simplytestable.com</em> and would result in the cookie
domain being set to <em>.simplytestable.com</em> (note the leading dot).

You might be wondering why this really matters. After all, if you're
running a test against <em>blog.simplytestable.com</em>, aren't
all requests going to be against that domain? The short answer is no.

CSS validation tests will retrieve and test linked CSS resources. Such
resources may come from CDNs or other external sources to which you don't want to expose your
custom cookies.

Similar concepts apply to JavaScript static analysis tests.

A link integrity test will test all links in a given page. That covers
links in text to other pages and other sites and links to external resources
such as images, CSS and JavaScript. Many of these requests may be to
domains that don't match the page being tested.

