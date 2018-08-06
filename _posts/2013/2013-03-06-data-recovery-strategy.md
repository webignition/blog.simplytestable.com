---
title: "Data Recovery Strategy"
date: 2013-03-06 13:00
author: joncram
excerpt_separator: <!--more-->
---

### Overview

In the middle of January we experienced [major downtime and data loss](/down-for-emergency-maintenance/)
due to the failure of both hard drives in our production server.

Although this was about as bad as it gets, I'm glad it happened now whilst
we're still somewhere between the alpha and beta stages and before we
introduced any paid plans.

At the time, the backup plan was &hellip; non-existent. There was no such
thing. My thinking at the time was that the risk of losing all
our data before I had a chance to put a backup plan in place was minimal
and that there'd be plenty of time to work on a recover strategy once the
service was generating revenue.

Clearly my thinking could not have been more wrong.

<!--more-->

Since then I've been working on a strategy for recovering from total
data loss. Taking backups and restoring from such backups turned out to be
just part of a much larger problem.

I'd like to present an overview now the recovery plan we'll be using and in a
future post I'll go into some detail on the choices that were made and how
I ended up with the plan as it currently is.

### We have a recovery strategy!

The good news is that we now have a recovery strategy. It's not fully in
place just yet. Don't worry, I'm taking relatively-regular backups of
essential data manually.

### Taking backups
- **Store critical application configuration**<br>
The Simply Testable applications are configured with details
such as database credentials and encryption keys. Critical application
configuration files are stored as without these much of the backed-up
data would be useless.

- **Stop or defer all operations that might change database contents**<br>
We're continually running full-site tests and as a result our
application databases are constantly changing.<br>
To maintain the integrity of backed up data, we need to stop
processing tests whilst a backup is running.

- **Backup all required data**<br>
Not all data is backed up. A full backup of the core application
database is currently around the 30GB size; too large for taking
regular backups.<br>
Backups exclude the raw output from the HTML and CSS validators
and from the JS static analyser related to any non-registered users.<br>
Backups are than around the 40MB size.

- **Resume operations**<br>
Test processing is resumed.

### Safely storing backups

Encrypted backup archives are stored on a backup server at the
data centre, are emailed to a GMail account and on a weekly
basis are retrieved and stored locally.

### Restoring backups

A suitable backup archive is placed on the production server and extracted.
A backup restore tool created for the purpose will recover the backed-up
application configuration and import the backed up application data.
