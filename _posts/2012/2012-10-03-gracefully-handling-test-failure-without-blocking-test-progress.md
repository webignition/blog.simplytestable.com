---
title: "Gracefully Handling Test Failure Without Blocking Test Progress"
date: 2012-10-03 21:00
author: joncram
excerpt_separator: <!--more-->
---

### A Significant Problem Resolved
    
Sitting at the bottom of the list of improvements on the homepage
at <a href="https://simplytestable.com/">simplytestable.com</a> since
a little before the private alpha release is the item:
    
> Gracefully handle test failure without blocking test progress
    
A little vague perhaps, but certainly a worthwhile improvement tackling
a very significant problem.    
    
It's the last big problem that was preventing a smooth running service. Now that
it's resolved, I'll look a little at what the problem was and how
the solution was put together.    

<!--more-->

### A Quick Recap
    
I'll quickly go over the lifecycle of a full-site test to get you up to speed
with what comes next.    
    
When you pop in your site homepage URL to start a new full-site test, a
request is sent off to the core application asking it nicely to start a new
test job.    
    
The newly created test job, a few moments later, is broken down into a
collection of tasks. Currently the only test type covered is HTML
validation and so you end up with one HTML validation task per URL being
tested.    
    
Over time, these tasks are assigned to workers to carry out the actual
testing to be done. Once a worker is done performing a task, it reports
back to the core application on the results of the test.    
    
The core application knows how many tasks there are and, with the workers
reporting back on each task as it happens, the core application can figure
out how complete a test job is. The core application can also figure out that once all tasks have reported
back the whole test job is complete.
    
### A Significant Flaw
    
There's a definite flaw here: if the results of any single task is not
reported back to the core application, the core application will never
get past 99-point-something percent complete for a given test job and will
never figure out that the whole test job is complete.    
    
If a decent error occurs whilst a task is being performed by a worker, the
task never ends up being completed. If it's not in the right state, the
results (which may or may not have been collected depending on where and
when the error occurred) will never get reported back to the core
application.    
    
That's where we used to be. The failure of a single task could prevent the
whole test job from ever being marked as completed. It would be stuck
at 99-point-something percent done forever.    
    
The percentage of test tasks failing was small, but given that we're running
about 5000 HTML validation tests per hour, the number of full-site tests
this was affecting was noticeable.
    
### Supporting Failure    
    
A test task was originally incapable of failing. Well, that's a lie - as I
mentioned, test tasks were failing and causing problems as a result.    
    
That a test task failed was not something that could previously be recognised.
A test went from being in progress to being completed or cancelled.
There was no 'failed' state.    
    
Even if we could spot that a test failed, which we couldn't, there was no
way of stating that it was failed.    
    
Two weeks ago in *[Test Failures Now Supported](/test-failures-now-supported/)*
I introduced the notion of test failures being supported. It was from then
on possible to set a task as having failed.    
    
 At the time, only content encoding failures were recognised. One down,
 many to go.
    
### Redirect Loops and Redirect Limits
    
Just under two weeks ago in *[Redirect Loops and Long Redirect Chains Detected](/redirect-loops-and-long-redirect-chains-detected/)*
I noted that redirect loops (and reaching redirect limits) were supported.    
    
If a web page being retrieved for testing could not be retrieved due to a
redirect loop or due to reaching a redirect limit, the relevant task
would be marked as failed. Two more down.
    
### Timeout Failures Supported
    
I wrote today in *[Test Timeouts Now Supported](/test-timeouts-now-supported/)*
that failures due to timeouts are now taken into account.    
    
That covers timeouts when retrieving pages for testing and timeouts resolving
domain names when retrieving pages for testing. I added as bonus feature
that tests failing due to a URL being malformed were also covered.    
    
What I didn't mention is that also supported is the failure of a test
for any error that cURL can raise. That's about 30 different failure
causes covered in one go.
    
### And That's About It    
    
Almost any cause for a test failing is now covered, something I realised
not too long ago. Test tasks can fail and this does not stop the
overall full-site test from completing.    
    
I can now tick off the improvement item on the homepage
and feel much better about the quality of the service as a whole.
