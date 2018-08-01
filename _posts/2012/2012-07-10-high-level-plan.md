---
layout: default
title: "High Level Plan"
author:
    name: Jon Cram
    url: https://github.com/webignition
---

### Grand Plan

Simply Testable is launching publicly October 2012, about 12 weeks from now.
It will allow users to perform a range of quality-related technical and
non-technical tests across a given web site.

What I don't have is a working product, or indeed any product, nor a clear
set of features, nor a clear enough notion of what users will need, nor a
way to charge anyone. Add a marketing strategy to the details
that need attention.

Thankfully all of these matters can be addressed.    

### Features?

The valuable features of the service are the results of the tests. These
provide an insight into what quality issues a site needs to address.

The tests to be run are as yet unknown. They will be generic, common to
all sites and should be feasible to implement in the time available. The
<a href="https://en.wikipedia.org/wiki/Minimum_viable_product">MVP</a>
requires a single test. This will be HTML validity; it is easy to implement
and is a valid test relevant to everyone.

As far as the high level plan is concerned, we're going to launch with
a site-wide HTML validator service. If that sounds unimpressive, remember
that at this stage we're considering only what can definitely be achieved.
On the roadmap in the not too distant future are many more tests.

### What will users need?

What users will ultimately need is a means of carrying out straightforward
but time-consuming site-wide tests that would otherwise cost too much to
carry out manually or which are de-prioritised due to them being tedious
and monotonous to carry out.

I have commercial experience and I don't see this as a crazy assumption. It
will do for now.

I can also look at the competition. Those features offered by the competition
that match what I believe are valuable to my users can be considered.

I also plan to reach out to developers and testers to get feedback on what
features will be most beneficial.

### Charging for the service

This can wait. The service can work without a means for charging. The business
cannot sustain such a situation in the long term. This is something that
can be later addressed.

### Marketing

This blog is part of the marketing strategy. It's a real-time journal documenting
development and progress. It's a two-way medium. Leave comments, or send tweets
to <a href="https://twitter.com/simplytestable">@simplytestable</a>. Your
thoughts are very valid.

I will reach out to developers and testers I know personally, insisting they follow
<a href="https://twitter.com/simplytestable">@simplytestable</a>, that they take
part in beta testing.

I will provide here an interesting account of development and will post stories
to <a href="http://news.ycombinator.com">Hacker News</a> and take part in interesting
discussions at the <a href="http://www.softwaretestingclub.com/forum">software testing
club forum</a>

I will attend local developer and tester meetups, specifically Cardiff's <a href="http://unifieddiff.co.uk/">Unified Diff</a>
and the software testing club <a href="http://www.meetup.com/SoftwareTestingClub/events/62127712/">Cardiff Meetup #2</a>.

### Initial development

Ultimately I need to kick off significant development.

I need to build <a href="http://app.simlytestable.com">app.simplytestable.com</a>,
a RESTful API for accepting site test jobs, reporting on the progress of jobs and providing
access to the results of jobs.

I need build job-submission and account creation features into <a href="https://simplytestable.com">simplytestable.com</a>.

You can follow development through the public github repositories:

- [github.com/webignition/app.simplytestable.com](https://github.com/webignition/app.simplytestable.com)
- [github.com/webignition/simplytestable.com](https://github.com/webignition/simplytestable.com)
- [github.com/webignition/blog.simplytestable.com](https://github.com/webignition/blog.simplytestable.com)
