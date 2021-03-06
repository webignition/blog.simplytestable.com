---
title: "CSS Validation For Password-Protected Sites (With Bonus CSS Retrieval Reliability)"
author: joncram
---
    
I've been working for the past few weeks on adding the ability to
run tests against password-protected sites.

Late last year I announced support for [HTML validation for password-protected sites](/html-validation-for-password-protected-sites).
 I recommend you read that previous post for a demonstration of the concept as a whole and for details on what types of password-protected
sites this covers (hint: HTTP basic and digest access only).

I announced in [yesterday's weekly newsletter](https://us5.campaign-archive1.com/?u=ac75e33d993d2b502e333ddd0&id=4d66e6f2f6)
that support for CSS validation of password-protected sites is now live.

This was brought about through the introduction of a [wrapper for the W3C CSS validator](https://github.com/webignition/css-validator-wrapper/)
to handle the retrieval of CSS resources.

I'd like to expand on this a little and detail two bonus side effects
that improve CSS retrieval reliability.

These relate to edge cases that you are ordinarily unlikely to encounter.
Given the number of web page tests we process, unlikely events occur quite often.

### A Bit About the CSS Validator Wrapper

If you give the W3C CSS validator the URL to a web page, the validator
will retrieve both page and all relevant CSS resources. This
is not ideal as this doesn't give any control over how CSS resources
are retrieved.

The CSS validator wrapper takes over the retrieval of CSS resources,
leaving the W3C CSS validator to carry out only the validation part
of the process.

Being in control of the retrieval of CSS resources allows us to
retrieve resources protected with HTTP authentication as we can supply
the relevant credentials when needed.

We can also apply various approaches to retrieving CSS resources
that are an improvement over the W3C CSS validator.


### HTTPS CSS Resources

The command-line W3C CSS validator is a Java application which depends
on the JVM when it comes to trusting SSL certificates and on the
Java code of the validator when it comes to accepting untrustable
(expired or self-signed) certificates.

The JVM certificate authority store can easily be outdated and updating the JVM CA store on
all relevant production servers is fiddly
at best and is something that requires manual action if you happen to be
lucky enough to spot that such action is required. Relying on the JVM
CA list is not practical.

Untrustable certificates are a different matter
entirely. From what I've seen it's pretty much hit and miss regarding
whether the W3C CSS validator will be able to retrieve a CSS resource
from a HTTPS URL that uses an untrustable certificate. Some untrustable
certificates are not a problem whereas others are. I've never had the
time to investigate beyond that.

Flat out refusing to talk to anything that provides an untrustable certificate
is a valid safe default but, from my perspective, the Simply Testable
system doesn't need to care.

Unless you want to create and maintain a fork of the W3C CSS
validator source and update the relevant Java source to act more leniently
towards untrustable certificates you're pretty much out of luck. There
is no command-line option that equates to "I don't care about SSL negotitation
peculiarities".

Issues related to retrieving HTTPS CSS resources are no longer.

### Redirect Loops

Consider [https://simplytestable.com/redirect-loop-test/](https://simplytestable.com/redirect-loop-test/).
It responds with a 301 redirect back to itself. It's one of the many URLs
we use for integration testing.

The online W3C CSS validator currently ends up 
[returning a 401 Unauthorised response](https://jigsaw.w3.org/css-validator/validator?uri=https%3A%2F%2Fsimplytestable.com%2Fredirect-loop-test%2F)
for this URL which is unexpected.

The command-line W3C CSS validator returns no validation results and instead
echos a Java exception:

    java -jar css-validator.jar -output ucn https://simplytestable.com/redirect-loop-test/
    {vextwarning=false, output=text, lang=en, warning=2, medium=all, profile=css3}
    java.net.ProtocolException: Server redirected too many times (5)
            at org.w3c.css.util.HTTPURL.getConnection(HTTPURL.java:200)
            at org.w3c.css.util.HTTPURL.getConnection(HTTPURL.java:276)
    ...

Neither response is particularly useful but at least the command-line
output can be parsed for its meaning to be understood.

The same types of response with no validation results tend to occur
where the given HTML URL works fine but one or more linked CSS
resources redirect in an unfriendly fashion. This is les useful
as there may be some retrievable CSS resources that could be validated
but which are ignored.

Retrieving in advance all resources that are to be validated we can
catch these cases and where possible provide validation results
for CSS resources that could be retrieved.

### Retrying Intermittent Failed HTTP Requests

Need to run CSS validation for a page that returns 200 OK
only 50% of the time and otherwise returns a variety of HTTP
server or client error codes?

Need to run CSS validation for a page where the TCP connection to
the your web server works only 50% of the time and otherwise
times out or drops out or fails in various ways?

Good news! Now you can in a way that works every time.
By retrieving directly the CSS resources
to be validated we can employ the techniques we already
use to retry when encountering various error cases.

Try testing [http://unreliable.simplytestable.com/?error=503&probability=0.8](http://unreliable.simplytestable.com/?error=503&probability=0.8)
with the W3C CSS validator and with us to see the difference.

### Summary

Not only can you now run CSS validation tests against sites or pages
protected with HTTP authentication, you can now more reliably get
meaningful results in cases where you'd previously just get an odd error.

You can now perform CSS validation tests against sites or pages that
redirect in unfavourable ways. In cases such as there being redirect loops
some resources can't be validated but if this happens you will at least
know.

You can now also perform CSS validation tests in cases where you
are serving CSS resources over HTTPS using either an untrustable
certificate or in any other way that could result in a SSL negotiation,
trust or transport issue.

If you're particularly brave, you can combine the two by testing a page
that contain CSS resources that redirect to untrustable HTTPS URLs. I'll
leave it as an exercise for the reader to find a case where that
happens.
