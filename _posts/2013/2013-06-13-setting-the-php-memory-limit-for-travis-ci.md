---
title: "Setting the PHP Memory Limit for Travis CI"
author: joncram
excerpt_separator: <!--more-->
---

### Introduction    
    
I use [Travis CI](https://travis-ci.org) as a secondary continuous
integration (CI) service to help ensure that each Simply Testable application
works in isolation as expected when code changes are made.

Following some [recent changes](https://github.com/webignition/app.simplytestable.com/commit/adcb90035b2863c03f273fd150d9d5e8382d6b48)
I noticed that the [PHP 5.3 build failed](https://travis-ci.org/webignition/app.simplytestable.com/jobs/8047559)
due to it hitting a memory limit running unit tests.

<!--more-->

The most straightforward course of action: increase the PHP memory limit
in the Travis environment.

Each Travis build runs in a fresh virtual machine for which any form of shell
access is not available. Simply finding and updating a configuration file
isn't an option.

Despite that, making the change is really easy. Here's what you do.

### Appending Any PHP Configuration Setting For Travis

Thankfully the Travis CI documentation is awesome and it provides
a clear means of [appending the standard PHP configuration](http://about.travis-ci.org/docs/user/languages/php/#Custom-PHP-configuration)
with your own custom settings.

We can use this to set the PHP memory limit.

### Setting the PHP Memory Limit for Travis CI

<ol>
    <li>
        <h4>Create your custom ini file</h4>
        <p>
            I created a file named <code>travis.php.ini</code> in
            the root of my project (at the same level as <code>.travis.yml</code>.
        </p>
        <p>
            Name yours however you choose and put it within your project
            wherever you choose; the above is just an example.
            The important part is to note the relative path to your ini file.
        </p>
        <p>
            Add to your ini file any custom PHP configuration settings. These
            follow the same format as a regular php.ini file.
        </p>
        <p>
            I added just the following:
        </p>
        <pre>memory_limit = 1024M</pre>
    </li>
    <li>
        <h4>Update your project Travis configuration</h4>
        <p>
            You need to add <code>phpenv config-add &lt;relative path to your ini file&gt;</code>
            to the <code>before_script</code> section of your <code>.travis.yml</code>.
        </p>
        <p>
            Here's an abridged copy of my current .travis.yml to show what
            that looks like:
        </p>
        <pre>language: php
php:
  - 5.3
  - 5.4
  - 5.5

before_script:
  # Additional PHP config
  - phpenv config-add travis.php.ini

  # ... additional script lines

script:
  - phpunit -c app</pre>
        <p>
            So long as yours looks similar to the above but retains the ini
            file naming you chose you should be fine.
        </p>
    </li>
</ol>
