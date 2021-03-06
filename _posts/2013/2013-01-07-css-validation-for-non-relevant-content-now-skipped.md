---
title: "CSS Validation For Non-Relevant Content Now Skipped"
author: joncram
---

If you have non-HTML URLs in your sitemap, such as URLs for PDFs, HTML
tests for such URLs will be marked as 'skipped' to indicate that the test
was not run due to it not being relevant.

Up until just recently, CSS validation tests run against non-HTML and
non-CSS URLs would show as having been completed with zero errors.

Whilst this is technically correct it seems semantically less useful,
somewhat similar to the difference between my car being certified as having
zero faulty rocket boosters and my car being noted has being not applicable
to rocket booster certification.

CSS validation tests for non-relevant content are now marked as 'skipped'
instead of passing with zero errors.
