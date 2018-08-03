---
layout: default
title: "Switching From Apache To Nginx on Ubuntu Server"
date: 2012-10-17 15:30
author: joncram
illustration:
    url: https://i.imgur.com/25IpV.png
    style:
    height: 240px
---

We're changing the web server Simply Testable uses from Apache to Nginx.

Why? The straightforward reason is that we have many, many concurrent
web requests to handle, often over 100 concurrent requests. Nginx uses
fewer server resources to cope with this load than Apache.

The Simply Testable system uses a collection of Symfony applications
and a local install of the W3C validator.

Here's how I migrated our production server from Apache to Nginx without
any downtime. If you have an Ubuntu server running a comparable set of
applications, this is one way to go about it.

### Keeping Some Applications (W3C Validator) on Apache

We can't ditch Apache just yet. The W3C HTML validator uses quite a specific
Apache configuration that I haven't, as yet, managed to replicate under
Nginx.

That's not a problem, we can still use Apache to run the W3C HTML validator
so long as it runs on a different port to Nginx. Nginx will run on the
default HTTP port of 80, so we're going to switch the HTML validator to
accept requests on port 8090. Anything other than 80 that's not being
used will do fine.

To get Apache listening on the correct port ,edit `/etc/apache2/ports.conf` and add in:

    NameVirtualHost *:8090
    Listen 8090

And then to get your relevant vhost using that port, edit the relevant
vhost record in `/etc/apache2/sites-available`, changing
`<VirtualHost *:80>` to `<VirtualHost *:8090>`.

Don't forget to test that the relevant application now works on the new port!

If you're using a firewall (you are, aren't you?), make sure the new port
is open to requests if that's what you want.

If you're using the ufw iptables interface: `sudo ufw allow 8090/tcp`.

### Installing Nginx

Nginx defers handling of PHP requests (or indeed any non-static content)
to whatever service you tell it to.

We're going to use [php-fpm](https://php-fpm.org/) for handling
PHP processes, the de-facto standard when using Nginx.

Install both nginx and php-fpm packages:

    sudo apt-get install nginx php5-fpm

### Setting up Nginx Vhosts Alongside Apache

We don't want any downtime, right? To achieve this, we're going to have
to set up under Nginx all the vhosts we want to migrate from Apache.

I'm going to initially run all the Nginx vhosts on port 81 and only when
that's all working nicely switch over to port 80.

You need to jiggle things a bit to get the production URLs that Symfony
expects. Here's an example vhost for one of the workers from `/etc/nginx/sites-available/lithium.worker.simplytestable.com.conf`:

    server {
      listen 81;
    
      server_name lithium.worker.simplytestable.com;
      root /var/www/lithium.worker.simplytestable.com/web;
    
      error_log /var/log/nginx/lithium.worker.simplytestable.com.error.log;
      access_log /var/log/nginx/lithium.worker.simplytestable.com.access.log;
    
      # strip app.php/ prefix if it is present
      rewrite ^/app\.php/?(.*)$ /$1 permanent;
    
      location / {
    index app.php;
    try_files $uri @rewriteapp;
      }
    
      location @rewriteapp {
    rewrite ^(.*)$ /app.php/$1 last;
      }
    
      # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
      location ~ ^/(app|app_dev)\.php(/|$) {
    fastcgi_pass   127.0.0.1:9000;
    fastcgi_split_path_info ^(.+\.php)(/.*)$;
    include fastcgi_params;
    fastcgi_param  SCRIPT_FILENAME$document_root$fastcgi_script_name;
    fastcgi_param  HTTPS  off;
      }
    }

Once you've created a vhost, you need to enable it in Nginx and then
tell Nginx to reload its configuration. Enabling involves symlinking the
vhost configuration in `/etc/nginx/sites-available` to `/etc/nginx/sites-enabled`

    ln -s /etc/nginx/sites-available/simplytestable.com.conf /etc/nginx/sites-enabled/simplytestable.com.conf
    /etc/nginx/sites-available

As before, check after you enable a vhost that it works, and make sure
your firewall is accepting connections on the port the vhost is using.

Once you're done, you should have all the sites you want running under Nginx
to be actually running under Nginx, temporarily on port 81.

### Switching From Apache to Nginx

We want to disable all sites running under Apache on port 80 and have all
sites running under Nginx to be served on port 80.

Given that vhost configuration changes for both Apache and Nginx are not
brought into play until we tell the relevant web server to reload, this
should be pretty straightforward.

1. Update Nginx vhosts to use port 80
2. Disable all Apache vhosts that are using port 80
3. Reload Apache config
4. Reload Nginx config

We're going to have a tiny amount of a delay before the Nginx config is reloaded.
It should be insignificant.

Go on, do it.

### Epilogue

The change didn't go quite as smoothly as I'd hoped.

The Nginx vhost for
simplytestable.com wasn't configured correctly, preventing Nginx from starting correctly.
It took a bit of trial and error to spot this but once spotted things
worked perfectly until they broke.

The default php-fpm configuration allows for up to 10 child processes
at once. This is conceptually the same as the limit on the number of processes
Apache might be allowed to use.

The php-fpm logs drew attention to this fact when things ground to halt
running a handful of concurrent full-site tests. Editing `/etc/php5/fpm/pool.d/www.conf`
and setting `pm.max_children = 50` sorted that out.

### Was it Worth it?

Yes.

Definitely yes.

Server load under Apache was 30 for 4 concurrent tests. Server load under
Nginx for 4 concurrent tests is 3. That's an order of magnitude better.

Server load under Nginx for 20 concurrent tests peaked at about 14 with
tests still completing smoothly. Under Apache, 20 concurrent tests
caused a server load of about 80, brought the server to its knees and
slowed all tests down significantly.

So, yes, it was worth it.
