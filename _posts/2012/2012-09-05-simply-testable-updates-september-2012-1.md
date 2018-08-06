---
title: "Simply Testable Updates September 2012 #1: Epic-scale Performance Improvements, Private Alpha One Week Away"
short_title: "Simply Testable Updates Sept #1: Epic-scale Performance Improvements"
author: joncram
newsletter:
    issue_number: seventh
    url: https://us5.campaign-archive2.com/?u=ac75e33d993d2b502e333ddd0&amp;id=c51eea7964
    closing_sentence: Expect the next in a week from now, September 12 2012.
    highlights:
        - preparing for next week's private alpha release
        - I ordered a <a href="http://www.hetzner.de/en/hosting/produkte_rootserver/ex4">EX4 dedicated server</a> from Hetzner
        - Reduced the time to load the details for an in-progress ~600 page test from 40 seconds to 2 seconds, then later to 1 second
        - Added HTTP caching headers for non-changing pages such as test results, reducing page load time from about 4 seconds to 0.5 seconds
        - Rewrote how test tasks are assigned to workers to prevent in-progress tests blocking new tests from starting
---