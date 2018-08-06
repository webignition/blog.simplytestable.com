---
title: "New Account Page"
author: joncram
excerpt_separator: <!--more-->
---

<img src="https://i.imgur.com/KlhXC0B.png" class="img-fluid">

The Simply Testable [account page](https://gears.simplytestable.com/account/) evolved slowly
as new features were added. It is now new again, shinier and easier to use. It wasn't always so.

<!--more-->

At first you could set your account email address and password. No other options were presented because
there was nothing else you could possibly change.

When premium plans were later introduced, details of your current plan accompanied by upgrade/downgrade
options and, where relevant, payment details, were added.

The account page grew to contain two sections not just one. This all worked nicely on a single page; two
columns, each with a distinct purpose and with nice whitespace separation.

Later came the inclusion of checkboxes to subscribe to, or unsubscribe from, occasional product announcements
and our weekly behind-the-scenes newsletter.

At three distinct sections, the account page still worked, more or less. It was starting to smell a little
busy, with a little too much on display at once.

With the recent work to introduce team collaboration, something had to happen. Adding a fourth section
to deal with teams wasn't going to work. Too busy, no clear focus. Confusion. Not good.

Something had to change and so I set about changing that something.

### My constraints

I started out by listing what I wanted people to be able to achieve and a list of constraints regarding how
the account page can be presented and interacted with. Design without constraints doesn't work.

My list of feature sections and constraints went something like:

- feature: change account details (email, password)
- feature: plan details (summary, upgrade/downgrade)
- feature: payment details (summary, option to change)
- feature: manage newsletter subscriptions
- feature: teams (create, invite people, join a team, leave a team)
- constraint: user must be able to easily find a feature section
- constraint: user must be able to easily focus on a task
- constraint: design must work on large desktop screens, laptop screens, tablets and smartphones

It was clear at this stage that the everything-lumped-together-in-a-sprawling-grid approach wasn't
going to work.

### Tabs solve everything (but not in this case)

<img src="https://i.imgur.com/ZM8kZOT.png" class="img-fluid">

My first thought: break out different sections into tabs. One tab per section of the account page.
Awesome!

If you click on the 'account details' tab, my brain pondered, you have the options to set your
account email address and password.

You can easily find the account details section since there is a whopping big set of tabs staring
you in the face. And after selecting the 'account details' tab, you can easily focus on the task
at hand as no other account sections are displayed.

Win win win win win.

Unless you're using a smartphone.

Ever tried implementing [Bootstrap's tabbed nav](http://getbootstrap.com/components/#nav-tabs) for smartphone screens?

Works like a charm if, and only if, you have a small number of tabs each with relatively short
labels such that the full width of the set of tabs does not exceed the width of the screen.

A set of tabs exceeding the screen width turns a sleek set of nav tabs into a disjointed pile
of confusion. It's much like pizza in this respect - fine when presented horizontally as a distinct
unit but quickly becomes less identifiable when the nice single item is split across
a collection of horizontal planes.

This is no criticism of Bootstrap - it works when used for its intended purpose otherwise it
doesn't. Nothing wrong with that.

Any solution that features multiple rows of tabs is not the right solution.

### Long-list approach

<img src="https://i.imgur.com/75Srfj0.png" class="img-fluid pull-left">

Taking a mobile-first approach I considered a long list of feature sections, taking the previous two-column
design and presenting it as a single column.

This works nicely on smartphone screens and my intuition, backed only by my personal experience
and the experience of friends and not backed by science, is that smartphone users are used to,
and comfortable with, vertical scrolling.

The illustration to the left demonstrates how the first two account sections appear as a single
screenshot. I did initially create a screenshot demonstrating the entire account page as displayed
on a smartphone but it was excessively long. Hopefully the concept is conveyed.

The long-list approach fails one constraint: the user must be able to easily find a feature section.

From a smartphone, you can only find a feature section scrolling until you run into it. Or, more
likely, flicking the screen to scroll quickly, stopping, scrolling back up, stopping, scrolling
back down a little bit.

I considered introducing in-page navigation to jump between sections, either as a drop-down
whatnot that stuck to the top of the page, a set of tabs (nope, ruled that out already) or possibly
an <a href="http://getbootstrap.com/examples/offcanvas/">off-canvas menu</a>.

I decided not to do so as:

- adding further interface elements could start to encroach on the sacred constraint of *thou
  shalt not increase the user's cognitive load through the introduction of further interface
  elements unless absolutely necessary*
- smartphone users currently make up just over 3% of the visitors to the page in question

A single long list of feature sections is what smartphone users get until I see more significant
numbers of smartphone visitors to the page.

### Adding in an affixed menu and scrollspy for larger screens

The width of a larger screen allows for the inclusion of a side menu.

Whilst this does introduce additional interface elements, a side menu is off
to one side isn't competing for attention with the main content. Lovely.

I decided upon a side menu to satisfy the constraint of allowing a user
to easily find a feature section. So far so good.

Relative to any recognised interface designer, I have no design skills and the creation
of a suitable side menu is something I can make a mess of if I'm given the chance.

With this in mind, I browsed the [Bootstrap documentation](http://getbootstrap.com/) for components
and patterns to fit the problem at hand and decided that the [affix](http://getbootstrap.com/javascript/#affix)
and [scrollspy](http://getbootstrap.com/javascript/#scrollspy) plugins would combine well.

The affix plugin helps to fix a side menu in place after scrolling a certain amount. This
ensures that the side menu is does not disappear from view when scrolling down a page.

The scrollspy plugin pays attention to the scroll position and allows for the element most near
the top of the viewport to be known such that it can be highlighted in the side menu.

Combine these two plugins and you can form a table of contents for a document that is always in
view and which highlights your current position in the document.

<img src="https://i.imgur.com/6JV2OBf.png" class="img-fluid">

### So that's the new account page

The new account page went live a couple of hours ago. You might notice
some mention of 'teams' in the screenshots.

That's a new feature
for sharing an account within an organisation which I'll write about over
the next couple of days.
