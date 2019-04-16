---
title: "Limited Task Assignment For Better Parallel Test Performance"
date: 2012-10-11 14:00
author: joncram
---
    
A problem of which I've been aware for a while and which was the root of
significant problems for yesterday's MVP release relates to how test
tasks are assigned out to workers. 
    
A process runs every few seconds and picks a small number of tasks from each
incomplete test and marks them as being ready to be assigned out to workers.
    
This process was introduced to ensure that many tests can run in parallel.
Prior to the introduction of this process, the tasks for a new test would be
assigned out to workers at all in one go. Subsequent tests would be delayed
in starting until the workers had process the tasks of all previous requests.

There remained a problem with this process until I recently fixed it. 

Whilst this ensured that tests all started more or less at the same time
could run happily in parallel with no test blocking the progress of any other,
it didn't help cases of new tests being started with some existing tests
well underway.

Imagine no tests are running and a single test for an 8000 URL site is started.
The above-described process would select a small number of tasks from the
single in-progress test and mark them as being ready to assign to workers.

A few seconds later, the process would run again and once more select a small
number of tasks from the single in-progres test and mark them as being ready
to assign to workers.

Jump a few minutes into the future and the process, over many iterations
of selecting a small number of tasks to be marked as ready to assign to
workers, has resulted in all the test's tasks being assigned out to workers.
    
Given our current average throughput of about 6000 HTML validation tasks
per hour, we're now looking at roughly an hour for the workers to finish
processing all those tasks.
    
In comes a new test. A small number of its tasks are selected for assignment
to workers and then assigned to workers. Sounds good until you realise that
the new test's tasks are sitting at the end of the workers' queues and have
to wait about an hour until they get underway. Not Good At All.

The solution is quite straightforward: when selecting tasks to assign out
to workers, pay attention to how many of the relevant test's tasks have already
been assigned out to workers. If there are already enough assigned out,
don't assign any more until those that are assigned have finished.

And that's the change I recently introduced. A given test is now allowed
up to 2 tasks per worker to be in progress at any given time. With 4 workers,
this lets a given test have up to 8 tasks underway at once.

If a test has no tasks underway, 8 will be selected and assigned out to
workers. If a test has 5 tasks underway, 3 will be selected and assigned out
to workers. No more than 8 in-progress tasks at once are allowed.
