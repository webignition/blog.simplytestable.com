---
layout: default
title: "How To Test A Local Site"
date: 2012-10-31 13:30
author: joncram
---

I've been asked a few times if it's possible to test a local website. You can. Here's how.

### tl;dr version

Have the domain of the site you want to test resolve to your local machine. A subdomain might be
better than your main domain.

We will never be able to test http://localhost; that's not how the Internet is. That's fine as
that's not how the world is supposed to work. Read the previous paragraph again for the solution.

### Full version

We don't care where your site is located.

It could be in a fancy data center, it could be
on a test server in your company's basement, it could be being served from the very
computer you're at right now.

Or the Moon. Put your site on the moon and we still don't care. Or Mars. Don't care.

We don't care where your site is located because it doesn't matter where your site
is located. That's a big part of how the Internet works.

It doesn't matter if your site is being served from a server in Berlin any more or less
than if your site is being served from Singapore, London, Sydney or Port Talbot in South
Wales.

Similarly, it doesn't matter if your site is being served from the computer you're
at right now, your company's continuous integration server, your Nexus 7 or the
ATM down the street.

We do care that your site is routeable over the Internet. We need to be able to
talk to your site over the Internet.

This shouldn't be a problem for you. Just make sure that the site you want to
test has access to the Internet.

We do care that your site is being served from a domain that resolves to
your IP address.

This also shouldn't be a problem for you and here's why.

Let's say you own the domain 'example.com'. You're building a new
version of the example.com website. You've got a copy of the new example.com
website running on the computer you're using right now.

The computer you're using right now is connected to the Internet. So far so
good, we're half way there.

Your local site is not being served from a domain that resolves to your local
IP address. No problem, that's easily solved.

1. Edit your domain name, creating a new A record for the subdomain
   'local.example.com'. It doesn't have to be 'local', it can be anything.
   Pick whatever you like.
2. Have 'local.example.com' resolve to your Internet IP. Not sure
   what your Internet IP is? [Ask Google, it knows.](https://www.google.co.uk/search?q=what%20is%20my%20ip)
3. Edit your router's configuration, telling it to route HTTP traffic
   (port 80 and, if necessary, port 443) to the local IP address
   of the computer running your local site.

That's it. You have a subdomain that allows communication over the Internet
to a computer on your local network.

You'll have to make sure that the web server you're using is configured
to serve up the right site for the subdomain you've chosen. That's dead easy,
requiring you to pop in an additional `ServerName` line in
your Apache vhost or add to the `server_name` line in your Nginx
vhost.

All done.
