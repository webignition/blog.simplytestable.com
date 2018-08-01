---
layout: default
title: "Our Technology Stack"
author:
    name: Jon Cram
    url: https://github.com/webignition
---
    
I've been asked a few times, most recently by the guys at [Matcha Labs](http://www.matchalabs.com/),
what tech [simplytestable.com](https://simplytestable.com) uses and how it all works together.

Here's a quick rundown of the hardware and software our systems run on, the applications we make
and how they work together.

### Production Server

Our production environment runs on an [EX4](http://www.hetzner.de/en/hosting/produkte_rootserver/ex4)
server from [Hetzner](http://www.hetzner.de/en/) featuring a [quadcore core I7 2600 3.4GHz cpu](http://ark.intel.com/products/52213) and 16GB of RAM.
That's plenty of power to get us started.

We're running [Ubuntu Server 12.04](https://wiki.ubuntu.com/PrecisePangolin/ReleaseNotes/UbuntuServer).
That's the same OS used locally for development; keeping the production environment on the same OS simplifies
production environment preparation and deployment.

### Simply Testable Applications

I wrote about our [/architecture-overview/](system architecture) some months ago; have a quick read of that
 to get up to speed.

Four applications make up the Simply Testable system. They're all PHP-based using the [Symfony2 framework](http://symfony.com/)
and all code is held in git repositories available on GitHub.

<ul class="application-list">
    <li>
        <h4>Core Application</h4>
        <ul class="repository-list">
            <li>
                <i class="fa fa-link"></i> <a href="http://app.simplytestable.com/">app.simplytestable.com</a><br />
            </li>
            <li>
                <i class="fab fa-github"></i> <a href="https://github.com/webignition/app.simplytestable.com">github.com/webignition/app.simplytestable.com</a>
            </li>
        </ul>

        The core application is a job queuing and task management system. It takes requests for new full-site
        test jobs, breaks down each job into a collection of tasks, assigns tasks out to workers, receives
        results from workers and makes the results available to the web client.
    </li>
    <li>
        <h4>Workers</h4>
        <ul class="repository-list">
            <li>
                <i class="fa fa-link"></i> <a href="http://hydrogen.worker.simplytestable.com/status/">hydrogen.worker.simplytestable.com</a><br />
            </li>
            <li>
                <i class="fa fa-link"></i> <a href="http://helium.worker.simplytestable.com/status/">helium.worker.simplytestable.com</a><br />
            </li>
            <li>
                <i class="fa fa-link"></i> <a href="http://beryllium.worker.simplytestable.com/status/">beryllium.worker.simplytestable.com</a><br />
            </li>
            <li>
                <i class="fa fa-link"></i> <a href="http://lithium.worker.simplytestable.com/status/">lithium.worker.simplytestable.com</a><br />
            </li>
            <li>
                <i class="fab fa-github"></i> <a href="https://github.com/webignition/worker.simplytestable.com">github.com/webignition/worker.simplytestable.com</a>
            </li>
        </ul>

        Workers carry out the actual tasks, such as an HTML validation task. They accept tasks from
        the core application, carry them out and report back the results.

        As you can see from the list above, we have four workers at present. Although
        they currently all run on the same box, they can be deployed anywhere allowing us
        to distribute the workload and provide a spot of redundancy.

        Scalability, cloud computing and related buzzwords spring to mind.
    </li>
    <li>
        <h4>Web Client</h4>
        <ul class="repository-list">
            <li>
                <i class="fa fa-link"></i> <a href="https://gears.simplytestable.com/">gears.simplytestable.com</a><br />
            </li>
            <li>
                <i class="fab fa-github"></i> <a href="https://github.com/webignition/web.client.simplytestable.com">github.com/webignition/web.client.simplytestable.com</a>
            </li>
        </ul>

        The web client is a human-friendly interface to the core application. You can start new full-site
        tests, watch the progress and view the results.

        The web client merely reports back what is going on at any given moment. What is going on in
        the core application keeps on going on whether you're watching or not. If you start a test
        and then close your browser, the test keeps running and you can come back at any time.
    </li>
    <li>
        <h4>Marketing Site</h4>
        <ul class="repository-list">
            <li>
                <i class="fa fa-link"></i> <a href="https://simplytestable.com/">simplytestable.com</a><br />
            </li>
            <li>
                <i class="fab fa-github"></i> <a href="https://github.com/webignition/simplytestable.com">github.com/webignition/simplytestable.com</a>
            </li>
        </ul>
        This is what you see when you to to <a href="https://simplytestable.com/">simplytestable.com</a>.
    </li>
</ul>

### Carrying out actual tests

Each worker runs a local copy of the [W3C HTML validator](http://validator.w3.org/), backed by a local copy of the 
[validator.nu HTML5 validator](http://html5.validator.nu/).

The W3C HTML validator is basically [one epic Perl script](http://dvcs.w3.org/hg/markup-validator/file/tip/httpd/cgi-bin/check).
The validator.nu HTML validator is a Java application.

Later I'll be adding local installations of the W3C CSS validator and JSLint.

The applications that actually carry out the tests are all quite different. Each worker
has a collection of drivers to interact with the testing applications. The HTML validation
driver, for example, tells a worker how to talk to the HTML validator and how to
understand what comes back.

### Workflow Management

If you were to take the code for the core application and the workers and deploy them somewhere
and start up a new full-site test you might be surprised to notice that absolutely nothing useful happens.

The workflow of each application comprises a number of steps either initialised by an HTTP request
or via issuing a command line command.

Let's quickly look at the workflow for a new test job as an example:

1. `http://app.simplytestable.com/job/http://example.com/start/`
2. `php app/console simplytestable:job:prepare 1`
3. `php app/console simplytestable:task:assign 1`
4. `php app/console simplytestable:task:assign 2`
5. `php app/console simplytestable:task:assign N`

Once a request to start a new job is received, it must be prepared (URLs to test discovered
and a collection of tasks created) and then each task must be assigned out to a worker.

The whole process is a collection of distinct steps. Each step carries out a small unit of work and changes the state
of the job. Most are initialised via command line commands.

Distinct steps are easy to test. Distinct step failure is easy to handle. Distinct steps can happen later.
Distinct steps can (often) be run in parallel.

Distinct steps do not, however, run themselves. When one is done, that's it. Something else has to kick
off the next step and the one after that and so on.

Once every step is done, it pops a job in a queue to kick off the next step. When developing, we can
ignore this queue and manually kick off steps as needed to make things initially work and to investigate
bugs. The integration system can also ignore the queue and can instead sequentially kick off all steps
and verify that everything works bit by bit as a full-site test progresses.

The production system uses [Resque](https://github.com/defunkt/resque#readme) to manage the workflow queue:

> &hellip; a Redis-backed library for creating background jobs, placing those jobs on multiple queues, and processing them later.

Smashing, just what we need. It'd be awfully tedious to manually kick off each step in the production
environment.

This automates the workflow for both the core application and the workers. The core application
uses about 10 workflow job queues, all being serviced by about 100 Resque processes in total.
Each worker uses about 3 workflow job queues, all being serviced by about 15 Resque processes in total.

### That's it

I'm done with my quick rundown of what we used, what it's made from and how it
manages to do what it does without constantly failing.

Send a message to [@simplytestable](https://twitter.com/simplytestable/) if you want to know more.
