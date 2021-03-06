---
title: "Performance Boost By Turning Things Inside Out"
author: joncram
---

Last Friday I deployed some changes to how test tasks are farmed out to workers. This has resulted in
a 46% increase in task throughput and has nearly halved the amount of time it takes to carry out a test.

> Task throughput: the number of test tasks carried out per minute.
> Test speed: the time taken to carry out an entire test job (a collection of test tasks).

I achieved this by turning the task assignment process inside out. Here's what that means and how I did it.

### Improvement by numbers

The previous maximum task throughput for the system as a whole was 280 tasks per minute. In context,
that might be 280 unique HTML validation tasks carried out each minute (about 4.6 per second).

The new maximum task throughput for the system as a whole is 410 tasks per minute. That's about 6.8 per second,
a 46% increase. That's nearly half as good again as was previously the case.

It previously took the system 75 seconds to carry out a full-site HTML validation test for this blog.
It now takes 43 seconds to carry out the exact same test. That's just 57% of the time it previously took,
making the system 78% faster than before.


### Recap: how tests get carried out

<img src="https://i.imgur.com/HM1hrOR.jpg" class="img-fluid">

The core application, top center in the above illustration, is the brains of the operation.

When a new test is started, the core application figures out what URLs are to be tested and what tests
are to be performed and translates this into a collection of test tasks.

Test tasks are farmed out to a collection of worker applications. On receiving a new task, a worker
will perform a specific test against a specific URL and report the results back to the core application.


### Before: assigning tasks at the core application

The responsibility of selecting and assigning tasks occurred solely within the core application.  The core
application would select the next set of tasks to be carried out and would assign them out to a random
worker.

The task assignment system as it used to be was quick to develop and easy to verify. It wasn't perfect but it
worked and was good enough.

This is not ideal. I have always known it was not ideal. Like many software development choices, it was a
based on compromise. It was better to have a non-ideal solution in use than to spend time optimising the process as
it wasn't then clear if such optimisation would be premature.

And as with all processes that are non-ideal, it's only good enough until it isn't.


### The downsides: workers spend too much time doing nothing, or too much

On receiving a task, a worker will carry out that task and report back the results to the core application.
Repeat for all tasks in the worker's queue.


The core application takes time to select tasks for assignment (a trivial but non-zero amount of time) and
assigns all selected tasks out to a random worker.


Time passes between the last task being completed and some new tasks arriving to be worked on. A worker may
sit idle for some seconds whilst there is more work to be done.


With all selected tasks being assigned out to a random worker, the same worker may be
randomly chose for each batch of tasks. This can result in a single worker having a long queue of tasks
to work on whilst other workers sit idle.

### After: workers request tasks

This turns the whole task assignment process inside out. Instead of tasks being assigned out by the core
application to whichever worker it chooses, the workers themselves request tasks to work on.

A given worker is well aware of how many tasks are in its queue and how busy it is. These details are not
readily available to the core application.

If you want to maximise worker task throughput, it's best to have a worker ask for more work so that
it never stops working.

And that's the change I made.

Each worker monitors its task queue and its task throughput. When the number of tasks in the worker's queue
drops below a certain level, it asks the core application to give it more work.

This sounds simple and in principle it is. The initial changes took about 4 days to complete followed
by about a week and half of testing, investigation and bug fixing. You never get it right the first time.
