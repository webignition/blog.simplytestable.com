---
layout: default
title: "Solving 'Element &quot;Variable&quot;' Undefined'"
author:
    name: Jon Cram
    url: https://github.com/webignition
---

When preparing a documentation page to cover the generic
HTML validation error *Element &quot;X&quot; undefined*
I started researching the causes for some specific instances of this
type of error.

I looked in to the causes of *Element &quot;Variable&quot; Undefined*
as of all the HTML validation errors of this type this is the most commonly-occurring
specific instance.

My initial thoughts were to treat such errors literally:
the error message is telling me that the element "Variable" doesn't exist and
from experience I know that there is no HTML element named "Variable". Therefore
someone has used `<Variable ... >`
in some markup. Case closed.

Your initial reaction may well be the same.

Hands up if you answered "It's because there is no element 'Variable' in HTML. Even W3Schools
will teach you that!".

You can lower your hands now. If you answered as above you answered
wrongly. Well, partly wrongly. You're right, there is no element
named "Variable".

You're wrong in that the use of `<Variable ... >`
directly in markup is the cause of this error. Well, sort of.

It's nothing to be ashamed of. With no further evidence on which to base
your answer, it's the obvious conclusion to draw.

I've got more than 1.8 million HTML validation errors to examine. With this
volume of data, I've got a few more insights.

What if I told you that <em>every single occurrence</em> of this error
relates to the string `<Variable ... >`
inside a HTML comment in a XHTML document?

And what if I told you that this HTML comment is inside a `<style>`
element?

Hands up if you answered "CDATA!" but weren't sure why.

The content of `<style>` elements within XHTML documents
should be treated literally and should not be parsed as markup.

Pop some content in a `<style>` element in a XHTML
document that looks pretty much like markup and you're at the mercy
of the parser of your document when it comes to how that content will
be handled.

And that's exactly what's going on with *Element &quot;Variable&quot; Undefined*
errors.

This all stems from the [Typography Blogger](http://www.deluxetemplates.net/2009/08/typography-blogger.html)
template for the <a href="https://en.wikipedia.org/wiki/Blogger_(service)">Blogger</a> blogging service
which happens to include the following markup:

    <style id='page-skin-1' type='text/css'><!--
        ...
        <Variable name="bgcolor" description="Page Background Color"
        type="color" default="#fff">
        ...
    --></style>

That's just a summary. There are 17 uses of `<Variable` in the
full document.

It's in a HTML comment so you'd think it'd be safe. But this is in a
XHTML document and if you correctly parse this as XML you
parse the content of the `<style>` element unless
something tells you otherwise.

And as nothing tells you otherwise you, putting on your XHTML parser hat,
will parse the above as markup and complain that the element "Variable"
does not exist.

Wrapping this up correctly as CDATA wrapped up safely as a HTML comment
so as not to confuse parsers that treat the above as HTML and all is good:

    <style id='page-skin-1' type='text/css'>
    /*<![CDATA[*/
    <!--
        ...
        
        <Variable name="bgcolor" description="Page Background Color"
        type="color" default="#fff">
        
        ...
    -->
    /*]]>*/
    </style>

Chances are the same root cause applies to the majority of *Element "X" undefined*
errors too.
