---
title: "Redirect Loops and Long Redirect Chains Detected"
author: joncram
illustration:
    id: redirect-loops-detected
    url: https://i.imgur.com/oQj0c.png
excerpt_separator: <!--more-->
---

Redirect loops are no fun. You visit a URL and it 301 redirects you to another URL
which 301 redirects you to another URL which then eventually redirects you back
to where you started at which point the fun begins again.

Redirect loops are no fun because you never get any content for such a URL,
you just get redirected indefinitely.

Long redirect chains are no fun.
You visit a URL and it 301 redirects you to another URL
which 301 redirects you to another URL which 301 redirects you to another
URL &hellip; and so on.

You don't get redirected back to a URL you have already visited whilst
riding this redirectercoaster so it's not a redirect loop.

You might eventually get redirected to a URL that doesn't redirect you any
longer. Or you might not. One cannot in advance tell.

<!--more-->

Redirect loops and long redirect chains are now detected when running a
full-site HTML validation test.

Redirect loops are spotted by looking at the URLs previously visited when
following a redirect chain. A redirect trying to take us to a URL we've
already visited is a clear sign of a redirect loop.

Any more than 10 redirects in a row will cause the test of a given URL to fail.
It's possible that the 11th direct is the one that takes us to a URL that no
longer redirects. Or maybe it won't. Maybe we'll get to some content after
102 redirects. Or maybe we won't.

You just can't tell in advance. At some point you have to give up. Stopping
after 10 redirects seems reasonable; you probably didn't intend for this
and it probably indicates a problem you need to address.

You now get a more clear error page for the results of a HTML validation
test that could not be performed due to a redirect issue. This also means
that some full-site HTML validation tests that were getting stuck will now finish.

[Production bug #002](/production-bug-002-spotted/) fixed.
