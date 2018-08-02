---
layout: default
title: "3 Non-Code Production Performance Improvements For Developers"
author:
    name: Jon Cram
    url: https://github.com/webignition
excerpt_separator: <!--more-->
---

Last night I gave a talk titled "3 Non-Code Production Improvements For Developers"
at the January 2013 [Unified Diff](http://unifieddiff.co.uk/) meetup.

A big thanks to [@HandyBiteSize](https://twitter.com/HandyBiteSize),
[@gavD_UK](https://twitter.com/gavD_UK) and [@rodnaph](https://twitter.com/rodnaph)
for continuing to organise the events, as well as [@craigmarvelley](https://twitter.com/craigmarvelley) 
for helping me get my laptop connected to the projector.

Slides and my initial preparatory notes are available at 
[https://github.com/webignition/udiff-jan-2013](https://github.com/webignition/udiff-jan-2013).

<!--more-->

I'd like to cover here in written form the talk I gave and in the not-too-distant future I'll include the
video of the talk itself.

### How I Turned Broken Into Working Without Changing My Code

I subtitled the talk *How I turned broken into working without changing my code*.

I added this to highlight that it is the environment under
which your applications run that can determine, more than the application
code itself, how well a service will perform.

Following the public launch of Simply Testable in mid-October, I was
facing [major capacity problems](/post-launch-post-mortem/) that continually broke the service day after day.

I fixed these problems without touching a line of code and the results were
orders of magnitude greater than any code change. I should also have added
that no hardware changed.

### The Developer Problem-Solving Mindset

![Code All The Things!](https://memegenerator.net/img/instances/82052159/code-all-the-things.jpg)

You're a developer, you write code. You write code all day long.

You write code to build solutions to problems.

You modify code to fix problems with your solutions to problems.

You use code to solve your problems.

Particularly as a developer who normally works within an organisation,
you tend to think only in terms of code when looking to fix problems
with a system.

You may not consider looking beyond the code as a means of addressing
problems.

### And Then It Was All Broken (The Problems I Faced)

Simply Testable was failing massively on a daily basis:

- As few as 12 concurrent full-site tests caused CPU bottlenecks
- DB queries were 2 orders of magnitude slower
- MySQL reading/writing caused disk I/O bottlenecks
- Full-site tests took 10x as long to complete
- Apache timeouts caused arbitrary failures
- [FUBAR](https://en.wikipedia.org/wiki/List_of_military_slang_terms#FUBAR) situations were frequent

I wasn't convinced that a move to more powerful hardware would resolve
these problems, I wasn't convinced that my code was totally awful (merely
the usual level of awful) and I wasn't convinced that the production hardware
was incapable of handling the load it was under.

I needed to look beyond the code to see what else I could change within
the production environment to make things better.

### 1. Nginx + php-fpm instead of Apache + mod_php

Apache was using about 50% of all CPU resource all the time. This looked
significant and so my first task was to address this.

I'd heard that Nginx was less resource intensive than Apache. Since Apache
was continually using such a large portion of available CPU resources it
made sense to try it out. I assumed in the worst case it would no worse
than using Apache.

I did also consider [lighttpd](http://www.lighttpd.net/) as it
is also a lightweight web server. I chose Nginx as I found the documentation
more clear and complete and found specific configuration examples relating
to Symfony.

I also had to switch to using [php-fpm](http://php-fpm.org/);
Nginx serves only static content and can be configured to proxy off requests
for non-static content to something else. The something else in this case
was php-fpm which appears to be the de-facto standard PHP processes manager
to use with Nginx.

The outcome on the same server under the same load levels:

Average continuous CPU usage under **Apache + mod_php: 50%**

Average continuous CPU usage under **Nginx + php-fpm: 4%**

After making this change, I wrote in detail about [switching from Apache to Nginx](/switching-from-apache-to-nginx)
for Ubuntu servers.

### 2. MySQL loves RAM, give it lots lots

MySQL was using about 20% of CPU resource (prior to the above change)
and, as mentioned, was reading and writing from the hard disk to such
an extent that this was causing (or at least appeared to cause) disk I/O
bottlenecks.

On a production server with 16GB of RAM, you'd really want MySQL to be
using as much of this as possible to both cache data, so as to reduce
the frequency of disk I/O operations, and to cache query results, so as to
reduce amount of CPU resource required for turning data into information.

The default out-the-box MySQL configuration in this respect is awful.
It makes no reasonable use of abundant RAM resources, will under any
significant usage patterns spend far too much time reading and
re-reading data from disk and will not bother to remember the results
of common operations on data.

If you're using MySQL and dealing with a non-trivial volume of data you
should be using InnoDB tables. Let's just assume you are and not go off on
a tangent.

By far the single most important consideration for InnoDB performance is
the size of the InnoDB buffer pool, the memory area where InnoDB caches
table and index data.

Unfortunately all relevant configuration options surrounding this fail to
refer to the word 'memory' in any way making it far less obvious that this
is where you should be looking if you want to use as much memory as possible
to cache your data.

The MySQL performance blog has a great article on
[choosing the correct InnoDB buffer pool size](http://www.mysqlperformanceblog.com/2007/11/03/choosing-innodb_buffer_pool_size/).
I chose 8GB which should result in MySQL using between 8GB and 16GB in which
to cache table data and indexes.

The outcome on the same server under the same load levels:

MySQL **out-the-box configuration: 20%**

MySQL **'lots of ram' configuration: 4%**

### 3. Use /run/shm for impermanent file storage

`/run/shm`, under Unbuntu and Debian distributions, is the pre-mounted
path for a tmpfs filesystem.

This acts like a ramdisk but without the downside of pre-allocating a
portion of RAM to be used, instead scaling up or down the size of RAM used
as needed.

This makes writing to `/run/shm` as fast as writing to RAM, making it perfect
for any file storage where files do not need to be kept around forever,
such as session files or any operation where you temporarily need to store
some data in a file.

Even if you are not suffering from any disk I/O performance problems,
shifting all impermanent file storage to `/run/shm` still frees up hard
disk I/O resources to anything else that actually needs it. You cannot lose.

### Improvement By Numbers

I didn't record specific statistics with respect to performance regarding
these changes as my focus at the time was purely on turning something
quite broken into something that worked.

I did, however, have a very good idea of how well the system was performing
before and after from having investigated the cause of the problems I was
facing.

An approximate before and after in numbers:

<table class="table table-striped">
    <tr>
        <td>
            <!-- This cell intentionally left blank. Please move on, nothing to see here. -->
        </td>
        <td><strong>Before</strong></td>
        <td><strong>After</strong></td>
        <td><strong>Improvement</strong></td>
    </tr>
    <tr>
        <th>Concurrent tests</th>
        <td>12</td>
        <td>40</td>
        <td>3x</td>
    </tr>
    <tr>
        <th>Average CPU load</th>
        <td>30</td>
        <td>4</td>
        <td>7x</td>
    </tr>
    <tr>
        <th>Typical query time</th>
        <td>0.2 seconds</td>
        <td>0.004 seconds</td>
        <td>500x</td>
    </tr>
    <tr>
        <th>Complex query time</th>
        <td>1 second</td>
        <td>0.02 seconds</td>
        <td>50x</td>
    </tr>
    <tr>
        <th>FUBAR frequency</th>
        <td>daily</td>
        <td>infrequent</td>
        <td>brilliant</td>
    </tr>
</table>

### Important Bits To Remember

#### Do Not Use Apache In Production

Nginx performance will not be worse than that of Apache out the box. You
have nothing to lose going with Nginx and lots to gain.

As a side bonus, the "native" reverse proxying of Nginx is phenominal
and the configuration language is a delight to work with.

#### Default MySQL configuration is atrocious

Set the `innodb_buffer_pool_size` configuration option to half your total RAM
size and that's it. Don't waste time trying to configure the query cache,
it's useless.

#### Use /run/shm

It makes impermanent disk I/O performance a non-issue.
