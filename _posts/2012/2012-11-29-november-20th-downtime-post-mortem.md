---
title: "November 20th Downtime Post-Mortem"
author: joncram
---

### It broke for 6 days.

Last Tuesday (November 20), whilst I was on vacation, Simply Testable
broke.

This was the longest outage to date and also one of the more interesting
problems I've had to face.

What made it interesting was that everything was technically working but
due to a small but significant aspect nothing could actually happen.

### Let me set the scene to explain what went wrong.

The <a href="https://github.com/webignition/app.simplytestable.com">core application</a>
is the brains behind the service, accepting requests to start new full-site tests,
figuring out the URLs to test and farming out test tasks to a collection of 5 workers.

Transactions between the core application and the workers are stateless:
each time the core  application talks to a worker, or each time a worker
talks to the core application, it's as if they've never met. No session data
or cookies are used or needed.

The Symfony2 framework (on top of which all the Simply Testable applications
are built) will, by default, persist the data for each session to a file
on disk. It takes a bit of effort to stop this from happening and so to
begin with I left the default session storage options in place and
happily ignored the session data files.

About three weeks ago I put in place [a change](https://github.com/webignition/app.simplytestable.com/commit/cf4a718ea77f7e1c2657ce33b6cd792453ebe84b)
to prevent the core application and the workers from needlessly storing
session data in files and decided to delete old, needless session data files.

### Spotting a very large collection of session data files

I noticed that the core application's cache directory contained many session
data files.

Many, many.

Very many many.

There were so many session files that I couldn't list the directory contents nor
delete the files by any common means (such as `rm -Rf sess-*`).
No use of `ls` or `find`, separately or in combination,
could be used to identify how many session files existed or what the
filenames were.

I finally turned to the Linux `du` command, intended to
estimate file space usage, in combination with the `head` command
which is intended to truncate output.

`du -a | head -1 | awk '{print $2}'` will get you the
name of the first file in a directory when nothing else will seem to work.
Piping the output of this to the `rm` command lets you
delete the first file in a directory.

The whole process took about a minute to complete and I didn't want to
repeat the process manually millions of times.

I set up a cron job to run every 5 minutes to delete the first 1000 of the core application's old
session data files and this ran happily for a couple of weeks. It ran happily until
November 20 when it stopped working in quite a horrible way.

### Uninterruptible I/O processes are bad

The process seeking a file to delete got stuck in an uninterruptible
state. It got stuck in such a way that it could not be stopped.

This, on its own, would have not been too bad, but with the cron job running
every 5 minutes, a collection of stuck processes built up.

With 1707 processes trying to list and then delete some files being
stuck in an uninterruptible state, all disk read and write operations ended
up getting stuck in an uninterruptible state waiting for previously-started
operations to complete.

Everything of use needs to read and write data. Web servers write information
to log files, database servers read from and write to data files, the applications
we wrote ourselves log various pieces of information to help us figure
out when things go wrong.

All applications on which Simply Testable depends got stuck waiting for logging
processes to write to disk.

Uninterruptible processes cannot, by definition, by interrupted.

No `kill -9 <pid>` here, no matter if you're the owner
of the process or root or any other super or magic user.

No rebooting a server gracefully. Issue a `reboot` command
and your server will restart once all running processes have been safely
stopped. If you have one or more uninterruptible processes running this
gets you nowhere.

### Rebooting the hard way

The only option was a hard reboot, equivalent to yanking out the power
cord and then plugging it back in again.

I'm sure you've heard that yanking out the power cord can be bad for a
computer. With data being read from and written to your hard disk
all the time, there's a fair chance a sudden loss of power will result
in a sudden loss or data or, depending on the timing, a sudden loss in
your hard drive's ability to work at all.

A correctly-timed sudden loss of power can result in a sudden loss of all
the data on your hard disk.

And there I was, ready to yank the power cord on our production server
that had 1707 processes stuck trying to access the disk with no way of
knowing if they had failed in a safe manner.

This was the only option. I had no choice.

This still didn't stop me
hesitating over the button I had to click that would send a request
to the data center to cause the remote power-off magic to kick in.

### Click.

...

Wait.

...

Open terminal, `ping 5.9.84.201`. Wait. *Destination host unreachable*.

That's fine, I've only given it a few seconds. Let's give it a little longer.

Ever waited for a production server to restart after being powered off in
the most potentially-damaging way?

It's a long wait. The server may not start up again. How long do you wait?

How about waiting 5 minutes?

`ping 5.9.84.201`. Wait. *Destination host unreachable*.

Whilst it might take a few minutes for all the server applications to start
running, it shouldn't take long for it to be in a position to respond to a
ping request.

Time to send an email to the data center to explain in detail what had
gone wrong and what I'd done to try and fix it? It'll at least pass the
time.

About another 5 minutes passed whilst I wrote out the basics of the email
to send to the data center. I checked it clearly covered what state the
server was in at the point I issued the hard power off request, what I'd
like them to do (see if the disk was dead) and what timescales I'd be
looking at to get any hardware replaced if needs be.

One last check before sending &hellip;

`ping 5.9.84.201`. *64 bytes from 5.9.84.201: icmp_req=1 ttl=54 time=37.5 ms*.

Brilliant, looks like everything is fine after all. It's been over ten minutes,
the server is responding to ping requests, let's verify that some basic
services are running.

`telnet simplytestable.com 80`. Wait. *Connection refused*.

Ok, maybe nginx hasn't quite got its act together just yet. Serving up
web pages is a bit of a complex job. Let's try something more simple.
SSH is dead simple, isn't it?

`telnet simplytestable.com 22`. Wait. *Connection refused*.

Ah. Oh dear. More than 10 minutes and even then the SSH server is not
up and running. Maybe the hard disk is dead after all.

Hang on. *Connection refused*. That's good. That means something
is letting traffic in on ports 80 and 22 and is responding to tell you to
go away.

I'll take a grumpy server over a silent server any day. A connection timeout
would be bad. Having a connection refused is almost worth celebrating.

### Epilogue

Things I have to do:

- Never leave any non-essential cron job in place if you're not going
to be around to pick up the pieces when it goes wrong.
- Put in place a monitoring system so that I receive SMS alerts
when something bad goes wrong.
- For now all is ok, everything is working just as well as it ever has. And
for a free, beta service it's doing well.
