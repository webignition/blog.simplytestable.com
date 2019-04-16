---
title: "JavaScript Static Analysis Analysis"
author: joncram
excerpt_separator: <!--more-->
---
I'm in the process of [removing the JavaScript static analysis feature](/bye-bye-javascript-static-analysis/).

I'm really quite sure that the results of such tests are of no value and that almost no-one uses this feature.
 
Does (relatively) anyone use this feature? Let's flex our SQL fingers and see whether my assumptions match reality.

<!--more-->

### In Short
From looking at how the different test types (HTML validation, CSS validation, JavaScript static analysis and link 
integrity) are used, it looks like JavaScript static analysis is used only because it can be and not because it
needs to be.

In all cases where a specific URL is tested more than once, just 2.3% of re-tests are for JavaScript static analysis.
This says that people may try the feature once but, generally, never again.

Does anyone use this feature? No.

### Tests, Tasks and the Difference Between Them

A full-site test covering X aspects for a website with Y URLs will result in X * Y tests being carried out. See how
the word 'test' occurs twice in that last sentence?

In both cases, the word 'test' has a specific meaning. Time to get a little more specific.

A full-site _test_ covering X aspects for a website with Y URLs will result in X * Y _tasks_ being performed. That's
better.

A test covers the whole operation of examining some aspects of a website. A task is the actual examination of a specific
aspect for a specific URL.

You need to be aware of this to correctly understand what comes next.

### How Many Tests Have Been Run?

If I want to examine how many tests of a certain type have been run compared to either all tests or to tests
of different types, I need to know how many tests have been run.

We're looking at how many times someone chose to run a test of a website. Tests, not tasks, just to be clear.
 
There have been 72,751 tests run so far. That includes tests run under our free demo account in addition to tests
run by all of you who have created accounts. The free demo account does not offer JavaScript static analysis so let's
exclude those.

There have been 9,051 non-demo tests run so far. Of those, 2,426 have been run by me under my own accounts. Best to exclude those since I'm far from a 
representative user.

There have been 6,625 non-demo tests run so far by everyone with an account who is not me. This feels about right as 
not everyone who finds us decides to create an account.

Good, what can we look at next? 

### How Many Tasks Have Been Performed?

The 6,625 non-demo tests run so far (by everyone with an account who is not me) cover 1,003,216 tasks.

What test types do these cover?

<table class="table stats table-striped">
    <tr>
        <th>Test type</th>
        <th class="table-data-numeric">Number of tasks</th>
        <th class="table-data-numeric">Percentage of tasks of this type</th>
    </tr>
    <tr>
        <td>HTML Validation</td>
        <td class="table-data-numeric">213,598</td>
        <td class="table-data-numeric">21%</td>
    </tr>
    <tr>
        <td>CSS Validation</td>
        <td class="table-data-numeric">182,147</td>
        <td class="table-data-numeric">18%</td>
    </tr> 
    <tr>
        <td>JS Static Analysis</td>
        <td class="table-data-numeric">79,193</td>
        <td class="table-data-numeric">8%</td>
    </tr>
    <tr>
        <td>Link Integrity</td>
        <td class="table-data-numeric">528,278</td>
        <td class="table-data-numeric">53%</td>
    </tr>                                    
</table>

Whilst JavaScript Static Analysis lags behind at only 8% of all tasks carried out, we're still looking at nearly 80,000
of such tasks being performed. It's not clear yet if this seemingly-low number is relevant.
 
Perhaps many people choose to run JavaScript static analysis on its own against very small sites and other people 
choose to run the other test types on their own against very large sites?

We need to dig a little deeper.

### How Many Tasks Are Run Again?

We have so far seen the number of tasks performed for each test type. JavaScript static analysis looks to be 
underused, link integrity seems highly used and both HTML and CSS validation are somewhat equal somewhere in the middle.

What interests me is how often different types of test are run *again*. 

You might run a specific type of test against a website once and then decide that that sort of testing is not for you.
Or you might like what the test results tell you and, possibly after making changes to the website that was tested, you 
might run the same types of test again.

Repeat usage might suggest greater interest. Let's see.

