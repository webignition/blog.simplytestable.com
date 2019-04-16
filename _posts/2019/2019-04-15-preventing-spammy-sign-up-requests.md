---
title: "Preventing Spammy Sign-Up Requests"
author: joncram
excerpt_separator: <!--more-->
---

To [sign up for a Simply Testable account](https://gears.simplytestable.com/signup/) you provide
your email address and choose an account password. Submission of that form is a sign-up request.

The submission of the sign-up form for purposes other than creating an account
is a spammy sign-up request.

We received about 3,500 spammy sign-up requests over the past 30 days. That's about 3,500 more
than I'd like.

We recently all but killed spammy sign-up requests through the use of:

- [a honeypot form field to prevent stupid bots](/preventing-spammy-sign-up-requests#honeypot-form-field-to-prevent-stupid-bots)
- [examining web server logs to identify form submitters](/preventing-spammy-sign-up-requests#honeypot-form-field-to-prevent-stupid-bot)
- [not blocking abusive IP addresses](/preventing-spammy-sign-up-requests#not-blocking-abusive-ip-addresses)
- [known-abuse checking via StopForumSpam.com](/preventing-spammy-sign-up-requests#known-abuse-checking-via-stopforumspamcom)

<!--more-->

### Honeypot Form Field To Prevent Stupid Bots

A stupid bot will examine a page for all fields of a given form, fill all fields and submit the form.

A honeypot form field is one that is hidden from regular users but which will be noticed by stupid bots.

The honeypot field of a form submitted by a regular user will be empty - the user would not have seen the field and
therefore would not have entered any information.

A honeypot field of a form submitted by a stupid bot - one that fills all fields of a form - will be non-empty.

Non-empty honeypot field → stupid bot → ignore.

This approach worked wonderfully for preventing spammy new test submissions for our demo.

For sign-up form submissions the exact same technique had little to no effect.

Conclusion: the sign-up form was being submitted by a clever bot or by actual people.

Whatever the actual reason, a honeypot wasn't the solution in this case.

### Examining Web Server Logs To Identify Form Submitters

I was really hoping that the spammy sign-up form submissions were not worldwide but were instead originating from a
small subset of IP addresses. I started to look for IP addresses.

```
cat /var/log/nginx/gears.simplytestable.com.access.log \
| grep "/signup/submit/" \
| grep "POST"
| wc -l
> 1184
```

Ok, 1184 log lines refer to the sign-up form being submitted. But who's doing it?

```
sudo cat /var/log/nginx/gears.simplytestable.com.access.log \
| grep "/signup/submit/" \
| cut -d "-" -f1 \
| sort \
| uniq -c \
| sort -rn \
| wc -l
> 40
```

A bit of an explainer: 
- `cut -d "-" -f1` splits each returned line on the `-` character and then selects first field which happens to be the
requester's IP address
- `sort` sorts the resultant list of IP addresses
- `uniq -c` excludes duplicate IP addresses and prefixes each with the frequency of occurrence
- `sort -rn` sorts each line (a line is now a number followed by an IP address) numerically, largest first
- `wc -1` counts the number of line

So, 40 different IP addresses are responsible for all 1184 sign-up form submissions. That is about 29 requests per
IP address.

Whilst some large organisations, maybe even some countries, expose only a small number of public IP addresses, I'd
still not expect such a high ratio of requests to IP addresses if each request was from a unique user.

Let's have a look at the actual frequencies for each IP address (actual IP addresses partially obscured):


```
sudo cat /var/log/nginx/gears.simplytestable.com.access.log \
| grep "/signup/submit/" \
| cut -d "-" -f1 \
| sort \
| uniq -c \
| sort -rn \

    378 ---.202.89.8 
    258 ---.201.224.205 
    234 ---.201.224.227 
     31 ---.184.238.78 
     31 ---.184.238.198 
     31 ---.184.238.169 
     30 ---.184.238.53 
     30 ---.184.238.236 
     30 ---.184.238.234 
     30 ---.184.238.185 
     28 ---.184.238.90 
     22 ---.138.188.34 
// ... single-digit frequencies ommitted for clarity
```

The top three requesters account for 870 requests, about 73% of all requests.

Those IP addresses are nothing but trouble. Let's just block those at the firewall level, right?

### Not Blocking Abusive IP Addresses

I decided against blocking any abusive IP addresses at the firewall level.

Issues include:

- blocking a single IP may block any number of bad users and any number of good users
- any block list has to be maintained

Remember that some large organisations, maybe even some countries, expose only a small number of public IP addresses?
A single public IP address could be the entry point to the Internet for many, many, many people. Some of those might
be bad people but probably not all.

Maintenance! It might be OK to block a specific IP address at the firewall level today. But tomorrow? Next week?

After how long do you re-check a previously-abusive IP address? In a day, in a week, in a month?  How do you even check
if a previously-abusive IP address is no longer a problem?

I can't answer these two questions without using the word "complicated" and so I'm not going down that route.

### Known-Abuse Checking Via StopForumSpam.com

When searching the web for some of the worst-offending IP addresses I stumbled across [StopForumSpam.com](https://www.stopforumspam.com/).

I noticed a very nice correlation: all of the high-requesting IP addresses were listed at stopforumspam.com as being
abusive with a 90%+ confidence level.

I created my own implementation of an integration with https://api.stopforumspam.com/api since none of the existing
open-source PHP implementations were quite flexible enough.

After creating the [sfs-querier](https://packagist.org/packages/webignition/sfs-querier) package and integrating
with the sign-up process a few days ago, the number of spammy sign-up requests dropped from around 40 per day to
about zero per day.

For users whose IP address is listed as being abusive at https://api.stopforum.spam.com/api can no longer create
an account. 

To be sure that legitimate, interested people are still able to create an account, an error message is shown asking
people to contact us to create an account manually. This is not ideal for those accidentally caught in the crossfire,
but looking at the characteristics of spammy requests I'm confident that pretty much zero people will be caught out
by this.

Success!
