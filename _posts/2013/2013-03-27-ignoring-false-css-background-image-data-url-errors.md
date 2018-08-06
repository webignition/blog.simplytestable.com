---
title: "Ignoring False CSS Background Image Data Url Errors"
date: 2013-03-27 10:40
author: joncram
excerpt_separator: <!--more-->
---
    
I learned yesterday from [@johnholtripley](https://twitter.com/johnholtripley)
that CSS background image data URLs were presenting CSS validation errors incorrectly.

By this I mean that the CSS validator was saying there is an error when there was not.

Let me quickly explain what data URLs in CSS are for this to make sense.

<!--more-->

You can traditionally define a background image in CSS like this:

    div.menu {
      background-image: url('elephant.png');
    }

Modern browsers allow you to use data URLs whereby binary data is encoded
within the URL itself:

    div.menu {
      background-image: url(data:image/png;base64,iVBORw0KGgoAA
      AANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAABlBMVEUAAAD///+l2Z/dAAAAM0l
      EQVR4nGP4/5/h/1+G/58ZDrAz3D/McH8yw83NDDeNGe4Ug9C9zwz3gVLMDA/A6
      P9/AFGGFyjOXZtQAAAAAElFTkSuQmCC);
    }

(examples courtesy of [Wikipedia](https://en.wikipedia.org/wiki/Data_URI_scheme#CSS))

A modern browser will then translate that long text string back in to
binary data which will be, in this case, a png image.

Take a look at the `url(...);` content above. See how
it doesn't appear to be a regular URL as you know it?

It doesn't look like a regular URL to me and, despite it being valid CSS,
it doesn't look like a regular URL to the W3C CSS validator either.

Try to validate the above and you get the lovely error:

> Value Error : background-image url(data:image/png;base64,iVBORw0KGgoA&hellip;SuQmCC) is an incorrect URL

Notice how the `url(...);` content is directly in the brackets
without quotes?

You're allowed to use both `url("quoted");` and `url(unquoted);`
values (so long as you properly escape quote characters).

Sadly the W3C CSS validator doesn't agree. Validation passes fine for
quoted data URLs but not for valid unquoted data URLs.

Luckily for you, I just updated our
[CSS validator parser library](https://github.com/webignition/css-validator-output-parser)
to allow false background image data URL errors to be ignored.

If you now 
[run a full-site CSS validation test](https://gears.simplytestable.com/?html-validation=0&css-validation=1&css-validation-ignore-warnings=1&css-validation-ignore-common-cdns=1&css-validation-vendor-extensions=warn&js-static-analysis=0&website=blog.simplytestable.com)
and happen to be using valid unquoted data URLs you'll no longer be bothered
by such false errors.
