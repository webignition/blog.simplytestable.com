---
layout: default
title: "First Test Results"
author:
    name: Jon Cram
    url: https://github.com/webignition
illustration:
    id: first-test-results
    url: https://i.imgur.com/OztTE.png
excerpt_separator: <!--more-->
---
    
I reached a significant milestone today: the first real test was run.

I completed the integration of the W3C HTML validator (with HTML5
support) into the [worker HTML task driver](https://github.com/webignition/worker.simplytestable.com/blob/master/src/SimplyTestable/WorkerBundle/Services/TaskDriver/HtmlValidationTaskDriver.php),
an overly technical way of saying that HTML validation tests are
now performing actual HTML validation and reporting the results back
to the core application.

<!--more-->

The above illustration is a screenshot from a database administration tool
showing the raw data for the test tasks for a completed test job run on
the integration environment.

The column on the right shows the collection of HTML validator error
messages formatted as a JSON document.

[A second illustration](/illustrations/first-test-results-json-response/)
 shows the JSON output of the core application running in the integration environment complete with test results.

The backend distributed test system is now carrying out real tests!

I can now focus on building the frontend (which will eventually be at simplytestable.com)
and see where that leads in time for the internal prototype milestone
[listed on the roadmap](https://simplytestable.com/roadmap/) as being next Wednesday.
