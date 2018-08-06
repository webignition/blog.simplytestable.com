---
title: "Improving CSS Validation: New CSS Validation Option Choices"
date: 2012-12-14 14:00
author: joncram
illustration:
    id: css-validation-options
    url: https://i.imgur.com/K4TB7.png
---

###  Discovering and deciding on CSS validation options

I've recently been adding some options to CSS validation tests to make the
tests more useful. Or, depending on your perspective, to make CSS validation
useful where it previously was not.

In a related previous post, I detailed the need for having [control over CSS validation](/improving-css-validation-the-need-for-control-over-css-validation/).

This time I shall look at the range of  options I considered, where I
got the options from and how I decided on which of these to implement.

In the next post, to be written when these changes are deployed live,
I'll explain the new CSS validation options and how they help.

###  W3C CSS validator options

The [W3C CSS validator](https://jigsaw.w3.org/css-validator/)
presents a set of options to choose from. If, like me, you're looking to
introduce some CSS validation options this seems like a good place
to start.

The W3C CSS validator presents four options:

- **Profile**: the CSS profile (colloquially *version*) to validate against
- **Medium**: the medium (think *@media*) for which the CSS is intended to be used
- **Warnings**: an option dealing with the extent by which warnings are reported
- **Vendor Extensions**: whether vendor extension issues are to be reported as warnings or errors

These options seem a good starting point.

Given that we're looking to add more value to CSS validation results,
let's see which of these options are essential, which can be discarded
and which can be improved upon.

*Profile* can be discarded. We're testing the web, so we don't
need to concern ourselves with SVG, mobile or TV profiles.

*Medium* can be discarded. We're testing the web, that's the 'screen'
medium.

*Warnings* presents options of 'All', 'Normal report', 'Most important'
and 'no warnings'.

This is too confusing. All warnings or no warnings make sense. Normal warnings
or most important warnings? There's no documentation to cover these choices
and even if there were the names of these options are still vague enough to
confuse when supported by documentation.

I'd rather stick to an option to include or exclude warnings and stop there.
This makes sense, this I can understand and this I can explain. It's simple.

*Vendor extensions*, or more specifically how to treat vendor
extension issues, is a good idea. You might not care too much about
these and as such it's a good idea to be able to de-prioritise these
to warnings instead of errors.

Sometimes you might not care at all about vendor extension issues, leading
me to add a third option to ignore vendor extension issues.

Out of the four options the W3C validator offers, we've selected variants
of two.

### Handling third-party CSS resources

Run https://github.com/webignition through the W3C CSS validator and marvel at the
689 errors from a minified version of Twitter Bootstrap 2.2.1.

I can't even easily see if there are errors in any CSS I've created myself
as the errors present in third-party CSS resource overwhelm the output.

There's lots of information I need to ignore. I trust that any invalid
rules in the Twitter Bootstrap framework are non-breaking.

But then perhaps sometimes I want to be sure I'm checking absolutely
everything just to be in the safe side.

It's common to include popular third-party CSS resources provided by
fast-responding content delivery networks.

It then makes sense to provide an option to ignore the CSS supplied from
common CDNs, specifically ajax.aspnetcdn.com, ajax.googleapis.com,
cdnjs.cloudflare.com, netdna.bootstrapcdn.com and static.nrelate.com.

You might also be linking to third-party CSS resources on other domains.
Providing a text area into which to list domains to ignore covers this.

### Finalised CSS Options

In trying to make CSS validation more useful, by means of making the
validator output more relevant to what you need to discover, I've
come up with four options to help you control the CSS validator more
effectively:

- **Handling warnings**: checkbox to ignore warnings
- **Vendor extension issues**: ignore, treat as warnings or treat as errors
- **Common CDN domains**: checkbox to ignore CSS from common CDN domains
- **Linked CSS domains to ignore**: text area into which you can list CSS-serving domains to ignore

You can see the current set of options that you will soon be able to choose
from when starting a new full-site test in the [associated illustration](/illustrations/css-validation-options/) for
this post.
