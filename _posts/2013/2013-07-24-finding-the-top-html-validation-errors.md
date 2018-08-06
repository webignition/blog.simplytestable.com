---
title: "Finding the Top HTML Validation Errors"
date: 2013-07-24 12:00
author: joncram
---

### Introduction

If you're looking to produce quality web pages, validating
your HTML is just the first step. You must also be able to understand
the HTML validation errors you encounter and be able to fix them (if required).

With this in mind, I've been scouring the Simply Testable HTML validation
results looking for the most common errors with the aim of
providing an explanation and possible solution for each.

To do this I need to find the top HTML validation errors.

Sounds easy, right? That should take just an hour or so, right?

I started working on this problem a week ago and am still working on it.
Turns out it's a less trivial task than you'd think.

### It Appears Easy

I have a collection of about 1.8 million HTML validation errors
found by testing about 110,000 URLs across about 2,600 distinct web sites.

All I have to do is go through this list of HTML validation errors
and count the number of occurrences of each distinct error and then
sort what I find by the number of occurrences.

This indeed does take just a few minutes and gets you something like this:

<table class="table table-pre top-html-validation-errors">
    <thead>
    <tr>
        <th>Count</th>
        <th>Error Message</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td>253125</td>
        <td><pre>reference to entity "order" for which no system identifier could be generated</pre></td>
    </tr>
    <tr>
        <td>88505</td>
        <td><pre>document type does not allow element "script" here; missing one of "dt", "dd" start-tag</pre></td>
    </tr>
    <tr>
        <td>71429</td>
        <td><pre>reference to entity "mode" for which no system identifier could be generated</pre></td>
    </tr>
    <tr>
        <td>69638</td>
        <td><pre>& did not start a character reference. (& probably should have been escaped as &amp;.)</pre></td>
    </tr>
    <tr>
        <td>59515</td>
        <td><pre>end tag for "area" omitted, but OMITTAG NO was specified</pre></td>
    </tr>
    <tr>
        <td>39298</td>
        <td><pre>required attribute "type" not specified</pre></td>
    </tr>
    <tr>
        <td>32609</td>
        <td><pre>An img element must have an alt attribute, except under certain conditions. For details, consult guidance on providing text alternatives for images.</pre></td>
    </tr>
    <tr>
        <td>31310</td>
        <td><pre>Attribute rel not allowed on element img at this point.</pre></td>
    </tr>
    <tr>
        <td>25648</td>
        <td><pre>end tag for "img" omitted, but OMITTAG NO was specified</pre></td>
    </tr>
    <tr>
        <td>24548</td>
        <td><pre>required attribute "alt" not specified </pre></td>
    </tr>
    </tbody>
</table>

This is great for finding the most commonly-occurring *specific* HTML
validation errors but we can easily see that the results
are not as useful as they could be.

Take a look at the above list and see if any of the errors seem similar
to others. Go on, take a minute and have a look. I'll go and make a cup of coffee.

...

Right, let's continue.

### Some Of These Errors Look A Lot Like The Others

The error 'reference to entity "&lt;something&gt;" for which no system identifier could be generated'
can be seen twice, as can the errors "&lt;something&gt;" not specified' and
'end tag for "&lt;something&gt;" omitted, but OMITTAG NO was specified'.

For the 10 most common errors, there are only 7 distinct types of errors.

Whilst there are many, many, many *specific* HTML validation errors,
there are not so many *types* of errors.

If I'm looking to write a brief description of, and possible solution for,
a HTML validation error, I'd rather not do so for a specific error. This
would be helpful to people encountering that specific error but might
not be obviously useful to others encountering a similar error.

Put another way, what is more useful? A web page that helps you
with 'required attribute "alt" not specified' or a web page that helps
you with 'required attribute "&lt;anything&gt;" not specified?

Put another way again, what's more interesting to examine? The
most common specific errors that occur, or the most common types of errors
that tend to happen?

If we look at specific errors only, we can see from the most commonly-occurring error
that *&amp;order* is often incorrectly used  instead
of the correct *&amp;amp;order*.

If we look at the types of error that occur, we might be able to see
that incorrect entity references are the most common type of mistake
that is made.

Or maybe not. Maybe failing to close an element
is the most frequent misdemeanour.

We need to apply some normalisation to these errors.

