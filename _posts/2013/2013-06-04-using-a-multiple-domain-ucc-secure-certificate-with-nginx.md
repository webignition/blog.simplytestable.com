---
layout: default
title: "Using a Multiple-Domain (UCC) Secure Certificate With Nginx"
author:
    name: Jon Cram
    url: https://github.com/webignition
---

### Introduction

I recently finished setting up some of the most important Simply Testable web services
to use SSL (or HTTPS if you prefer).

This means that the following domains are now all being served over SSL:

- [https://simplytestable.com/](https://simplytestable.com/)
- [https://www.simplytestable.com/](https://www.simplytestable.com/)
- [https://gears.simplytestable.com/](https://gears.simplytestable.com/)
- ~~[https://app.simplytestable.com/](https://app.simplytestable.com/)~~


Sidenote1: I haven't yet set up SSL for app.simplytestable.com as I didn't
quite set up the correct subject alternative names for the secure certificate
and at present my secure certificate doesn't cover app.simplytestable.com.

Sidenote2: I couldn't secure help.simplytestable.com and blog.simplytestable.com
as these static sites are hosted on [GitHub Pages](http://pages.github.com/)
which can't support SSL.

Here's a quick run through of how I went about choosing the correct type of secure certificate
and then setting up Nginx to use a single certificate to for multiple related domains on the same host.

### Choosing the type of certificate to use

It's been a while since I bought a secure certificate. When I last did
so there were two options to consider if you wanted to secure more than
one hostname under the same domain:

- for N hostnames, get N single-domain secure certificates
- get a single wildcard secure certificate covering *.example.com


There's now a third option thanks to the [subject alternative name](https://en.wikipedia.org/wiki/SubjectAltName)
extension to X.509.

This extension allows us to opt for a single secure certificate that
is valid for a collection of listed hostnames. This is called a unified
communications certificate (UCC).

From examining various secure certificate providers I noticed that a
UCC secure certificate covering a small collection of domains is significantly
cheaper than a wildcard certificate (and significantly significantly cheaper
than multiple single-domain certificates).

As I have just one primary domain and three subdomains to cover (that's
four in total), I opted for a multiple-domain (UCC) secure certificate
from GoDaddy as it supports up to five related domains.

### Installing

<ol>
    <li>
        <h4>Pop your secure certificate on your server</h4>

        You will have received a <code>.crt</code> file from your
        signing authority. This is your secure certificate.

        Go ahead and pop this on your server. The location doesn't
        particularly matter so long as it is readable by Nginx.

        For convenience, I chose the same location I used when
        generating the certificate signing request.

        You'll also need to pop your secure certificate's <code>.key</code>
        file on your server too (this would have been created
        at the time you generated a certificate signing request). This
        also can go anywhere but popping it in the same location
        as your <code>.crt</code> file will make life easier.

    </li>

    <li>
        <h4>
            Create your certificate chain (optional)
        </h4>

        You may have to create your certificate chain.

        Whether you need to depends on whether the signing authority from which
        you purchased your secure certificate has used an intermediate
        certificate that is not present in the certificate base of well-known
        trusted certificate authorities which is distributed with a particular browser.

        There's no harm in chaining your own secure certificate with an
        intermediate certificate. If you were given an intermediate
        certificate you should probably chain it with yours:

        Here's how I did that:

        <pre>cat simplytestable.com.crt gd_bundle.crt > simplytestable.com.chained.crt</pre>
    </li>

    <li>
        <h4>
            Reference the secure certificate and key at the <em>http</em> configuration level
        </h4>

        Most day to day Nginx configuration changes occur at the <em>server</em> configuration
        level. That's at the vhost level in Apache speak.

        We want to go one level up to from the <em>server</em> configuration level to the
        <em>http</em> configuration level so that the common secure certificate
        is available, when required, by all servers (or vhosts).

        The default Nginx configuration will include all <code>.conf</code> files found in <code>/etc/nginx/conf.d/</code>.
        These are interpretted at the <em>http</em> configuration level which is exactly
        what we need.

        I added the following in <code>/etc/nginx/conf.d/ssl.conf</code>:

        <pre>ssl_certificate     /home/simplytestable/ssl/simplytestable.com.chained.crt;
ssl_certificate_key /home/simplytestable/ssl/simplytestable.com.key;</pre>
    </li>

    <li>
        <h4>
            Update your <em>server</em> (vhost) to turn on SSL
        </h4>

        With the secure certificate referenced at the <em>http</em> level,
        the only change you need to make at the <em>server</em> level
        is to listen on the correct port and turn SSL on:

        <pre>server {
  # ...
  listen 443 ssl;
  ssl on;
  # ..
}</pre>
    </li>
</ol>

### Additional bonus configuration

The above will get your single UCC secure certificate working with multiple
domains on the same host on the same IP.

There are a handful of additional configuration changes I made.

These are not absolutely essential or are specific to running a PHP
application under Nginx and php-fpm and so they live here in the bonus
additional configuration section.

<ol>
    <li>
        <h4>Going full SSL (HTTPS only and no HTTP)</h4>

        <p>
        If you really want to ensure traffic between clients and your
        web server is encrypted and if you really want to prevent
        <a href="https://en.wikipedia.org/wiki/Man-in-the-middle_attack">man-in-the-middle attacks</a> (and why would you be using SSL otherwise?),
        you really want to ensure everything goes over HTTPS.
        </p>

        <p>
        We can do this by using two (instead of one) <em>server</em>
        record per site.
        </p>

        <p>
        One of the <em>server</em> server records is pretty much as it was
        before but operates on HTTPS only. The other exists solely to
        redirect HTTP traffic to HTTPS.
        </p>
        
        <p>
        You can probably achieve the same with just one <em>server</em>
        record but the resulting configuration will likely be overly complex.
        </p>

        <p>
        In general, replace this:
        </p>

        <pre>server {
  listen 80;
  listen 443 ssl;
  server_name example.com;

  # ...
}</pre>

        with this:

        <pre>server {
  listen 80;
  server_name example.com;
  rewrite ^ https://$server_name$request_uri?;
  }

server {
  listen 443 ssl;
  server_name example.com;

  # ...
}</pre>
    </li>

    <li>
        <h4>
            HTTPS the correct way with php-fpm
        </h4>

        <p>
        If you're running a PHP application under php-fpm you're probably
        using <em>fastcgi_param</em> directives to pass environment
        variables to PHP.
        </p>

        <p>
        Here's a cut-down <em>server</em> record I was previously
        using for a Symfony2-based application:
        </p>

        <pre>server {
  # ...

  # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
  location ~ ^/(app|app_dev)\.php(/|$) {
    fastcgi_pass   127.0.0.1:9000;
    fastcgi_split_path_info ^(.+\.php)(/.*)$;
    include fastcgi_params;
    fastcgi_param  SCRIPT_FILENAME $document_root$fastcgi_script_name;
    fastcgi_param  HTTPS off;
  }

  # ...
}</pre>
        <p>
        Notice the <code>fastcgi_param  HTTPS off</code> line?
        This sets the <code>_$SERVER['HTTPS']</code> environment variable
        in PHP.
        </p>
        
        <p>
        If you're serving your site over HTTPS and have the above (incorrect) configuration,
        you're likely to encounter your HTTPS traffic being interpretted
        at the application level as being within an HTTP (not HTTPS)
        environment.
        </p>
        
        <p>
        This can cause some interesting problems, such as HTTP to HTTPS
        to HTTP to HTTPs redirect loops or Nginx refusing to
        handle a plain HTTP request being sent to a HTTPS url. Neither is a good thing.
        </p>
        
        <p>
        This is the more correct (i.e. doesn't break the entire application)
        configuration as based on the above example:
        </p>

        <pre>server {
  # ...

  # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
  location ~ ^/(app|app_dev)\.php(/|$) {
    fastcgi_pass   127.0.0.1:9000;
    fastcgi_split_path_info ^(.+\.php)(/.*)$;
    include fastcgi_params;
    fastcgi_param  SCRIPT_FILENAME $document_root$fastcgi_script_name;
    fastcgi_param  HTTPS on;
  }

  # ...
}</pre>
    </li>
</ol>

### It's all quite simple really

Setting up Nginx to use a UCC secure certificate covering multiple
domains on the same host is dead simple.

I covered what I did above in some detail, but in essence all you need
to do is:

1. Pop your `.crt` and `.key` files
somewhere safe on your host in a location that is readable
by Nginx.
2. Reference these at the *http* level in the Nginx configuration.
3. Set your *server* record to list on port 443 and turn
on SSL.
4. Reload the nginx configuration: `sudo service nginx reload`
