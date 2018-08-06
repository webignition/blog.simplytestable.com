---
title: "Choosing Data To Exclude From An Application Backup"
author: joncram
excerpt_separator: <!--more-->
---

### Overview

I'm putting in place a data recovery plan to ensure we're never again
left with nothing should we ever again [lose both hard drives in our production server](/down-for-emergency-maintenance/) 
at the same time.

I can't back up everything. It takes too long and the resulting backup
is too large. I'm writing an article about that to be posted soon if you'd
like to know more. For now, it's enough to know that backing up
everything is not feasible.

Choosing what data to include in, or exclude from, an application backup
is not easy.

Here's how to make it easy.

<!--more-->

### Everything is high priority

Ever worked on a project for a client, be that a desktop application,
mobile app, website or construction project, and run into the problem of
the project scope being too large to meet the timescales?

If you answered 'no', you've not worked on a project for a client.

With those projects not running into this problem being few enough to
count as a rounding error, I'm confident in stating with statistical
significance (and with no supporting evidence other than experience)
that every single project runs into this problem.

Ask a client to prioritise a list of features and they all get marked
as high priority. Ask a client to indicate which features are must haves
and you'll find that all are must haves.

This is by no means a criticism of clients. Being the client, you hear the
question as "Which of these features do you want included in the cost
we quoted?". Of course you want all of them.

### What data to we want to include in the backup?

Your initial reaction: all of it.

Even given time to go through a database schema and taking time to consider
what tables and/or fields can be excluded if we really really really
had to, making a decision on what to exclude is not easy.

Just as with a client prioritising project features, prioritising the
data to include in (or exclude from) an application backup is hard.

Thankfully it's also pretty much the same problem and therefore has the
same solution. It's nice when that happens.

### Use tight time constraints to prioritise application features

The number of features proposed for an application requires a 12-week
production cycle. The client has to launch the application in 8 weeks (it's
for a major sporting event that happens on a specific date, we can't delay).

You ask the client to prioritise the feature set. They state that all the
features are high priority; the application must include everything.

You can't work harder, you say. Paying more won't help at this stage.
Something has to give.

Using tight time constraints helps.

A difference between 8 weeks and 12
weeks doesn't feel that much. That the latter is 150% of the former
doesn't help. 8 weeks is &hellip; 8 weeks away. That's a long time. 2 months.
You can get a lot done in 2 months. Maybe it'll come along more quickly
than you expected. 2 months!

Appreciating timescales is hard. Beyond very small periods, everything
appears possible. It's not until the last minute that it is clear that
you cannot do everything.

Tell the client the application is launching tomorrow. Now there is absolutely
no time to include all the features. If we were to launch tomorrow, what
features can we do without (in this release!) to make that happen.

Tell the client the application is launching in X days, where X is 1 then 2
then 3 &hellip; then 10.

This helps you focus.

Great, but what does this have to do with application backups?

### Use tight time constraints to prioritise application backup details

There we go. It's the same problem and has the same solution.

What do we want to backup? Everything.

We can't back up everything. What can we exclude if we can't include
everything? Nothing. We can exclude nothing. Everything must be in the backup.

Appreciating timescales is hard. Beyond very small periods, everything
appears possible. It's not until the last minute that it is clear that
you cannot do everything.

You have no backups. Your production server's hard
drives are failing. You have 5 minutes before everything is lost. What
do you include in the backup?

You have no backups. Your production server's hard drives are failing.
You have an hour before everything is lost. What do you include in
your backup?

This helps you focus.
