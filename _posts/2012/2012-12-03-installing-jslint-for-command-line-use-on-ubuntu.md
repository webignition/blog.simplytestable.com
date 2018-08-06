---
title: "Installing JSLint For Command Line Use On Ubuntu"
author: joncram
excerpt_separator: <!--more-->
---

### Preamble

In adding JavaScript static analysis in addition to HTML and CSS validation
to the set of full-site tests you can run, I need to run JSLint from the
command line.

Since I need to do this on a number of Ubuntu servers, and since this may
be of use to others running Ubuntu or Debian systems, here's how to do it.

<!--more-->

We're going to use the [jslint package for Node.js](https://npmjs.org/package/jslint)
because:

- it produces predictable, easy-to-parse output, which is essential
if you need to programmatically interpret what jslint tells us
- Node.js uses the V8 JavaScript engine which is used in Chrome; if
it's good enough for Chrome, it's a good JavaScript engine
- Node.js is easy to install via apt-get
- node-jslint is available through the <a href="https://npmjs.org/">Node Package Manager</a>, making
it easy to install

### Prerequisites: Installing Node.js and npm

First, install Node.js and the Node Package Manager (npm):

`sudo apt-get install nodejs npm`

Good, that was quick and easy.

Note: if you're running Quantal (12.10) or later, the node binary is now at
`/usr/bin/nodejs` instead of the previous (and more common) `/usr/bin/node`.
A symlink can be useful: `sudo ln -s /usr/bin/nodejs /usr/bin/node`.

### Installing the node-jslint package

It's most common to use NPM to install dependencies for a specific application
and any packages will be installed relative to the directory you are in
when running NPM.

We need to pick a common location to install the node-jslint package so
that it can be used by many test task workers.

I've opted for `/usr/share/node-jslint`.

`cd /usr/share/node-jslint && sudo npm install jslint`

That's everything installed. Let's now see how to use it.

### Testing your installation: using node-jslint

Using nodejs-lint is straightforward: pass to node.js first the path to
jslint.js and second the path to the file containing the JavaScript to lint.

Let's see a full example:

    /usr/bin/node /usr/share/node-jslint/node_modules/jslint/bin/jslint.js /home/jon/www/gears.simplytestable.com/js/app.js
    
     #1 Unexpected '(space)'.
    application.progress.testController = function () { // Line 4, Pos 52
     #2 Missing 'use strict' statement.
    var latestTestData = {}; // Line 5, Pos 5
     #3 Unexpected '(space)'.
     // Line 6, Pos 1
     #4 Combine this with the previous 'var' statement.
    var setCompletionPercentValue = function () { // Line 7, Pos 9
     #5 '$' was used before it was defined.
    var completionPercentValue = $('#completion-percent-value'); // Line 8, Pos 38
     #6 Unexpected '(space)'.
     // Line 9, Pos 1
     #7 Stopping.  (4% scanned).
    // Line 52, Pos 14

There we go, the output from linting a local JS file.

If the output is not quite as you expect, call node-jslint without passing the path to a
JavaScript file to see the options you can use.

And if, like us, you want to read in the lint output programmatically and
take some action in a program based on the lint output, take a look
at our open source [node-jslint output parser](https://github.com/webignition/node-jslint-output-parser).
