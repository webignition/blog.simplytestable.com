---
title: "CSS Validator Improvements Overview"
author: joncram
date: 2019-02-20 16:00
excerpt_separator: <!--more-->
---

Today I finished deploying to production some excellent CSS validation improvements:

- [updated to the latest W3C CSS validator](/css-validator-improvements-overview/#updated-to-the-latest-w3c-css-validator)
- [validation of stylesheets in IE conditional comments](/css-validator-improvements-overview/#validation-of-stylesheets-in-ie-conditional-comments)
- [improved CSS validation robustness](/css-validator-improvements-overview/#improved-css-validation-robustness)

<!--more-->

### Updated to the Latest W3C CSS Validator

I've updated to the latest version of the W3C CSS validator. The version we were running was, sadly, a couple of years
behind the latest version.

That's all fixed now and matters such as relatively-new CSS properties previously reported as errors are now
recognised as valid CSS.

In addition, I've streamlined a little the process of installing the latest W3C CSS validator in production and
this will allow me to update to the latest version more easily in the future.

### Validation of Stylesheets in IE Conditional Comments

Links to stylesheets can be within IE conditional comments. The contents of such comment blocks are ignored by
the W3C CSS validator.

Comments are comments and they should be ignored by anything that reads HTML. Unless you consider IE conditional 
comments and the ways in which they're used to conditionally serve additional stylesheets to specific versions of IE.

We now check a page for IE conditional comments and [locate within the conditional comments any stylesheet links](/validating-stylesheets-within-ie-conditional-comments/)
and pass those over to the CSS validator to ensure all linked CSS is checked.

### Improved CSS Validation Robustness

In validating the CSS for a given web page, the W3C CSS validator needs to:

- identify CSS blocks within a web page
- identify linked CSS resources within a web page
- retrieve linked CSS resources for validation
- validate all of the discovered CSS and return a nice list of errors and warnings

If the W3C CSS validator runs into problems identifying and retrieving linked CSS resources there's nothing we can do.

What we can do is handle the identification and retrieval of linked CSS resources ourselves. And so that is what we did.

By identifying linked CSS resources ourselves, we can find stylesheets hidden within IE conditional comments. By 
retrieving linked CSS resources ourselves, we can employ a variety of measures to handle failure cases.

We now leave the W3C CSS validator to do what it does best: actual validation of CSS. We retrieve linked CSS resources 
directly and pass local copies to the validator. This removes a whole class of problems.
