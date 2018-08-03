---
layout: default
title: "Choose HTML Validation, CSS Validation or Both"
date: 2012-11-28 14:00
author: joncram
---

Since the introduction of CSS validation two weeks ago, any new full-site
test ran both HTML and CSS validation for all URLs.

Not giving you any choice in the matter of which type of test to run
allow me to get CSS validation released more quickly.

The obvious downside of this is that any given full-site test will take
longer than needed if you want to carry out only HTML validation or CSS validation
but not both.

Today a change was introduced allowing you to choose the type of tests to run.
When starting a new test, you are now presented with two simple checkboxes
allowing you to select either HTML validation, CSS validation or both.

This is the first step towards offering you more control over what your
tests cover. In the future this can be built upon to add more fine-grained
control such as choosing to ignore errors relating to vendor-specific CSS
extensions.
