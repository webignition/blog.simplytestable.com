---
title: "Installing The W3C HTML Validator With HTML5 Support (On Ubuntu)"
author: joncram
excerpt_separator: <!--more-->
---

We use the [W3C HTML validator](http://validator.w3.org/) for driving HTML validation tests.

We don't use the W3C public service at [http://validator.w3.org/](http://validator.w3.org/);
the usage limits imposed (quite fairly) by the W3C are too restrictive for our needs,
and the latency involved in sending HTML out to the Internet to be validated
increases by orders of magnitude the time it takes to complete an HTML
validation test.

We install a local copy of the W3C HTML validator and a local
copy of the [Validator.ru HTML5 validato](http://html5.validator.nu/).

If you want to frequently validate many HTML documents quickly, here's how
you can do the same.

<!--more-->

### Installing the W3C HTML Validator
    
Installing from the Debian package is a breeze: `sudo apt-get install w3c-markup-validator`

That'll get you the basic installation. The W3C HTML validator will now work
for *any* local virtual host via `http://{hostname}/w3c-validator/`.
    
### Configuring the W3C HTML Validator
    
The W3C HTML validator, by default, only accepts URLs of pages that
exist on the public Internet. I have no idea why; if you're installing
the validator locally, might you be wanting to validate locally-hosted
HTML?
    
`GET http://local.simplytestable.com/w3c-validator/check?uri=local.blog.simplytestable.com`
        
> Sorry, the IP address of local.blog.simplytestable.com is not public.
> For security reasons, validating resources located at non-public IP
> addresses has been disabled in this service.
    
You need to tell the validator to allow local IPs. Edit `/etc/w3c/validator.conf`
and change `Allow Private IPs = no` to `Allow Private IPs = yes`.
    
### Installing the HTML5 Validator
    
The HTML5 spec is still under development and as such support is not provided
out the box. Let's try anyway:
    
`GET http://local.simplytestable.com/w3c-validator/check?uri=local.blog.simplytestable.com`
        
> Checking the Document Type of this document requires the help of an
> external tool which was either not enabled in this validator, or is
> currently unavailable. Check in the validator's system configuration
> that HTML5 Validator is enabled and functional.

Looks like we need to install the [Validator.ru HTML5 validator](http://html5.validator.nu/).
    
    
The HTML5 validator uses a bit of an ad-hoc build system dependent on Python,
Mercurial and Subversion. Make sure these are installed:    
    
`sudo apt-get install mercurial subversion python`

The validator is Java-based, so check first that that you have a JDK available and check the
location. It's probably to be found at `/usr/lib/jvm/java-6-openjdk`. Once you're ready, follow the
[http://about.validator.nu/#src](installation instructions).

You'll need to make a directory into which to install the HTML5 validator.
Anywhere will do, I opted for `/usr/share/html5-validator`.
    
Running the following as root worked for me:

```bash
mkdir /usr/share/html5-validator && cd /usr/share/html5-validator
export JAVA_HOME=/usr/lib/jvm/java-6-openjdk
hg clone https://bitbucket.org/validator/build build
python build/build.py all
python build/build.py all
```
    
You'll end up with the HTML5 validator running in a standalone web server on port 8888:
    
```
2012-08-13 14:28:19.514:INFO::jetty-6.1.26
2012-08-13 14:28:19.549:INFO::Started SocketConnector@0.0.0.0:8888
```    

### Running the HTML5 Validator as a Service
    
I want the HTML5 validator available all the time without having to keep
a terminal window open and without needing to manually start up the
validator every time a worker server starts up.    
    
To do this, you need an init script to start up a daemon. I created
`/etc/init/html5-validator.conf` containing:

```
description "Validator.nu HTML5 Validator"

start on runlevel [234]
stop on runlevel [0156]

chdir /usr/share/html5-validator
exec python build/build.py --control-port=8889 run
respawn
```
    
I can now start/stop the HTML5 validator using: `sudo service html5-validator start/stop`
    
### Configuring the W3C HTML Validator for HTML5
    
One last step: we need to enable HTML5 validation for the W3C validator.    
    
Simply edit `/etc/w3c/validator.conf` and uncomment the line `HTML5 = http://localhost:8888/html5/HTML`. That's it.
    
Let's give things a go again:
    
`GET http://local.simplytestable.com/w3c-validator/check?uri=local.blog.simplytestable.com`

        
> Line 619, Column 172: An img element must have an alt attribute,
> except under certain conditions. For details, consult guidance on
> providing text alternatives for images.
    
Excellent. The W3C HTML validator is running locally and is handling HTML5
documents. Now I just need to make sure the markup I'm making is valid.
