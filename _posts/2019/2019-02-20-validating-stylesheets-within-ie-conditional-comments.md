---
title: "Validating Stylesheets Within IE Conditional Comments"
author: joncram
date: 2019-02-20 16:10
excerpt_separator: <!--more-->
---

Conditional comments are a [special HTML comment syntax](https://en.wikipedia.org/wiki/Conditional_comment) that will 
be ignored by all browsers except IE.

Such comments are commonly used to serve additional stylesheets to specific versions of IE:

<pre>
&lt;!--[if IE 8]&gt;
&lt;link rel="stylesheet" href="/ie-8-specific-overrides.css"&gt;
&lt;![endif]--&gt;
</pre>

To be ignored is the only purpose of a comment. Unless, however, you're dealing with IE conditional comments, 
in which case the contents of a comment will pretend to be HTML under the correct conditions.

Should we ignore all comments even though they might refer to resources that require CSS validation?

This is something I decided I needed to look into.

<!--more-->

### Hello Stylesheets Within IE Conditional Comments

I was recently working on changes to our CSS validation process, specifically concerning the retrieval of linked CSS
resources.

If you pass a web page to the W3C CSS validator, the validator will dutifully find all linked CSS resources. Each
resource will be retrieved and validated.

The W3C CSS validator excels at CSS validation but it's not too great at the bits that come before the validation.
That's fine and I'm not complaining but this is an area that can be improved.

I implemented changes such that we would identify and retrieve linked CSS resources, leaving the W3C validator to 
handle just the CSS validation and nothing else.

When testing the changes I noticed that some web pages contained links to stylesheets that were not being retrieved 
and which were not being validated. Upon further investigation I realised that some links to stylesheets were within
IE conditional comments.

Well, what do we do with these?

### Ignore Conditional Comment Contents?

Comments are a very specific way of saying that a given piece of web page source is absolutely not HTML. What is
the purpose or meaning of the content of a comment? No idea, could be anything, anything at all except HTML.

To be ignored is the only purpose of a comment. To ignore the content of IE conditional comments is to potentially 
ignore links to CSS resources that will actually be served to actual browsers used by actual people.

This left me with two conflicting concepts:

- delving into the content of a comment is beyond the scope of something that reads and processes HTML
- comments can hide links to stylesheets that can be served to end users; such stylesheets deserve validation

Linked CSS resources hidden within IE conditional comments will be served to people. If you're looking to ensure that
the CSS you serve to people is valid, we can't ignore IE conditional comments.

### Finding IE Conditional Comments

We want to find the URLs of linked CSS resources hidden within IE conditional comments. We first need to find
IE conditional comments. How can we go about this?

I took the following approach:

- find all comments
- get the content of each comment
- check if each comment is a IE conditional comment
- pretend that the contents of an IE conditional comment is an HTML document and look for `<link rel="stylesheet" … >` elements

Finding all comments within a web page is straightforward if you have a [DOM](https://en.wikipedia.org/wiki/Document_Object_Model) 
representing a web page and a means of querying the DOM with XPath. The XPath expression `//comment()` does the trick.

Getting the content of a comment will depend on the language you're using and the API of the DOM implementation that
you're using. We're using PHP and each comment is modelled by a [`DOMComment`](http://php.net/manual/en/class.domcomment.php) 
object which provides access to the content via the `data` property.

Given the comment:

<pre>
&lt;!--[if IE 8]&gt;
&lt;link rel="stylesheet" href="/ie-8-specific-overrides.css"&gt;
&lt;![endif]--&gt;
</pre>

we would end up with the content of the comment being:

<pre>
[if IE 8]&gt;
&lt;link rel="stylesheet" href="/ie-8-specific-overrides.css"&gt;
&lt;![endif]
</pre>

If the content starts with `[if IE` and ends with `<![endif]` it's an IE conditional comment.

### Finding CSS URLS Within IE Conditional Comments

We've figured out how to find the contents of all IE conditional comments.

Given the comment:

<pre>
[if IE 8]&gt;
&lt;link rel="stylesheet" href="/ie-8-specific-overrides.css"&gt;
&lt;![endif]
</pre>

we want to examine the non-comment-like content.

A bit of regular expression replacement lets us find the leading `[if IE 8]>` and trailing `<[endif]` and replace them
with empty strings. This leaves us with:

<pre>
&lt;link rel="stylesheet" href="/ie-8-specific-overrides.css"&gt;
</pre> 

Parse that into a DOM and use whatever DOM-querying methods you have at your disposal to find link elements with
a `rel="stylesheet"` attribute and then extract the contents of the `href` attribute.

The contents of an IE conditional comment are by no means guaranteed to be HTML. Use whatever error handling mechanisms 
you have at your disposal (such as a `try ... catch` block) when parsing comment content into a DOM to safely
handle non-HTML comment contents.

### Actually Validating Linked CSS Resources Within IE Conditional Comments

Given a web page that requires CSS validation, we're able to identify IE conditional comments, extract the contents of 
such comments and safely examine the contents for links to stylesheets.

Knowing the URL of a CSS resource, we can retrieve and store the resource locally, pass the local copy of the resource
to the W3C CSS validator and merge the results into the results we have for the web page itself.

The end result will look identical to what the W3C CSS validator would produce were it capable of finding
linked CSS resources within IE conditional comments.
