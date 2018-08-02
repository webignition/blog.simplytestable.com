---
layout: default
title: "CSS Validation Local Path Reference Bug Fixed"
date: 2013-05-16 12:00
author:
    name: Jon Cram
    url: https://github.com/webignition
illustration:
    url: https://i.imgur.com/8JiYDAl.png
    style:
        height: 240px
---
    
When performing a [single-URL or full-site CSS validation](https://gears.simplytestable.com/), you can choose
to ignore CSS validation errors from chosen domains.

This is useful if you link to third-party CSS resources through a common
content delivery network; you can ignore CSS validation issues
for resources over which you have no control.

For each result collected from the CSS validator, the URL of the CSS
resource to which the result relates is checked. If the domain in the URL
is on the list of domains you have chosen to ignore the result will then
be ignored.

This process was recently failing for one specific URL being tested.

The URL of the stylesheet was very similar to the above illustration. Notice
anything wrong with the markup in the illustration?

Bonus points if you notice that the Content-Type meta element is present twice
but, no, that's not the answer I'm looking for.

"Someone is developing on Windows?", you guess. No, that's not it either.

The answer I'm looking for here is that the CSS resource uses a `file://`
URL to reference a file on the local file system.

Such a URL won't work on the Internet, which will likely adversely affect the given
page's appearance, but that's irrelevant to us as the markup is valid.

The problem is that a local `file://` URL contains no domain
(no hostname).

If, like us, you're checking the domain in a URL against a list of domains
that you want to ignore, you're might well run into problems if a given
URL doesn't contain a domain and if you'd not expected this to happen.

And that's exactly what happened and it's that exact case that I've just
fixed.

Feel free to now use valid but somewhat silly local URLs to reference
stylesheets. It's a bad idea if you want your page to work on the Internet
but at least it'll no longer break our CSS validation process.
