---
layout: default
title: "Improving CSS Validation: The Need for Control Over The CSS Validator"
date: 2012-12-14 11:00
author:
    name: Jon Cram
    url: https://github.com/webignition
excerpt_separator: <!--more-->
---

### The need for CSS validation options (controlling the validator)

I've recently been adding some options to CSS validation tests to make the
tests more useful. Or, depending on your perspective, to make CSS validation
useful where it previously was not.

Across a short series of blog posts, I'd like to look now at why CSS
validation options are needed, the range of  options I considered, where I
got the options from and how I decided on which of these to implement.

<!--more-->

This time I shall look at the need for CSS validation options to turn
CSS validation output into something that's of much greater value.

CSS validation options are essential. Not  merely useful or a nice-to-have
feature. They're essential. Without any control over the CSS validator,
the default output has very little value.

The core purpose of Simply Testable is to automate away common, generic
front end web testing aspects allowing you to focus on those aspects of
testing that are specific to you.

If the output of such automated tests is a pain for you to process you're
not really gaining much if anything. That's where we are with CSS validation.

### CSS validation pains

You're likely to link to third-party CSS resources such as [jQuery UI](https://jqueryui.com/) themes
or the [Twitter Bootstrap framework](http://twitter.github.com/bootstrap/). Perhaps you'll host copies of these
yourself, however many of you will link to those provided by common content
delivery networks such as [Google's Hosted Libraries](https://developers.google.com/speed/libraries/) or
[cdnjs](http://cdnjs.com/).

What you don't care about is the validity of the CSS supplied by popular
third-party libraries.

Invalid rules in Twitter Bootstrap's CSS are probably present for a very good
reason. You can have invalid CSS that does not break anything.

You could be using vendor extensions to take advantage in specific browsers
of upcoming CSS features yet to be formally specified. CSS allows for
vendor extensions in this manner, however the CSS validator raises such issues as either
warnings or errors.

Often you don't care about vendor extension issues and
the presence of vendor extension errors in validation output distracts you
from matters that are actually important.

### Focusing on what matters to you

CSS validity is not an absolute requirement. Invalid CSS does not
implicitly mean that there is an error that must be addressed.

CSS rules that are not understood by a CSS processor will be ignored.
If some CSS is invalid the world will not end but you might find some
presentational aspects are not as you expect.

The importance of examining CSS validity lies in being able to ensure
that the CSS you write yourself is correct as far as you intended and to
ensure that any unusual behaviour in a given browser is due to that browser
being odd and not due to your potentially invalid CSS making the browser
appear to behave oddly.

We need to be able to exert control over CSS validation to ignore those
aspects of CSS about which we don't care such that we can focus on
those aspects that actually matter.

In the next in this series I'll look at the validation options I considered
and what I chose to implement.
