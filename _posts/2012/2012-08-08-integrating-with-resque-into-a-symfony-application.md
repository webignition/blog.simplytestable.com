---
layout: default
title: "Integrating Resque Into A Symfony Application"
author:
    name: Jon Cram
    url: https://github.com/webignition
excerpt_separator: <!--more-->
---

We use a job system to handle the queuing and running of tasks
asychronously with respect to the application flow. Actions that could
get in the way of things running smoothly and which don't mind when they
happen are put into a queue to be run later.

This covers tasks such as the core application verifying a worker's activation
request, expanding a new test job into a set of test tasks or farming out
test tasks to eager hungry workers.

<!--more-->

For this we use a PHP port of [Resque](https://github.com/defunkt/resque/) which describes itself as being:
    
> a Redis-backed library for creating background jobs, placing those jobs on
> multiple queues, and processing them later

We also use the [Symfony PHP framework](https://symfony.com/) for the core application and workers.

Here's what I did to get the two working together.

    
### Preparation
    
Resque is backed by Redis, and so we need to get this up and running first:

`sudo apt-get install redis-server`

Right, that was easy.
    
### Installing ResqueBundle: Resque With Symfony Integration Built In
    
We need the Resque library and we need to get this to understand where
to look within our Symfony application to find the classes defining the
jobs to be run.

[William Pottier](https://github.com/wpottier), who maintains a fork of an existing PHP resque port, created also the
[ResqueBundle](https://github.com/glit/ResqueBundle) package for Symfony, making integrating the two far too easy.
    
Just update your dependency configuration:

    {
        "require": {
            "glit/resque-bundle":"*"
        }
    }
    
And update your dependencies: `php composer.phar update`
    
And then register the bundle in `app/AppKernel.php`:
    
{: .language-php}
   
    $bundles = array(
        // ...
        new Glit\ResqueBundle\GlitResqueBundle(),
    );
    
And then add an prefix configuration value, either directly in
`app/config/parameters.yml` or in your application bundle's
`Resources/config/parameters.yml`:    

    glit_resque:
      prefix: "prefix_value"

The prefix can be anything you like. It's a namespace prefix used by Redis
to differentiate between different applications that may be using the same
Redis server. Your application bundle's namespace would be a good choice.

That's it, you're ready to start using Resque.
    
### Resque Fundamentals: Jobs, Queues and Workers    
    
Resque lets you place *jobs* in *queues* to later be processed
by *workers*. Jobs are placed into a queue. Later on a worker comes
along, picks jobs out of a queue and runs them.

It's the same work pattern we use across the Simply Testable system.

Let's start by getting a worker process running. To begin with it will be
processing queues containing no jobs, but that doesn't matter. We'll add
jobs later.

    $ php app/console resque:worker --daemon
    Worker started as daemon.


We now have one worker daemon running, eagerly awaiting jobs to run.
    
### Creating a Job
    
A job, in the world of Resque, is just a class that follows certain patterns.
Conceptually this is to the processing of work what a unit test is to the
testing of code.

Your job class must have a `perform()` method and can optionally
have `setUp()` and `tearDown()` methods that are run,
respectively, before and after the `perform()` method is called.

Here's one I literally made a few minutes ago:

{: .language-php}    

    namespace SimplyTestable\ApiBundle\Resque\Job;
    
    use SimplyTestable\ApiBundle\Exception\JobPrepareException;
    
    class JobPrepareJob extends AbstractJob {
    
        public function perform() {
            $output = array();
            $returnValue = null;
            $command = 'php app/console simplytestable:job:prepare ' . $this->args['id'];
    
            exec($command, $output, $returnValue);
    
            if ($returnValue !== 0) {
                throw new JobPrepareException(implode("\n", $output), $returnValue);
            }
        }
    }

You'll notice that a `JobPreparationException` is thrown if the
command line command does not return what we expect. Resque fails a job
if an exception is thrown which is exactly what we want to happen.
    
### Queueing a Job    
    
So we have a worker busily sitting there processing nothing, we have a job
class defined. All that is left is to put jobs into the queue to make
things happen.

We need to get hold of a Resque queue and add a job to it. The `ResqueBundle`
injects a queue manager service into the service container to make this
available to us.

In the Simply Testable core application, the `TestsController`
handles the request to start or examine test jobs. This is where we need to
add a new job to the Resque queue to later have that new test job
expanded into a collection of test tasks to be passed to workers.

{: .language-php}

    $this->container->get('glit_resque.queue_manager')->add(
        'SimplyTestable\ApiBundle\Resque\Job\JobPrepareJob',
        'job-prepare',
        array(
            'id' => $job->getId()
        )
    );

    
If I now request `http://dev.app.simplytestable.com/tests/https://github.com/webignition/start`
to start a new test job and then examine the Resque logs:

    ** [23:37:48 2012-08-08] Checking job-prepare
    ** [23:37:48 2012-08-08] Sleeping for 5
    ** [23:37:58 2012-08-08] Checking job-prepare
    ** [23:37:58 2012-08-08] Found job on job-prepare
    ** [23:37:58 2012-08-08] got (Job{job-prepare} | ID: 650b7e7a5ee6a21cbc3f1e1de750e1ab | SimplyTestable\ApiBundle\Resque\Job\JobPrepareJob | [{"id":10}])
    ** [23:37:58 2012-08-08] Forked 4477 at 2012-08-08 23:37:58
    ** [23:37:58 2012-08-08] Processing job-prepare since 2012-08-08 23:37:58
    ** [23:37:59 2012-08-08] done (Job{job-prepare} | ID: 650b7e7a5ee6a21cbc3f1e1de750e1ab | SimplyTestable\ApiBundle\Resque\Job\JobPrepareJob | [{"id":10}])
    ** [23:37:59 2012-08-08] Checking job-prepare
    ** [23:37:59 2012-08-08] Sleeping for 5
    
The Resque job to prepare the test job is processed by the worker we set
going. The test job has been expanded into a set of test tasks and this
has safely happened asychronously with respect to the request to start
a new test being received.

If that seems easy, it's because it is. I made the 
[relevant changes to the core application](https://github.com/webignition/app.simplytestable.com/compare/18ee0e8c4242...e16c582278ca)
in the space of about half an hour whilst writing this post. You can't get much easier than that.
