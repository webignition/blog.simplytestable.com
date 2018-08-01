---
layout: default
title: "The Beginning"
author:
    name: Jon Cram
    url: https://github.com/webignition
excerpt_separator: <!--more-->
---
    
This is a story of how I came to be sitting here writing about developing
a brand new professional automated web front-end testing service.

I'm a software developer focusing on making software for the web.

As a developer, I test web sites. Testers (test engineers, quality assurance
people) certainly test more thoroughly and more effectively than I do, but
there's still a level of testing in which I get involved.

<!--more-->

I'll sometimes need to verify the validity of a given page's HTML as I'll
sometimes encounter bugs related to how a browser compensates for non-obviously
invalid markup.

I don't verify the validity of the HTML of a site too often. I should do more
often, but I don't. It's time consuming, it's boring relative to making cool
stuff (I've never known anyone to get a kick out of it), and it's sometimes
impractical on large sites (there may not be time to test every single page).

I love automation, I love continuous integration. It's magic.

My most recent job was with a small agency. Very small. Threre were no testers,
QA was ad-hoc. The impression was that there wasn't enough of a demand for
an actual tester.

I was the developer and I was the tester. It wasn't the most effective
arrangement for delivering quality but that's the way it was.

Thankfully I had relatively free reign to make things better. I automated and I loved it.

I put in place git for version control, Jenkins for continuous integration and
a slew of post-push Jenkins jobs per site to carry out a range of quality tests
that took on routine front-end testing.

An army of CI jobs jumped to action the instant changes were pushed to a central
git repository for a site.

I watched in fascination as the build for a site worked through every
single page examining technical aspects such as HTML validity and CSS validity
and non-technical quality aspects such as checking for the presence of about 4000
commonly misspelled words, the presence of a favicon,
apple touch icons, a robots.txt and the presence of Google Analytics JS.

I dabbled with automatically taking screenshots of every single page in a range of
browsers and was amazed to see this work.

I looked further at automating whichever aspects of manual testing I regularly
ran into and which I noticed were tedious. I know enough to see that a tedious
task is one I will do my best to avoid.

I investigated identifying all forms across a site and automatically submitting
forms with automagically-generated test data to examine correct form behaviour.
I investigated instrumenting page load performance to identify that which most
degrades page load performance.

None of these additional automated tests and quality checks were put in place.
Production work took priority.

And then I was made redundant. The agency wasn't winning the sort of projects
that demanded my level of experience. The agency tightened up on their core
competencies and there was no longer a need for me.

I've waded chest-deep in daily front-end testing I feel the pains it brings.
I've examined the tools available that offer really really simple
click-and-forget automated testing for entire sites and I've not been impressed.

I've talked with professional testers and hear the same level of frustration
at the lack of suitable zero-configuration simple tools for handling the tedious.

I've talked with developers who have walked away from employment to start
their own web agencies. Routine front-end testing is a common pain point; it's
not hard but it takes forever.

I still love automation. And now I have the time to make some useful tools.
And with a need to pay the bills I'm motivated to make something of this.

I also really enjoy it.
