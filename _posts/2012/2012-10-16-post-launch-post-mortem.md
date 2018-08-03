---
layout: default
title: "Post-Launch Post-Mortem"
author: joncram
illustration:
    id: google-analytics-post-launch
    url: https://i.imgur.com/q5WLK.png

---
    
We launched publicly last Wednesday.
    
Launching didn't mean making the service available - it had been live on the web
at [simpytestable.com](https://simplytestable.com/) for two weeks and before that at 
[alpha1.simplytestable.com](http://alpha1.simplytestable.com) for about two additional weeks.

Launching meant promoting the service. This accidentally went too well,
Simply Testable received more attention than I expected and all hell broke.

Here's what happened, the resulting traffic numbers and the positive outcomes.    

### TL;DR, Give Me Stats

<table class="table stats table-striped">
    <tr>
        <td>&nbsp;<!--This cell intentionally left blank. No writing in the margin. Please turn over.--></td>
        <th>Uniques</th>
        <th>Visits</th>
        <th>Full-site Tests</th>
        <th>HTML Validation Tests</th>
    </tr>
    <tr>
        <th>09 October</th>
        <td>8</td>
        <td>16</td>
        <td>140</td>
        <td>38,000</td>
    </tr>
    <tr>
        <th>10 October</th>
        <td>63</td>
        <td>71</td>
        <td>220</td>
        <td>68,000</td>
    </tr>
    <tr>
        <th>12 October</th>
        <td>865</td>
        <td>918</td>
        <td>529</td>
        <td>300,000</td>
    </tr>
    <tr>
        <th>14 October</th>
        <td>2158</td>
        <td>2315</td>
        <td>2000</td>
        <td>680,000</td>
    </tr>
</table>
    
Note: increasing numbers isn't always pretty. Capacity problems all over the place. Read on.    

###Web Resources Depot
    
I submitted Simply Testable to [Web Resources Depot](http://www.webresourcesdepot.com/)
on Wednesday, it was accepted and [listed on Friday](http://www.webresourcesdepot.com/simply-testable-free-automated-site-wide-html-markup-validation/).

The post to Web Resources Depot reached over 35,000 RSS subscribers, bringing in 500 direct referrals
on the first day. Web Resources Depot has since brought in another 500 direct referrals.

The Web Resources Depot post spawned about 50 re-postings across other sites.

700 new full-site tests were started that day encompassing 300,000 HTML validation tests with dozens
running concurrently.

Previous days had seen up to 200 full-site tests started with at most 2 or 3 running concurrently.

A quick install of [Go Squared realtime analytics](https://www.gosquared.com/) revealed
about 20 concurrent users at the Simply Testable homepage for most of the day.

Google Analytics later revealed 918 visits for the day, up from a previous maximum of 70.

The service worked fine on previous days, last Friday not quite so.

### Smashing Magazine
    
Coping with the Web Resources Depot related traffic seemed hard enough.
Then Smashing Magazine made the previous traffic boost look like an amateur effort.

Perhaps [Smashing Magazine](http://www.smashingmagazine.com/) picked up on the interest
generated from Web Resources Depot, perhaps they spotted [my tweet](https://twitter.com/simplytestable/status/256045481283706881)
to them in a contest to win a subscription to a competing service.   
    
Whatever the inspiration, [Vitaly Friedman](http://www.smashingmagazine.com/author/vitaly-friedman/)
chose to have [@smashingmag](https://twitter.com/smashingma) send a 
[tweet about Simply Testable](https://twitter.com/smashingmag/status/257467663071203328) last Sunday.

At the time I was glad that the Web Resources Depot related traffic was
winding down. Casual curiosity users were losing interest and a few interested
parties remained. It looked like I could start getting a handle on what on
earth was causing everything to break and why everything was running so
terribly slowly.

No, no chance of that happening.

As a result of the Smashing Magazine tweet, unique visitors to the Simply
Testable homepage reached 2158 for the day. That's up from a previous
maximum of 865.

Realtime analytics revealed a pretty constant 40 concurrent users of the homepage,
hitting a peak of 53 at one point.

2000 new full-site tests were started that day encompassing 680,000 HTML validation tests with hundreds
running concurrently.

At this point, “running concurrently” is valid only from an
absolutely technical perspective. Hundreds of full-site tests had been started
and had not yet finished. Given weeks or months they might complete. From
a user's perspective, all hell ground to a halt.

The queue of HTML validation tests would have taken 5 days to clear if
the system was working at full capacity. The load on the system introduced
by the increase in interest reduced the HTML validation test throughput
significantly. It was looking like the queue would take about 2 weeks to clear.

HTML validation tests were being added to the queue faster than they were
being completed. The time required to clear the queue was fast approximating
2 weeks + infinity. That's quite a long time.

### The Positives
    
The Simply Testable homepage now receives about 5 - 10 concurrent users.
Many, sometimes the majority depending on the time of day, are returning visitors.
Returning visitors are a very good thing. Returning visitors are gold.

The [weekly updates newsletter](https://simplytestable.us5.list-manage1.com/subscribe?u=ac75e33d993d2b502e333ddd0&amp;id=311aedc7f4)
jumped from 10 subscribers to 17. Those are by no means large numbers, but
that does represent 7 people who care enough that they want to receive
a weekly digest of the changes to the service and the direction it is taking.

Followers of [@simplytestable](https://twitter.com/simplytestable)
jumped from 11 to 34. Again, not large numbers compared to many other services
but very valuable to me.

I've now coping with the demand. This has happened partly by chance; interest
has dropped.

I'm clearing out older tests, leaving newer tests in a position where they
can complete. In an ideal world I'd not touch tests. In the current situation,
culling old tests is better than having all tests take literally forever.

This leaves me able to see how the system copes with a given constant
number of concurrent tests. I can examine the system as the number of
concurrent test rises and identify the most clear performance bottlenecks.

As this process continues, the number of concurrent tests that can be
supported increases. This is a great way of measuring the how well the
system can cope with demand and controls how demand impacts the system
to allow improvements to be implemented without widespread breakage.
