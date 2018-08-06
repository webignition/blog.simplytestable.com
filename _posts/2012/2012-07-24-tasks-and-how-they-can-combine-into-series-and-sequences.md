---
title: "Tasks and How They Combine Into Series and Sequences"
author: joncram
---
    
**Tasks** are where all the fun is. Tasks (ultimately) give you the insight
into what is right or wrong about your site. Tasks give us a fun place to play
around with testing against specific quality factors.

In writing about the [system architecture](/architecture-overview/),
I mentioned how we use *jobs* and *tasks* to help run collections
of tests. A job might equate to "Test everything for http://example.com". This
is expanded into a collection of tasks, with each task focused on a specific
quality factor for a specific URL, such as "Verify the HTML validity for http://example.com/foo/bar".

**Tasks are stateless** in so far as they are unaware of other tasks. This is a good thing.
If a test job was for verifying the HTML validity of a 100-page web site, the corresponding set of
100 tasks can be deployed concurrently in any order to any workers.

We can optimise for speed by deploying a set of N tasks to N concurrent workers, giving the fastest possible test job
completion time. We can optimise for concurrent test jobs, selecting evenly from two different
users' test job tasks to allow both to run at the same time and preventing one test job
from blocking the other - this is for tasks what [packet switching](https://en.wikipedia.org/wiki/Packet_switching) is for the Internet.

**Stateful task collections** offer benefits unavailable to stateless tasks.

**A series of tasks** is a collection of tasks to be performed in a given order,
with the option of failing *the entire series* as soon as one task in the series fails.

You might have a series of tests that focuses on the business impact of potential failures
and which is prioritised with respect to such risks.

A simple series may be:

1. Verify that the user 'example' with the password 'password' can log in
2. Verify that the URL for the main homepage image is valid
3. Verify that the copyright notice in footer of http://example.com/foo/bar contains the current year

These tasks have no particular common concerns - that a test user can log in
is not related to the validity of the main homepage image URL. This is merely a set of regression tests
that examine common aspects you've previously noticed have a tendency to break.

You're concerned with the business impact of failure and have set the entire
series to fail as soon as a single task fails. This reflects the fact that if a test
user cannot log in, you don't care about the validity of the main homepage image URL
or the contents of the footer copyright notice as the inabilty to log in is impacting
your ability to make money. You want to focus your team on that issue and you don't
want other possible test failures to be a distraction.

**A sequence of tasks** is a series of tasks that is more stateful still. Sequences of tasks
exist at the functional testing level where you would be testing sequences of interactions
with a site as if you were a user, encompassing stateful aspects such as there being a session, cookies,
previously-entered form data and so on.

A simple sequence may be:

1. Go to http://example.com and log in as 'example:password', then
2. Open order 5634
3. Verify that the order state is 'awaiting delivery' and
4. Verify that the number of items in the order is 3

A sequence of tasks may be set to fail if certain focal tests fail. In the above
example, we've chosen to fail the entire series if task 1 fails or task 2 fails
as without these tasks succeeding we cannot complete tasks 3 or 4.

In our first release in October 2012, we'll have just stateless
tasks. Series and sequences of tasks will follow once I've asked enough users what they'd actually need from this.
