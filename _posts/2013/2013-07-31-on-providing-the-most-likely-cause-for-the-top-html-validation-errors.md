---
title: "On Providing the Most Likely Cause For the Top HTML Validation Errors"
date: 2013-07-31 12:00
author: joncram
---

### Introduction

I [wrote recently](/finding-the-top-html-validation-errors/) about how I'm scouring our databases to build
a collection of top HTML validation errors.

Now that [I have these to hand](http://help.simplytestable.com/errors/html-validation/index/),
I'm preparing an ever-growing collection of support documents to explain the various HTML validation errors
you'll encounter and to provide likely fixes.

I began this effort by carefully researching the common causes
for various errors, finding examples of occurrences of errors on
[Stack Overflow](http://stackoverflow.com/) and various
forums, and writing up likely fixes to these errors.

I soon realised I have the necessary data available
to me to follow a more scientific approach that is based less on
just experience, speculation or mystic beliefs regarding the whims of the
DOM and based more on good old evidence.

### Science to the Rescue

I have a collection of about 1.8 million HTML validation errors
found by testing about 110,000 URLs across about 2,600 distinct web sites.

This seems a sufficient set of data such that the question "What is the
most common cause for 'Document type does not allow element "li" here'?"
can be answered by finding all occurrences of this error and looking to see
what the actual cause was in each case.

This results in more accurate solutions than could otherwise be derived.

### An example: Document type does not allow element "li" here

Let's look at an example error: 'Document type does not allow element "li" here'.

This meaning of this error is quite clear if you are suitably familiar with
HTML. It is saying that a `<li>` element has been used
in a place it is not allowed.

We could generalise the solution to the error 'Document type does not allow element "X" here'
by saying that the given element has been used in a place it is not allowed.

Does knowing in what ways a `<li>` element is commonly
misplaced help in fixing such a problem?

I've just examined 20 occurrences of this specific error. In the majority
of cases, the `<li>` elements were correctly within
list elements but were wrapped by other elements that are not allowed
within list elements.

I can now say (assuming a large enough sample size) that the most common
misplacement of a `<li>` element is such as this:

    <ul>
        <a href="http://example.com"><li>Example</li?></a>
    </ul>

and that the correct form should be:

    <ul>
        <li><a href="http://example.com">Example</a></li?>
    </ul>

This is more beneficial and useful than simply knowning that your markup
has a `<li>` element in a place that it does not belong.

### Providing the Most Comprehensive Set of Solutions

With a collection of 1.8 million HTML validation error messages to draw from,
I have at my disposal all the information needed to build evidence-based
solutions to the most commonly-occurring HTML validation errors.

Instead of seeking popular opinion on the solutions to these errors,
or even asking the educated opinion of a expert in such matters,
I can rely on a straightforward, scientific, evidence-based approach.

Through this I'm able to build the most comprehensive set of solutions
to the HTML validation errors you encounter.

This is a nice situation to be in.
