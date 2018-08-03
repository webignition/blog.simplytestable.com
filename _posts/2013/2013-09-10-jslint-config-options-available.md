---
layout: default
title: "JSLint Config Options Available"
author: joncram
illustration:
    url: https://i.imgur.com/Doiq5uA.png
    style:
        height: 280px
excerpt_separator: <!--more-->
---

### Preamble

This wins the prize for being a long time coming.

I revealed in [newsletter #21](https://us5.campaign-archive1.com/?u=ac75e33d993d2b502e333ddd0&amp;id=678610272a),
back in mid-December last year, that the option to run site-wide
JavaScript static analysis tests with JSLint had been released to all.

<!--more-->

I mentioned at the time that I'd be adding relevant features to allow
you to control how pedantic JSLint behaves for you.

The last mention I can find of me saying that this would be added is in
[newsletter #25](https://us5.campaign-archive1.com/?u=ac75e33d993d2b502e333ddd0&amp;id=58dd65f9c4)
back in the middle of January, about 17 Internet years ago.

Since then I had to deal with a [data apocalypse](/down-for-emergency-maintenance/),
the need to put in a [workable data recovery strategy](/data-recovery-strategy/),
a range of minor bug fixes and the [addition of premium plans](/premium-plans-launched-and-why-they-exist/) and amidst all
this the changes to let you control JSLint configuration options settled
under a layer or two of dust.

Last week I dusted off the relevant development branch and set to
completing the work. And completed it. And recently released it.

### JSLint's Default Level of Precision Is Not For Everyone

JSLint checks given JavaScript against
a set of coding conventions and best practices as set down by
[Douglas Crockford](https://en.wikipedia.org/wiki/Douglas_Crockford).

Some quality factors for which it checks will help you, such as warning
about missing semi-colons which are technically optional in JavaScript
but which can cause problems when [automatic semicolon insertion](http://stackoverflow.com/a/2846298/5343) kicks in.

Other quality factors for which it checks will likely annoy you, such as
preferring spaces over tabs and requiring a 4-space indentation level.

JSLint can easily be seen as pedantic.

Whilst it could be argued that if written from scratch your JavaScript
will reach an optimal level of maintainability, readability and
not-going-to-explode-in-IE-ability if you stick to every rule JSLint
holds dear, this is often impractical in real projects.

Your project may require the adherence to coding standards not in line
with what JSLint desires, you may be dealing with legacy code that
works (or that you <em>think</em> works) and that you don't want to re-format
just because JSLint dislikes it, or you simply may be happy to ignore
certain quality factors so that you can focus on others you consider
more immediately relevant.

JSLint's default level of precision is not for everyone, and that's
why we've just introduced options to configure JSLint to suit your
needs.

### Find Issues You Care About; Ignore The Rest

With JSLint being so very detailed in the various code quality factors
it checks, the issues about which you care can be easily lost
amidst the many issues that are not immediately relevant or important
to you.

When starting a new [full-site or single-url test](https://gears.simplytestable.com/),
you can now expand  the JavaScript static analysis options to reveal the JSLint config
options available to you.

You'll find an option to warn you about the use of `eval` and
this is enabled by default due to strong security concerns surrounding
the execution of arbitrary code.

You'll also find an option to warn you about &quot;messy&quot;
whitespace and this is disabled by default as it is not immediately
harmful or dangerous.

There are 21 on/off options to choose from. We've disabled about half
by default which results in more approachable test results than was
previously the case when none of the options were disabled.

You can enable or disable warnings for a range of issues as you see fit,
set the maximum number of errors to tolerate (the default is 50), set the maximum allowed
line length (the default is 256), set the expected intentation level
(the default is 4) and provide a set of predefined variables (such as variables
that may be inherited from other scripts).

You can now, in other words, more easily focus on matters that are
more important and more relevant right now and ignore matters that you
know can be safely ignored.
