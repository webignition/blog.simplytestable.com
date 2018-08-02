---
layout: default
title: "Improved Viewing of Results For Large Tests"
date: 2013-02-27 13:40
author:
    name: Jon Cram
    url: https://github.com/webignition
excerpt_separator: <!--more-->
---
    
We've had a problem viewing the results of large tests for a long time.

If you started a new full-site test on a site with thousands of URLs,
closed your browser, went home, returned the next day and opened up
the results page for your test, you'd very likely not get anything useful.

Most of the time you'd get a rather unglamourous `503 Service Unavailable`
error page resulting from an uncaught application error.

If you were lucky, you'd get a more graceful application error page and the
details of the error that happened would be emailed to us.

<!--more-->

In neither case would you generally be lucky enough to get the actual
results of the test you ran.

When you view the results page for a test, the [web interface](https://gears.simplytestable.com/)
has to contact the [core application](https://github.com/webignition/app.simplytestable.com)
and ask for all the results of all the per-URL tests that were carried out.

If there were relatively few URLs tested this would work well. If there
were a relatively large number of URLs tested (thousands), this would not work
well.

No matter how well-performing the code that runs the application, if you
are trying to retrieve the results for N per-URL tests, you will
inevitably run into problems as N increases.

At some point, N will be large
enough that your server doesn't have enough RAM to retrieve all the result
data at once from the underlying database, or to hold in memory all the results
once retrieved, or serialise them to return them to the web interface.

That's what used it happen. It's all changed now!

When viewing the results page of a test, the individual per-URL results
are retrieved not all at once but a few at a time. Currently 100 at a time.

This means you can now view the results of full-site tests for sites
that have thousands of URLs without running into painful errors. You also
get a progress bar so to give you an idea of how long you'll be waiting
before the results page is ready.

We can now tick off the last improvement listed on the [Simply Testable](https://simplytestable.com)
homepage which is a good psychological milestone to reach!

