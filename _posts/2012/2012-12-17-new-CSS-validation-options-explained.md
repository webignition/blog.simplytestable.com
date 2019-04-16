---
title: "CSS Validation Options Explained"
author: joncram
illustration:
    id: css-validation-options
    url: https://i.imgur.com/K4TB7.png
---

### New options for validating CSS

I recently wrote about how CSS validation needs to be
[improved to make it relevant](/improving-css-validation-the-need-for-control-over-css-validation/) 
to your work and [explained what options were to be introduced](/improving-css-validation-new-css-validation-option-choices/).

Now that these changes are live, I'd like to go over the options you now
have so that you can get the most benefit from validating your CSS
with Simply Testable.

### Summary of new CSS validation options

As you might now have read the previous posts on this subject, here are the
four new CSS validation options:

- **Ignore warnings**: whether to ignore CSS validator warnings, reporting only errors
- **Vendor extension issues**: whether to ignore validator issues regarding vendor extensions, report these as warnings or report these as errors
- **Ignore common CDN domains**: whether to ignore linked CSS resources from common content delivery networks
- **Ignore CSS from custom linked domains**: specify domains of linked CSS to ignore

### Ignoring Warnings

{: .inline-illustration}
<img src="https://i.imgur.com/PhSZ3.png" class="inline-illustration-image img-fluid" title="foo" />

The CSS validator can report not only errors relating to invalid CSS but
also warnings regarding CSS that is not invalid but which may indicate
that some attention is required.

For example, you may encounter a warning telling you that you have
defined the same background and text colour or you may encounter a warning
stating that a given rule has been defined more than once.

You might not want to see these warnings all the time, or you might be
happy with the CSS rules to which warnings relate and don't want these
warnings distracting you from finding errors about which you actually care.

Choosing to ignore warnings can help you focus on more important matters.

### Handling vendor extension issues

{: .inline-illustration}
![](https://i.imgur.com/sT6eS.png)

CSS specifications define a collection of properties (such as *background-color*
or *height*) that can be used.

Browser creators (or, more specifically, CSS processor creators) can make
use of properties specific to a given CSS processor allowing non-specified
properties to exist and be used.

This is useful in cases where draft specifications strongly hint at new
properties and vendors want to implement incomplete specifications to see
how they're handled in the real world.

A good example is the *border-radius* property. This is a property
introduced in CSS level 3 and first featured in a 
[http://www.w3.org/TR/2002/WD-css3-border-20021107/#the-border-radius](working draft of the CSS 3border module in 2002).
It currently features in a candidate recommendation of the CSS3 backgrounds and borders
module and is yet to be formally specified.

Nonetheless, you can make use of this CSS3 feature using *-moz-border-radius*
in FireFox and *-webkit-border-radius* in Chrome (or Safari).

Although the CSS specifications allow for vendor extensions, the CSS validator
is not happy with them and will report them as warnings or errors.

In addition to choosing whether to report such issues as warnings or errors,
we've added the option to ignore them entirely.

As before, being able to ignore vendor extension issues can help you focus
on errors and warnings that are likely much more relevant to you.

### Ignoring common CDN domains

{: .inline-illustration}
![](https://i.imgur.com/5FpQq.png)

If you link to Twitter Bootstrap or jQuery UI CSS resources, among other
popular third-party frameworks and libraries, you're likely linking to a
CSS resource supplied by a content delivery network (CDN) such as
[Google's Hosted Libraries](https://developers.google.com/speed/libraries/) or
[cdnjs](http://cdnjs.com/).

You probably trust common third-party CSS resources to know what they're
doing. If they contain invalid CSS it probably won't break anything.

You can choose to ignore CSS from common CDNs. This helps you focus on
errors present in your own CSS.

### Ignoring CSS from custom linked domains

{: .inline-illustration}
![](https://i.imgur.com/ETI9w.png)

This option works in partnership with ignoring CSS from common CDNs.

What if you're linking to third-party CSS resources that are not served
from common CDNs?

This option lets you list domains serving CSS that you want the validator
to ignore.
