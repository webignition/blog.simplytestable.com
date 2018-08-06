---
title: "Test Failures Now Supported"
author: joncram
illustration:
    id: test-failures-now-supported
    url: https://i.imgur.com/d2Lui.png
---
    
Up until yesterday we had no way to spot a failed test. I'm referring
not to a failure such as an HTML validation test finding errors but a test
that fails to run at all.

Some full-site HTML validation tests were stalling on a small number of tests.
In particular there was a ~150 page site where the HTML validation tests
for 3 URLs were never completing.

It was clear, after running the relevant URLs manually through the HTML
validator, that these were pages that could not be validated.

The URLs for which test were never completing were pages were advertising
themselves as being <code>utf-8</code> encoded but which included
character references that did not map to Unicode; not something I'd
previously encountered.

Tests that cannot run are now picked up as failures. So far this covers
cases where the HTML validator cannot perform any validation.

When running a test you can now see another bar below those that list
the number of queued, in-progress and completed tests to show
the number of tests that failed.

Once the full-site test has finished (or
has been cancelled if you don't fancy waiting), the results page for
a failed test will detail why the test could not run.