### Normalising HTML Validation Errors

Whereas 'required attribute "alt" not specified' and 'required attribute
"type" not specified' are *specific* errors, both
can be normalised to 'required attribute 'X' not specified', as they're
both the same common error with different values for X.

We just need to normalise the errors and total up the number of occurrences
of each normal form.

As an aside, if you write software and your team leader, manager or boss
starts off by saying "We just need to &hellip;" or "All we have to do is &hellip;",
there's a good chance they're not fully appreciating the complexity
of what they're asking.

Normalising HTML validation errors *consistently* and *correctly*
is such a non-trivial task.

Whilst there is a finite and relatively small set of normal forms, and
whilst each and every HTML validation error you encounter will fit neatly
into one of these forms, the task of doing so is not as a straightforward
as it might seem.

Why? Well, we're not dealing only with nice clean textbook error messages.
Some errors are nice and clean. But due to the very nature of what we're
dealing with, some errors arise from wonderfully convoluted, broken
and messed up HTML.

The majority of the HTML validation error messages you encounter will be
clean and will easily normalise. A small but significant subset will
be close to jibberish in ways you cannot imagine.

Creating something to normalise a collection of clean errors is trivial.
Creating something to normalise a collection of both clean and messy
errors is not so.

And this is why it takes a week instead of a few hours. But the results
are worth it.

### Let's Look At Common Normalised HTML Validation Errors

<table class="table table-pre top-html-validation-errors">
    <thead>
    <tr>
        <th>Count</th>
        <th>Normalised Error Message</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td>540626</td>
        <td><pre>reference to entity "%0" for which no system identifier could be generated</pre></td>
    </tr>
    <tr>
        <td>178162</td>
        <td><pre>general entity "%0" not defined and no default entity</pre></td>
    </tr>
    <tr>
        <td>133839</td>
        <td><pre>end tag for "%0" omitted, but OMITTAG NO was specified</pre></td>
    </tr>
    <tr>
        <td>129422</td>
        <td><pre>document type does not allow element "%0" here; missing one of %1 start-tag</pre></td>
    </tr>
    <tr>
        <td>94746</td>
        <td><pre>Attribute %0 not allowed on element %1 at this point.</pre></td>
    </tr>
    <tr>
        <td>92996</td>
        <td><pre>there is no attribute "%0"</pre></td>
    </tr>
    <tr>
        <td>81740</td>
        <td><pre>required attribute "%0" not specified</pre></td>
    </tr>
    <tr>
        <td>69638</td>
        <td><pre>& did not start a character reference. (& probably should have been escaped as &amp;.)</pre></td>
    </tr>
    <tr>
        <td>67716</td>
        <td><pre>Element %0 not allowed as child of element %1 in this context. (Suppressing further errors from this subtree.)</pre></td>
    </tr>
    <tr>
        <td>54368</td>
        <td><pre>Bad value %0 for attribute %1 on element %2: %3   </pre></td>
    </tr>
    </tbody>
</table>

We're looking now not at the specific errors that most commonly
occur but the types of error that most commonly occur.

We can see, from the top two most common types of error, that
entity references are a popular concept to get wrong.

Due to the fact that the ampersand (&amp;) has a special meaning in HTML
(it should not be treated literally) and due to the fact that the ampersand
is used to separate query string parameters (?name=jon&amp;friend=cat),
this type of error is begging to occur.

We can also easily see the most common ways in which HTML is written,
or generated, incorrectly:

- element end tags are forgotten when they should not be
- elements are put in places they don't strictly belong
- element attributes are used in the wrong places
- non-existent attributes are used
- required attributes are forgotten about
- ampersands are used incorrectly

This is hardly news if you've worked with the web for any significant
length of time.

What is news is that this is not the same story as is told by an examination
of the most common specific messages.

### Epilogue

In practice, neither statistics regarding the most common specific errors
nor statistics regarding the most common types of errors are ideal on their
own.

Common types of errors are useful for identifying the areas for which
error explanations would be most beneficial in general. They're also
useful as a checklist of items to consider when building HTML.

Specific errors are useful for identifying the precise explanations and
potential fixes that people may need.

I'm working now on a set of tools for generating help pages surrounding
both the most common types of error and the most common specific errors
so as to easily provide help where it is most needed.

