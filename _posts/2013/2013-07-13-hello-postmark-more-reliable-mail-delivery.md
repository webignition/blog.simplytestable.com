---
layout: default
title: "Hello Postmark, More Reliable Mail Delivery"
author:
    name: Jon Cram
    url: https://github.com/webignition
illustration:
    url: https://i.imgur.com/dWwJmHF.png
    style:
        height: 280px
---

### Moving to More Reliable Mail Delivery

The Simply Testable applications send a few commonplace transactional
emails such as password reset reminders and account creation confirmations.

I initially sent such mail through the SMTP services of a shared hosting service I run.

To begin with, this was fine. It took all of a few minutes to set up,
I knew it worked and it gave me server-level access to mail logs that
allowed me to verify that mail was going where it should when it should.

This worked fine until it didn't.

### 550 IP &lt;removed&gt; listed in DNSBL bb.barracudacentral.org

Well crap.

Some people maintain lists of mail server IP addresses they think are
naughty and other people who run mail services might use such lists to
decide whether or not to accept mail from SMTP servers on such lists.

No matter how good your intentions, if you run a shared hosting service
you will periodically run into bad people who use your services to send spam.
You catch such matters, clear up the mess and continue on your way.

Except in this case there is one blacklist that continues to list my
SMTP server's IP no matter what I do.

This might be right, this might be wrong. I can do nothing either way.

If you've failed to receive an account creation confirmation email or a
password reset email this may well be why.

What I can do is move to sending Simply Testable transactional emails
through a more reliable service.

### Hello [Postmark](https://postmarkapp.com/)

As of a few minutes ago, all Simply Testable transactional emails
are being sent using [Postmark](https://postmarkapp.com/).

I had to jump through some hoops to verify the sender's address. This
makes me confident that people are highly unlikely to use Postmark to
send spam and as such it should be a highly reliable delivery mechanism.

And with premium plans just round the corner, we'll also be sending
emails telling you if a subscription payment failed and that's too
important to risk getting lost.

Most of you won't notice anything different but overall I'm glad to have
increased by just a little the quality of service. That can't be a bad
thing.
