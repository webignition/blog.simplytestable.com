---
layout: default
title: "Working Prototype In Action (Video)"
author:
    name: Jon Cram
    url: https://github.com/webignition
---

<iframe class="video" width="640" height="480" src="https://www.youtube-nocookie.com/embed/qDEWyXXZsdY?rel=0" style="border: none"></iframe>
    
A quick demonstration of the latest working prototype running a site-wide
HTML validation test.

You can see the test progress bar in the middle of the page and below
that, not very clearly, you can see the changing test task queues.

In this case we're testing a site that has 10 URLs and so we have 10 test
tasks to run.

Each task starts out as being *queued*: it's been created and it's impatiently
waiting to be assigned to a worker. The yellow bar indicates how many
queued tasks there are.

When assigned to a worker, a task is *in progress*. The blue bar
in the video indicates how many tasks are in progress. This bar tends to grow
as the number of queued tasks drops.

When finished, a task is marked as *completed*. That's the green bar.