- 1,003,216 tasks have been carried out
- 373,284 unique URLs have been tested
- 629,932 unique URLs have been tested more than once

<table class="table stats table-striped">
    <tr>
        <th>Test type</th>
        <th class="table-data-numeric">Number of tasks</th>
        <th class="table-data-numeric">Unique URL count</th>
        <th class="table-data-numeric">Re-test count</th>
        <th class="table-data-numeric">Percentage of re-test tasks of this type</th>
    </tr>
    <tr>
        <td>HTML Validation</td>
        <td class="table-data-numeric">213,598</td>
        <td class="table-data-numeric">121,050</td>
        <td class="table-data-numeric">92,548</td>
        <td class="table-data-numeric">15%</td>
    </tr>
    <tr>
        <td>CSS Validation</td>
        <td class="table-data-numeric">182,147</td>
        <td class="table-data-numeric">110,304</td>
        <td class="table-data-numeric">71,843</td>
        <td class="table-data-numeric">11%</td>
    </tr> 
    <tr>
        <td>JS Static Analysis</td>
        <td class="table-data-numeric">79,193</td>
        <td class="table-data-numeric">64,869</td>
        <td class="table-data-numeric">14,324</td>
        <td class="table-data-numeric">2.3%</td>
    </tr>
    <tr>
        <td>Link Integrity</td>
        <td class="table-data-numeric">528,278</td>
        <td class="table-data-numeric">77,061</td>
        <td class="table-data-numeric">451,217</td>
        <td class="table-data-numeric">72%</td>
    </tr>                                    
</table>


### How Many Tests Are Run That Test _X_?

