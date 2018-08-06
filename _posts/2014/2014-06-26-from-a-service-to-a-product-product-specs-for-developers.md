---
title: "From a Service to a Product (Product Specs For Developers)"
author: joncram
illustration:
    id: product-spec
    url: https://i.imgur.com/HgeIf14.png
    style:
        background-size: "100%"
        background-position-y: 0
---
    
[Simply Testable](https://simplytestable.com/) from the perspective of a service offers automated frontend web testing.
From the perspective of a product, Simply Testable offers the aforementioned service at a cost in a way that provides
 value to the user.

I need to figure out how to demonstrate the value of the service in a way that shows it offers to the user
greater value than the given cost.

This is a difficult process for me as it is quite different from my development-oriented background. *I can't code
up solutions to these problems.*

This blog has always meant to be an open history of the development of Simply Testable. I'm going to document
the process I've been going through, looking at the changes I'm making and the methods I'm using to acquire new
users.

I plan for this to be an on-going series and I'll start out today by explaining how I specified the product
through the creation of an [account benefits](https://simplytestable.com/account-benefits/) page.
I'll follow this up in a future post with details of a cold email campaign currently being planned and with subsequent promotional
schemes as and when they happen.

### What's a product spec?

In the same way that it is hard as a developer to fully understand a new project without some form of spec, it
is hard for potential new users to understand your product without a spec.

The product spec naturally leads to service level comparison pages, obvious promotional campaigns and
tailored landing pages.

Make a note of that: you need a spec of your product.

We're not talking about a spec for the software you're building. We're talking about a spec for the product
you're selling. These are different specs for different audiences and with different goals and they don't
necessarily need to match up.

A product spec covers feature checklists and high-level functionality. A product spec is the basis for a comparison
page for your different levels of service.

### Gathering features for the product spec

I didn't set out with the intention of creating a product spec. My intention was to create a page highlighting
the benefits of creating an account. This turned out to be a product spec but I didn't realise that at the time.

A bit of context: we offer a public demo that anyone can use (it's what you see when you [use the service](https://gears.simplytestable.com/) without
signing in), a free private level and a choice of paid levels.
The public demo is limited in the range of features and the depth of features - you can't do as many types
of things with the public demo and you can't do as many of those things.

The public demo quite clearly tells you that it is a demo, that it is limited and that you should create a free
account to get past some of the limitations. I needed a page to link to in such contexts.

I started out with the pre-existing [pricing and plans](https://simplytestable.com/plans/) page.
This details three levels of paid account levels and points out the two differentiating factors between them.
I had wanted to keep the pricing page short and simple and intentionally avoided listing all the common factors.

I expanded the two differentiating factors into a list of 14 points covering the types of tests that can
be carried out, how the pages to be tested are discovered and the ways in which HTTP requests can be controlled
during tests.

This was the start of the product spec.

### Forming the product spec

A list of 14 points about the service won't necessarily lead straight to a product spec. I stared at my list
and it looked just like a list.

Categorise them, sort them, arrange them.
I wrote each feature on a slip of paper and grouped them by similarity giving me five feature categories.

Along the way I added two further features. They worked well with the categories and they seemed like suitable features
that should be available only at paid levels. One of these new features was that the testing of HTTPS sites which
is available only at paid levels.

The result is a set of 16 features grouped by category. It is an easily-understandable overview of the product
as a whole.

*Note: a long image follows. This post continues after the image. This is not the end.*

<img src="https://i.imgur.com/HgeIf14.png" class="img-fluid" alt="">

### The spec doesn't need to match reality

I follow an agile approach. Features, changes and bugs are all listed in an instance of [Redmine](http://www.redmine.org/)
and are worked through by priority. Deployments are small and frequent.

The above comparison table lists some features that don't exist or aren't enforced. I wanted to publish the comparison
table and didn't want to have to work on a series of changes to make the product match the spec before the
comparison table was published.

I felt that the comparison table would be useful to users right now and felt that the changes required to make
the product match the spec would be too large to make for a quick easy-to-verify deployment.

So I published the comparison table and linked to it from various "this is a limited demo" notifications
without making the product match the spec.

This might not work in all cases. I wouldn't recommend publishing a public spec that includes features
that simply don't exist. But in cases where the missing features are not a detriment this isn't a problem.

For example, the spec states that you can only test HTTPS sites if you have a paid account. That's wrong.
You can test HTTPS sites with any level of account. You can even do so with the public demo.

The spec also states that demo test results are available only for 24 hours, tests carried out under free accounts are available
only for 7 days and tests carried out under paid accounts are available forever. That's also not the case.
All test results are available forever.

In this case the lack of such features is not detrimental. Users are currently getting for free
features that they would otherwise have to pay for.

### The product spec leads to clear product delineation, promotional campaigns, landing pages

From a glance at the spec it is clear what are free features and what are paid features.

This helps assign value to the paid levels. This also helps a potential user see if the service is a fit
for their needs and their budget.

From the product spec, I can now easily identify promotional campaigns and their related landing pages due
to the grouping and categorisation of features.
