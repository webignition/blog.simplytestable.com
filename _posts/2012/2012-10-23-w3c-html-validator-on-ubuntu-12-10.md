---
layout: default
title: "W3C HTML Validator On Ubuntu 12.10"
date: 2012-10-17 16:30
author: joncram
excerpt_separator: <!--more-->
---
I recently upgraded all local development and CI systems from Ubuntu 12.04
to Ubuntu 12.10.    

This killed the local installations of the W3C HTML validator. If the
same happened to you, here's how to fix it.    

<!--more-->

### The Problem
    
The package responsible for providing `/usr/share/xml/xhtml`
was removed. This causes the W3C HTML validator to fail as it requires
the above directory to be present in order to find various document type
definitions.

It gets a bit worse: the above directory is removed when installing the `w3c-markup-validator` package.
    
### The Solution
    
We need to get `/usr/share/xml/xhtml`
back, copy the files we need somewhere safe, reinstall the W3C HTML validator
package and then copy the files we need back to where they should be.

1. Get `/usr/share/xml/xhtml` back:
```
sudo apt-get install w3c-dtd-xhtml
```
2. Copy the files we need somewhere safe:
```
cp -R /usr/share/xml/xhtml /usr/share/xml/xhtml.bak
```
3. Reinstall the W3C HTML validator:
```
sudo apt-get remove w3c-markup-validator
sudo apt-get install w3c-markup-validator
```
This will cause `/usr/share/xml/xhtml` to be removed!
4. Copy the files we need back to where they should be:
```
cp -R /usr/share/xml/xhtml.bak /usr/share/xml/xhtml`
```
    
You should find your local installation of the W3C HTML validator now works
under Ubuntu 12.10.
