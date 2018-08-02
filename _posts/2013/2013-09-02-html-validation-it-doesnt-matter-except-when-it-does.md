---
layout: default
title: "HTML Validation - It Doesn't Matter (Except When It Does)"
author:
    name: Jon Cram
    url: https://github.com/webignition
---

### Preamble

I've been preparing an introductory email-based course to help new
users get the most out of what Simply Testable offers.

As part of this exercise, I've been thinking a lot about the importance
of HTML validation.

As anyone who has been building websites for a non-trivial amount of time
knows, valid HTML is not necessary. Not even a bit. Not even a little bit.
Not even a little, little bit.

People make, and tools generate, bad (technically invalid) HTML. Browsers
need to display web pages as best they can to as many people as they
can.

The end result is that browsers are very good at compensating for
bad HTML and rendering, at the very least, a good approximation of
what the author intended if not the exact thing the author intended.

In general, valid HTML doesn't matter. Except when it does. Let me explain.

### Quick Disclaimer

I make my living building and providing a full-site frontend automated
testing service. Part of this service includes HTML validation.

You might think that this makes me a a little biased. If I can convince
the world that valid HTML is a necessity I can convince more people
to use my services and as result I can make more money.

It's true that, in general, the more people that use my service the
more money I make. But quite frankly I could make a heck of a lot more
money building other tools, or taking on short-term high-rate software
development contracts.

The money is important but it's not just about the money.

I make websites
too, just like you do. I want to make it easier for me to produce
increasingly better and better quality websites, just like you do.

I know quite well that striving for perfectly-valid HTML for the sake
of it is a waste of my time and not a requirement that would make my life easier.

### Valid HTML Is Not a Necessity

At times like this I wish there were a greater range of terms in common
use that could be used to describe the correctness of HTML.

With respect to HTML specifications, a given document is either valid
or is not. There's no in-between. There's no valid-enough-for-now and
there's no valid-as-far-as-I-care.

That's not how we work in the real world.

Does my HTML5 markup contain an empty title element like this `<title></title>`?
The current working draft of the HTML5 specification would tell me
that my HTML is invalid if it contains an empty title element.

If this minor invalidity makes no difference to people being able to
buy the latest Widget<sup>&trade;</sup> from my website, why should
I invest company time and effort (read: money) into fixing this?

This type of mistake could be classed as invalid-but-doesn't-matter
or invalid-but-who-cares.

You may well find that most of the HTML validation issues you encounter
fit into the &quot;don't care&quot; family of classifications. Except
when you run into something about which you do care.

### It's The Bugs

Absolutely the only time I've ever needed to care about HTML validation
is when dealing with bugs.

We've all found ourselves in the following situations:

- your lovely new creation works perfectly in Chrome and FireFox
but fails to behave in Internet Explorer
- everything looks as the design lead intended in Chrome but is a
bit off in FireFox; you know it works just fine and (perhaps)
the end users won't mind or notice but your client will and
they won't sign off on the project until you fix it
- your client uses only Safari on OSX, discovers some
rendering inconsistencies, claims them all to be critical
issues and won't sign off on the project until you fix it

And those are (just) presentational issues that your inner engineer knows don't
matter as much as your client or project manager says they matter.

Ever built a form with multiple submit buttons and later noticed that
the correct server-side action is not picked up when using Internet
Explorer?

Those are no longer visual issues; we're now talking  about functional
concerns. Visual concerns can be subjective, but functional issues &hellip;
well &hellip; it either works or it doesn't. And not working is not an option.

So what's the cause of these issues? Invalid HTML? Bleeding-edge CSS3?
Buggy JS making a mess of your DOM?

Could be any of the above, could be neither, could be something else.

### Gathering All The Information

Diagnostic tools are wonderful.

You can poke and prod something for an indeterminate amount of time until
you chance upon the fault. Or you can run a set of diagnostics, get on
with something productive whilst that happens, and later review
the diagnostic report and take action based on actual evidence
regarding what is right and what is wrong.

That's how modern auto mechanics identify many faults.

And that's the basis for many aspects of modern software development processes.
Make a change, run unit tests and integration tests, review the results
and fix or deploy accordingly.

Discovered you have a rendering issue with your new website? Things
work as expected in Chrome and FireFox but, yet again, not Internet
Explorer?

Run some diagnostics, get on with something productive whilst that
happens, and later review the diagnostic report and take action based on
actual evidence regarding what is right and what is wrong.

### Making Well-Informed Decisions

Do you know which pieces of invalid HTML are safe to ignore and not fix?
Probably not.

It still doesn't matter if your HTML is valid or invalid. It never did.

What does matter is that when facing an issue or bug you have all
the relevant information to hand.

Is this issue I'm seeing due to invalid HTML? Having a quick
way of answering that does help.