A test might cover multiple test types (and we'll see a bit later that this is most often the case). For now, let's 
see how many tests cover at least one specific test type.

<table class="table stats table-striped">
    <tr>
        <th>Test type</th>
        <th class="table-data-numeric">Number of tests</th>
        <th class="table-data-numeric">Percentage of tests covering this type</th>
    </tr>
    <tr>
        <td>HTML Validation</td>
        <td class="table-data-numeric">4,755</td>
        <td class="table-data-numeric">72%</td>
    </tr>
    <tr>
        <td>CSS Validation</td>
        <td class="table-data-numeric">3,569</td>
        <td class="table-data-numeric">54%</td>
    </tr>
    <tr>
        <td>JS Static Analysis</td>
        <td class="table-data-numeric">1,525</td>
        <td class="table-data-numeric">23%</td>
    </tr>
    <tr>
        <td>Link Integrity</td>
        <td class="table-data-numeric">2,189</td>
        <td class="table-data-numeric">33%</td>
    </tr>
</table>

We can already see that JavaScript static analysis is the least popular type of test, however nearly a quarter
of all tests choose this feature.

We need to dig deeper and look at the situations in which JavaScript Static Analysis is chosen.

### How Many Tests Are Run That Test Only _X_ (And _Y_ and _Z_)?

Most people carry out more than one type of test at a time. Why run a HTML validation test and then
separately a CSS validation test when you can carry out both at once?

There are 14 unique ways to select between the four test types. Here's how many times the different permutations have
been chosen. Those with a percentage usage of less than one have been de-emphasised.

<table class="table stats table-striped">
    <tr>
        <th>Test types</th>
        <th class="table-data-numeric">Number of tests</th>
        <th class="table-data-numeric">Percentage of tests covering this type</th>
    </tr>
    <tr>
        <td>HTML Validation only</td>
        <td class="table-data-numeric">431</td>
        <td class="table-data-numeric">6.5%</td>
    </tr>
    <tr class="de-emphasise">
        <td>CSS Validation only</td>
        <td class="table-data-numeric">51</td>
        <td class="table-data-numeric">0.77%</td>
    </tr>
    <tr class="de-emphasise">
        <td>JS Static Analysis only</td>
        <td class="table-data-numeric">11</td>
        <td class="table-data-numeric">0.16%</td>
    </tr>
    <tr>
        <td>Link Integrity only</td>
        <td class="table-data-numeric">198</td>
        <td class="table-data-numeric">3%</td>
    </tr>
    <tr>
        <td>HTML Validation and CSS Validation only</td>
        <td class="table-data-numeric">1,880</td>
        <td class="table-data-numeric">28%</td>
    </tr>
    <tr class="de-emphasise">
        <td>HTML Validation and JS Static Analysis only</td>
        <td class="table-data-numeric">4</td>
        <td class="table-data-numeric">0.06%</td>
    </tr>
    <tr>
        <td>HTML Validation and Link Integrity only</td>
        <td class="table-data-numeric">794</td>
        <td class="table-data-numeric">12%</td>
    </tr>
    <tr class="de-emphasise">
        <td>CSS Validation and JS Static Analysis only</td>
        <td class="table-data-numeric">3</td>
        <td class="table-data-numeric">0.05%</td>
    </tr>    
    <tr class="de-emphasise">
        <td>CSS Validation and Link Integrity only</td>
        <td class="table-data-numeric">4</td>
        <td class="table-data-numeric">0.06%</td>
    </tr>    
    <tr class="de-emphasise">
        <td>JS Static Analysis and Link Integrity only</td>
        <td class="table-data-numeric">0</td>
        <td class="table-data-numeric">0%</td>
    </tr>
    <tr>
        <td>HTML Validation, CSS Validation and JS Static Analysis only</td>
        <td class="table-data-numeric">461</td>
        <td class="table-data-numeric">7%</td>
    </tr>
    <tr>
        <td>HTML Validation, CSS Validation and Link Integrity only</td>
        <td class="table-data-numeric">147</td>
        <td class="table-data-numeric">2.2%</td>
    </tr>   
    <tr class="de-emphasise">
        <td>CSS Validation, JS Static Analysis and Link Integrity only</td>
        <td class="table-data-numeric">0</td>
        <td class="table-data-numeric">0%</td>
    </tr>
    <tr>
        <td>HTML Validation, CSS Validation, JS Static Analysis and Link Integrity</td>
        <td class="table-data-numeric">1,023</td>
        <td class="table-data-numeric">15%</td>
    </tr>                                                
</table>

That's a lot to look at. Let's exclude the de-emphasised rows and order them by percentage usage.

<table class="table stats table-striped">
    <tr>
        <th>Test types</th>
        <th class="table-data-numeric">Number of tests</th>
        <th class="table-data-numeric">Percentage of tests covering this type</th>
    </tr>
    <tr>
        <td>HTML Validation and CSS Validation only</td>
        <td class="table-data-numeric">1,880</td>
        <td class="table-data-numeric">28%</td>
    </tr>
    <tr>
        <td>HTML Validation, CSS Validation, JS Static Analysis and Link Integrity</td>
        <td class="table-data-numeric">1,023</td>
        <td class="table-data-numeric">15%</td>
    </tr> 
    <tr>
        <td>HTML Validation and Link Integrity only</td>
        <td class="table-data-numeric">794</td>
        <td class="table-data-numeric">12%</td>
    </tr>
    <tr>
        <td>HTML Validation, CSS Validation and JS Static Analysis only</td>
        <td class="table-data-numeric">461</td>
        <td class="table-data-numeric">7%</td>
    </tr>
    <tr>
        <td>HTML Validation only</td>
        <td class="table-data-numeric">431</td>
        <td class="table-data-numeric">6.5%</td>
    </tr>
    <tr>
        <td>Link Integrity only</td>
        <td class="table-data-numeric">198</td>
        <td class="table-data-numeric">3%</td>
    </tr>
    <tr>
        <td>HTML Validation, CSS Validation and Link Integrity only</td>
        <td class="table-data-numeric">147</td>
        <td class="table-data-numeric">2.2%</td>
    </tr>                                      
</table>

We can see that 15% of all tests are run with all test types (HTML validation, CSS validation, JavaScript static
analysis and link integrity) and 7% of all tests are the same minus the link integrity checks.

That adds up to there being 22% of tests that feature JavaScript static analysis. Those with keen eyes
will see that this doesn't equal the 23% previously stated. I'm dealing with rounded numbers here, it's close enough.

### Analysis

I'm going to admit that I have a bias. I think that running JavaScript static analysis tests against production
code is of no benefit.

But what I'm really interested in is where the usage of the JavaScript static analysis feature fits in. What does all
of the above data say?

#### How Many Tasks Are Run Again?

We can learn quite a bit. More tasks have been run than URLs have been tested. Some URLs are tested more than once.

For all tasks that are a re-test, only 2.3% choose JavaScript static analysis. This suggests a usage pattern of trying
the JavaScript static analysis feature once but not again.

#### How Many Tasks Have Been Performed?

There's nothing useful to learn from this section.

We can see that 8% of tasks are for JavaScript static analysis. This seems like a low number, but without further
context this is somewhat meaningless.

#### How Many Tests Are Run That Test Only X (And Y and Z)?

The table rows in _How Many Tests Are Run That Test Only X (And Y and Z)_ that are de-emphasised can 
be excluded from consideration. 

The now-excluded rows that feature JavaScript static analysis cover just 18 tests, 0.27% of the total. These rows 
are de-emphasised for a reason: relatively speaking, no-one runs those test configurations.

Side statistic: one of these now-excluded JavaScript static analysis test configurations is used roughly once every
3&#189; months.

Looking only at the remaining table data, the JavaScript static analysis option is present in only two cases:

- at the same time as HTML validation, CSS validation and link integrity
- at the same time as HTML validation and CSS validation only

What this looks like to me is that JavaScript static analysis is selected at the same time as everything else. This
seems to suggest that it is selected because it can be and not because it needs to be.

Does this apply to anything else? Let's see.

<table class="table stats table-striped">
    <tr>
        <td class="table-data-align-right">Selected ... </td>        
        <th class="table-data-align-right">with everything?</th>
        <th class="table-data-align-right">on its own?</th>
        <th class="table-data-align-right">with only one other test type?</th>
    </tr>
    <tr>
        <th>HTML Validation</th>
        <td class="table-data-boolean-mark table-data-true-mark table-data-align-right">yes</td>
        <td class="table-data-boolean-mark table-data-true-mark table-data-align-right">yes</td>
        <td class="table-data-boolean-mark table-data-true-mark table-data-align-right">yes</td>
    </tr>
    <tr>
        <th>CSS Validation</th>        
        <td class="table-data-boolean-mark table-data-true-mark table-data-align-right">yes</td>
        <td class="table-data-boolean-mark table-data-false-mark table-data-align-right">no</td>
        <td class="table-data-boolean-mark table-data-true-mark table-data-align-right">yes</td>
    </tr>
    <tr>
        <th>JS Static Analysis</th>        
        <td class="table-data-boolean-mark table-data-true-mark table-data-align-right">yes</td>
        <td class="table-data-boolean-mark table-data-false-mark table-data-align-right">no</td>
        <td class="table-data-boolean-mark table-data-false-mark table-data-align-right">no</td>
    </tr>
    <tr>
        <th>Link Integrity</th>
        <td class="table-data-boolean-mark table-data-true-mark table-data-align-right">yes</td>
        <td class="table-data-boolean-mark table-data-true-mark table-data-align-right">yes</td>
        <td class="table-data-boolean-mark table-data-true-mark table-data-align-right">yes</td>
    </tr>
</table>  

All other test types are either selected on their own or with only one other test type. It is only
JavaScript static analysis that is only selected with everything.

### Conclusion

To answer the question I posed at the very start: Does anyone use JavaScript static analysis?

The JavaScript static analysis feature is (relatively) never selected on its own and is only otherwise
selected in addition to all other test types.

In cases where it is selected, it is very rarely selected again.

By "all other test types" I mean in conjunction with HTML validation and CSS validation or in conjunction
with HTML validation, CSS validation and link integrity. I consider link integrity tests to be a slightly special
case and I would class them as an addition to everything.

Is JavaScript static analysis as a feature used? It is a feature that is chosen when someone opts to choose 
everything. It is not an option that is specifically chosen to be used, which leads me to assume that it is 
selected because it can be and not because it needs to be. 

So, no, no-one is using the JavaScript static analysis feature for anything useful.
