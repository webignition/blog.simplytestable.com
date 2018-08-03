---
layout: default
title: "Down For Emergency Maintenance"
author: joncram
---

### Update 9 January 16 22:00 GMT

The service has now <a href="/service-restored/">been restored</a>.

### Update 8 January 16 15:50 GMT

All of the Simply Testable applications have been re-installed and
configured and appear to be working as expected.

I'd like to turn the service back on but for now I'd like to wait
to let the new hard disks sync the data between themselves to be
sure we're definitely starting out with working redundant hard disks.

I expect to be able to turn the service back on in about 2-3 hours.

### Update 7 January 16 10:40 GMT

The core application is installed and appears to be working.

Installing the worker applications that carry out the actual tests.

### Update 6 January 16 09:30 GMT

The Simply Testable core application is being installed.

### Update 5 January 15 22:00 GMT

Both hard drives in the production server have been replaced. Unfortunately,
to say the least, this puts us back at square one with a fresh install
and no past data.

I'll install the server operating system and required software now
and will continue in the morning with installing the Simply Testable
applications.

### Update 4 January 15 15:00 GMT

I'm not going to try to force-write the bad sectors. This will
certainly result in data corruption that might be recoverable but will
still result in the need to have a faulty hard disk replaced.

I'm currently investigating how to determine which if the two physical
disks in the production server is faulty and whether replacing the
faulty disk will allow the RAID array to rebuild with no data loss.

I'm waiting to hear from the data center with regards to these matters.

### Update 3 January 15 14:30 GMT

Long test finished early, it stopped at the first unreadable sector.

The only option I'm left with at this stage is for force-write the
unreadable sector to see if the hard disk can reallocate the sector to
a spare part of the drive.

If that works, there might only be MySQL data file corruption which
might be fixable, followed by a full backup and hard disk replacement.

If that doesn't work, the only option is to replace the hard disk.

### Update 2 January 15 14:08 GMT

Long test running with smartctl, will finish in about 4 hours.

### Update 1 January 15 13:50 GMT

I'm unable to copy the MySQL data file for backup, some parts of the data
file are on unreadable parts of the hard disk.

I'll run a full disk test.

### Original post

I've had to take the service down for emergency maintenance.

I noticed a couple of hours ago that the MySQL server was stuck trying
to read data from the disk. This is never a good sign.

After stopping all Simply Testable services and trying to restart MySQL
I saw that MySQL was failing to start due to it being unable to read
its data files. This is never a good sign.

A reboot of the production server followed by some quick hard disk tests
allowed the data files to be read once again. This was a bit promising.

I'm currently in the process of compressing (zipping) the MySQL data files
so that I can easily retrieve a backup.

Once the MySQL data file backup has been safely retrieved I'll run some
in-depth hard disk tests to identify whether the hard disk is in immediate
risk of failing. If so it will need replacing.

I'll keep the service down until I can determine if a hard disk replacement
is needed.

I expect the database download to take some hours with the resulting
full hard disk test taking a few hours longer still.

I'll update this post when more is known.
