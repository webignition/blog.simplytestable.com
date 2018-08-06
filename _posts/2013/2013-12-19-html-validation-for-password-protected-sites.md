---
title: "HTML Validation For Password-Protected Sites"
author: joncram
---
    
I've been working for the past two or so weeks on adding the ability to
run tests against password-protected sites.

After quite a bit of behind-the-scenes work to store global test
parameters and to make them available to the right places at the right
time, I'm now happy to say that site-wide and single-URL HTML validation
for password-protected sites is available!

For those who don't want to read too much, here's a quick video
demonstrating the testing of [http://http-auth-02.simplytestable.com](http://http-auth-02.simplytestable.com/)
(username: example, password: password).

Read on to find out what this means (and what it doesn't mean!) and how this lets
you test now what you couldn't test before.

<iframe class="video" height="480" src="http://www.youtube-nocookie.com/embed/azb_eG1Emk8" style="border: none;width:100%;"></iframe>

### What Can Be Tested (And What Cannot)

I mentioned that HTML validation now works for password-protected sites.
I need to define what "password-protected" means so that you know what
to expect.

The short and very technical answer is that this covers HTTP authentication
as specified in <a href="https://tools.ietf.org/html/rfc2617">RFC2617</a>,
covering both <a href="https://en.wikipedia.org/wiki/Basic_access_authentication">basic access</a>
and <a href="https://en.wikipedia.org/wiki/Digest_access_authentication">digest access</a> authentication.

You'll most commonly see these means of authentication in cases
where your browser itself displays a username/password dialog box directly
as opposed to the site you're visiting presenting a nicely-styled
login form within a page.

If you've ever edited a <code>.htaccess</code> file, and possibly generated a corresponding
<code>.htpasswd</code> file, you've been using these means of authentication.

I chose to go with supporting these authentication methods for a couple
of reasons:

- it's a standards-based approach that requires no special knowledge
  of the site or page being tested
- HTTP authentication is a common approach for temporarily limiting
  access to publicly-available staging sites (and where such sites
  can really benefit from thorough testing)

What this new feature covers: any page or site that uses standard HTTP
authentication.

What this new feature does not cover: any page or site that uses a
custom login form.

### Starting a Test For a Password-Protected Site

Below the pre-existing options to select what to test are new options
to provide authentication credentials, revealed by clicking 'set
authentication options':

<img class="img-fluid" src="https://i.imgur.com/NXjwkAy.png">

Enter the required credentials and then you can start a new test as usual:

<img class="img-fluid" src="https://i.imgur.com/1loQ1Al.png">

You'll notice as you do this that all types of test apart from HTML
validation are disabled.
At present it is only HTML validation that works flawlessly with password-protected
pages and sites.

### A Quick Note On Security

The short version: HTTP authentication credentials you provide
for the testing of password-protected sites are intentionally not
stored securely and are assumed not to provide access to sensitive
information.

As noted above, a common use case for HTTP authentication is to provide
limited access to a publicly-accessible staging site. This is a common
approach for people who develop websites and is precisely the audience
we're looking to serve with this new feature.

In such a situation, you put a straightforward authentication system
in place to keep your soon-to-be-public but as yet unfinished work
from being accessed by the general public.

Such sites are  ephemeral in nature, contain information intended eventually for
public consumption and which don't inherently hold any details
that are intended to be kept private. You'd rather the username and password is not known to everyone but it
really doesn't matter if people come to find them out.

We assume HTTP authentication credentials provided to us as a means
of allowing you to run automated tests against a password-protected site
are not considered sensitive information.

We need to store the credentials you enter to be able to
access your password-protected site.

Credentials you enter are stored indefinitely by the core application,
that is the central hub of the Simply Testable system that manages
tests, so that they can be passed on to the worker applications
to carry out the actual testing and to allow you to easily re-test
after applying changes.

Credentials are stored temporarily by the worker applications whilst
a specific test is being carried out. Once the worker has reported
results back to the core application the credentials are deleted.

Credentials are stored in plaintext offering no security should our
system databases be accessed directly by a malicious third party.

Credentials are made available to the browser on the test results
page to facilitate re-testing. They will be available only to the
current user. If you are not logged in, the credentials you entered
can be accessed by anyone who views your test results (if you're not
signed in, they're not really your results, they're public and belong
to everyone).

If you are testing against a public staging site that uses HTTP authentication
and if you are comfortable relaying the credentials to a client via email you should
already be aware of the fact that the credentials are not sensitive
and can be discovered by a range of means independently of us.

If you wish to significantly limit who can potentially access the
credentials you supply you should [create a free account](https://gears.simplytestable.com/signup/) and run tests
only when [signed in](https://gears.simplytestable.com/signin/).
