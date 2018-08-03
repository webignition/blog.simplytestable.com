---
layout: default
title: "&lt;meta name=&quot;Content-Type&quot; ... &gt; is invalid"
date: 2012-09-12 14:00:00
author: joncram
---
    
In investigating [production bug #001](/production-bug-001-fixed/)
I noticed some web pages were trying to specify the character encoding
used but were doing so incorrectly.

The character encoding for any resource retrieved over HTTP can be specified
through the HTTP `Content-Type` header. This tells whatever
retrieves a resource, such as a web browser, how to understand and
interpet what it has received.


You can choose to override what character encoding information may be present
in the headers of an HTTP response by setting one of two `<meta>`
elements in the `<head>`. This is useful if you have
no control over the HTTP headers being returned and where those headers
are incorrect.

If you want to state that you are using `utf-8` as the character
encoding, you can opt for either `<meta charset="utf-8" />`
or `<meta http-equiv='Content-Type' content='Type=text/html; charset=utf-8'>`

Some web pages choose instead to go for `<meta name='Content-Type' content='Type=text/html; charset=utf-8'>`

It's quite an easy mistake to make but one that could badly impact how
your page renders in browsers.

Specify the character encoding incorrectly and it could be entirely up to a
browser to choose how to understand what any fancy characters mean.
Currency symbols such as &pound; and &euro; as well as accented characters
such as &acirc; could be rendered correctly or instead could be rendered
as a pair of out-of-place accented characters. You will control how such
characters appear.

Watch out for close-but-not-quite-right `meta` elements
in your HTML documents. It's an easy one to get wrong.
