---
layout: default
title: "Creating and Using a Github OAuth Token With Travis And Composer"
author:
    name: Jon Cram
    url: https://github.com/webignition
---

### Introduction

I use [GitHub](https://github.com/) to host the open source
code repositories for the Simply Testable applications and a collection of
self-contained libraries created for the applications.

I use [Travis CI](https://travis-ci.org) as a secondary continuous
integration (CI) service to help ensure that each Simply Testable application
works in isolation as expected when code changes are made.

I also use [Composer](http://getcomposer.org/), the de-facto
PHP dependency manager, to manage the dependencies for the Simply Testable
applications and each self-contained library.

When code changes are pushed to GitHub, a new Travis CI build is started
and the Travis pre-test script calls Composer to pull in all the required
dependencies before running relevant unit tests.

Travis builds occasionally fail due to GitHub API limits being reached. By
default Composer authenticates anonymously with GitHub when pulling in
dependencies. Only 60 such anonymous API calls are allowed per IP address
per hour.

I recently read about how you can 
[configure Composer to use a GitHub OAuth token](http://drafts.easybib.com/post/38230669404/composer-github-travisci) 
so that authenticated, and non anonymous, API calls are made. This
increases the per-hour API limit from 60 to 5000.

What the article didn't cover, at least in enough detail for me, was the
exact steps needed. Although it didn't take me long to figure it out, I
thought I'd cover it all as this might be useful to others.

Here's a step-by-step guide to creating a GitHub OAuth token, using the
token with Composer and getting this all to work within the Travis build
environment.

### 1. Create a GitHub OAuth Token

Make a POST request to `https://api.github.com/authorizations`:

    curl -u 'githubuser' -d '{"note":"Travis Composer 2"}' https://api.github.com/authorizations

Update: thanks to Lee Davis for adding a tip for Windows users:

<blockquote>
If using the windows curl client be sure to escape the json you send, else you get the following error from github.
<pre>
{
"message": "Problems parsing JSON"
}
</pre>

curl -u 'githubuser' -d '{\"note\":\"Travis Composer 2\"}'
</blockquote>

Replace *githubuser* with your own GitHub username, enter your
password when prompted and you should get a response similar to this:

<pre>{
  "created_at": "2013-01-04T18:00:28Z",
  "app": {
"url": "http://developer.github.com/v3/oauth/#oauth-authorizations-api",
"name": "Travis Composer (API)"
  },
  "url": "https://api.github.com/authorizations/1047183",
  "token": "<strong>ebab4dc37e654bb230a9c69ebcd5f38e9a81e210</strong>",
  "updated_at": "2013-01-04T18:00:28Z",
  "scopes": [

  ],
  "note": "Travis Composer 2",
  "id": 1047183,
  "note_url": null
}</pre>

The generated token is the **40-character hash in bold**. The above is an example
only; yours will be different. Make a note of it.

Note that in the request to generate a new token we didn't specify any
permissions. This means the token will have public (read-only) access
by default which is just what we want.

### 2. Test Your New Token

It could take an annoying amount of investigation work to spot that your
token was copied incorrectly or otherwise doesn't work. Test it out now,
it won't take 2 seconds.

<pre>
curl -I -H "Authorization: token <strong>put your token here</strong>" https://api.github.com/repos/githubuser/repo-name/zipball/master
</pre>    

This will output the HTTP headers returned in response to your request.

    HTTP/1.1 302 Found
    X-RateLimit-Limit: 5000
    X-RateLimit-Remaining: 4985
    Location: https://nodeload.github.com/githubuser/repo-name/legacy.zip/master

If all went well, you'll notice you have an API rate limit of 5000 (instead
of the standard 60).

### 3. Configure Travis (Update your .travis.yml build file)

You need to update the Composer configuration in the Travis build
environment to use your new token.

It should be possible to do this solely by updating your .travis.yml build
file, however I found the syntax required to echo the required json string
into the Composer config file didn't work nicely within Yaml.

I instead opted for the easier option of storing the Composer config in
a file and copying this file to the location expected by Composer.

Create a file in your repository named .travis.composer.config.json containing:

    {
       "config":{
      "github-oauth":{
     "github.com":"your token"
      }
       }
    }

Replace *your token* with your actual GitHub OAuth token.

Now just add, or update, the *before_script* section of your
Travis build file to copy the Composer config to where it is needed:

    before_script:
      # Set the GitHub OAuth token to make use of the 6000 per hour rate limit
      - "mkdir -p ~/.composer"
      - cp .travis.composer.config.json ~/.composer/config.json

### That's it!

You will have to update the Travis build file for every project with
which you use Travis, but that's not too much effort to go to.
