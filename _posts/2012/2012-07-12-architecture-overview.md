---
title: "Architecture Overview"
author: joncram
illustration:
    id: architecture-overview
    url: https://i.imgur.com/uAvfm.jpg
---

**A client** such as [the web interface](https://gears.simplytestable.com),
an iOS app or an Android app, sends a site test job request to the core application. The
client reports back to the user on the status and progress of the job and presents the results
of the test once complete.

**The core application ([app.simplytestable.com](app.simplytestable.com)** creates a set of tasks for the job. A task relates
to a single URL and a single type of test. The task is dispatched to a worker. The core application reports back to
the client the status and progress of a task and makes available the results once a task is complete.

**Workers** carry out the tasks. There can be many workers. Workers can be distributed across hosts
and a given host can run one or more workers. A worker carries out a given task; it performs a single test for a single
URL. A worker reports back to the core application the results of the test.

The core application and the workers talk over HTTP. Workers can be anywhere in the world. We can improve performance
in the future by placing workers geographically-close to the location of the sites they're testing.

There can be many workers. We can cope with load variations by increasing and decreasing the number of workers.
If a given site test has 100 tasks and we have 100 workers, the time to complete the whole test is simply the time
required to complete the longest task.
