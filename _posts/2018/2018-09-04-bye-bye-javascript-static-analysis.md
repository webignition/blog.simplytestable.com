---
title: "Bye Bye JavaScript Static Analysis"
author: joncram
excerpt_separator: <!--more-->
---

About six years ago I added the option for single-page and full-site JavaScript static analysis via [JSLint](https://www.jslint.com/).

This change seemed a good idea at the time. It may well have been a good idea at the time.

Times have changed and the world has moved on. Whether or not the ability to run all the JavaScript across your site
through JSLint was good idea _six years ago_, it is now quite clear that it is no longer of any benefit.

In short, I'll soon start to remove the JavaScript static analysis feature that [Simply Testable](https://simplytestable.com)
provides.

<!--more-->

### Why JSLint (Just About) Made Sense in 2012

[jQuery](https://jquery.com/) was commonly used as an abstraction on top of browser inconsistencies. This
was hugely beneficial with Internet Explorer 7, 8 and 9 taking [around 25% of the browser market](https://www.w3counter.com/globalstats.php?year=2012&month=12)
and with `document.querySelector()` yet to be formalised as a W3C recommendation. 

It wasn't until the release of IE 9 in March 2011 that we could start to consider the use of modern JavaScript in anything
other than tightly-controlled production environments and it would take years for adoption to reach levels where we 
could consider dropping jQuery.

[Webpack](https://webpack.js.org/) was new and relatively no-one was using it. [NPM](https://www.npmjs.com/) was just
a couple of years old and relatively no-one was using it.
 
Having a JavaScript package repository, a dependency manager,
the ability to transpile modern JavaScript into something understood by browsers, and the option to set up a build
process to handle this all for you easily was years off.

JavaScript to be used _by_ browsers was written directly _for_ browsers. IDEs would certainly help via autocompletion
and syntax highlighting and perhaps you'd have a rudimentary build process to combine a set of JavaScript resources
(first- and third-party) into a single minified source file, but you'd be pretty much writing directly for the browsers
that you were targeting.

If you wanted to produce high-quality JavaScript less prone to bugs and more capable of working for all relevant
browsers, JSLint was a good choice.
 
If the code you were writing was the code you were directly deploying to production, the option to run all of your JavaScript 
through JSLint from your live website also seemed like a good choice, assuming you first accepted that using JSLint was 
a good choice.

### Why JSLint On Production Code Makes No Sense in 2018

The JavaScript ecosystem has changed a great deal in just a few years. 

Vanilla (native) JS is commonly used instead of abstraction libraries such as jQuery. Modern browsers support native
element finding via CSS selectors. jQuery is no longer essential.

Webpack, as well as similar builders, are commonplace. Used in conjunction with [Babeljs](https://babeljs.io/), we can
easily write concise modern JavaScript and, as part of the build process, transpile to a version of JavaScript that
is understood by whatever browsers we need.

JavaScript to be used by browsers is less commonly being written directly for browsers. We can make use of modules and treat functionally-independent pieces of code as isolated units of work.
We can easily test modules independently of the environments in which they're used. We can easily spin-up headless 
browsers to functionally test our code once it has been through the build process.
 
The output of a modern JavaScript build process is the compiled/transpiled, combined, minified result of a series of 
related-but-independent inputs. 

We can verify the correctness of the built JavaScript (through the aforementioned
functional tests) but we sure as heck don't want to read it.

If we don't want to read modern production JavaScript, we certainly don't want to lint it or in any way perform
static analysis upon it.

Linting and and static analysis are as useful today as they have always been. We want to apply such good practices
to our source JavaScript and not the output of our build process that is deployed to production.