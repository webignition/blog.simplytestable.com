---
title: "Internationalised Domain Name (IDN) Support Improved"
date: 2012-12-27 15:30
author: joncram
---

Thanks to the feedback from [@igll](https://twitter.com/igll),
internationalised domain name (IDN) support has been improved.

I'll explain now what the problem was and how it has been fixed.

When discovering the URLs to test for a given site, the URLs that are discovered
are compared against the site that was submitted for testing so that we
only try to test URLs that are relevant.

Let's say you submit `http://example.com` for testing and we
find in the sitemap the two URLs `http://example.com/foo/` and
`http://foobar.com/bar/`. We'll compare the domain of the site
submitted for testing with the domain name in the URLs we find and discard
those that don't match. In this case, the second URL would be discarded.

We weren't correctly taking into consideration the two ways you can represent
an IDN.

Consider `http://econom.ía.com`. The character following
`econom.` is not the lowercase English vowel `i`,
it's a character that looks similar but which has an accent instead of a dot.

{: .accented-character-comparison}
*í* vs *i*. See? Good, back to the point.

You can present the above URL as `http://econom.ía.com`
or `http://econom.xn--a-iga.com`. In the latter, the character
that looks like an `i` but which is not is encoded as `xn--a-i`.

In fact, if you submit `http://econom.ía.com` for testing,
our system see this as you submitting `http://econom.xn--a-iga.com`
for testing as, behind the scenes, this is what computers really see.

When comparing discovered URLs with the site that was submitted for testing,
we weren't comparing things quite right. In some cases, we were asking: Does
`http://econom.ía.com/example` match the domain name
`http://econom.xn--a-iga.com`? If you compare them literally,
the answer is no. That's what we were doing.

If you were to submit `http://econom.xn--a-iga.com` for testing
and the sitemap contained a URL of `http://econom.ía.com/example`,
we would previously have discarded it as the domain names didn't match.

We now compare the domain names in URLs in an IDN-aware manner so that
such URLs are not discarded.
