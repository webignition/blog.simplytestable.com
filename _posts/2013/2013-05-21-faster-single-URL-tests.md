---
title: "Faster Single-URL Tests"
date: 2013-05-21 11:45
author: joncram
---

Running a single-URL test just got faster!

Single-URL tests previously followed the same execution process as full-site
tests which goes something like this:

1. Create new test
2. Prepare test (collect URLs, create test tasks for each URL)
3. Start assigning out test tasks to workers

The carrying out of step 2 is deferred to an background processing queue.
This means it is carried out some time after step 1. It might be quite soon
after step 1 or it might be a while after step 1.

Some tests take a long time to prepare (such as those with thousands of URLs to
examine). If we didn't defer this to a background processing queue, you
could be sitting around waiting for a long time for your browser to load
the test progress page. A really long time.

This results in a short delay between steps 1 and 2. The delay is an unavoidable
side effect of being able to give you immediate progress details as soon as
you start a new test.

This is the process that full-site tests follow. Single-URL tests initially
followed the same process because it worked, there was no immediate
need to change it and there were more important changes to address.

Now that we're moving towards the introduction of paid plans, the need
for improved performance and for a higher overall product quality increases.

Single-URL tests now use this process:

1. Create and prepare test
2. Start assigning out test tasks to workers

There is no longer any delay between a test being created and a test being
prepared.

With single-URL tests the time required to collect the URLs to be tested
and to prepare the test tasks is negligible - we already know the one and only URL
to be tested and we already know the types of test you want to run.

This shaves off a few seconds from how long it takes to run a single-URL test
making each just a little bit faster.
