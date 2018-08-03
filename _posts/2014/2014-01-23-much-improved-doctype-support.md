---
layout: default
title: "Much Improved Doctype Support"
author: joncram
---
    
I today expanded the range of [doctypes](https://en.wikipedia.org/wiki/Document_type_declaration#Example)
we support when carrying out full-site HTML validation and significantly improved the way we check
if you're using a valid doctype.

The number of supported doctypes has increased from 12 to 27 and the number of supported variants has increased
from 12 to 78.

Some or all of the above may make no sense whatsoever which is why I'll
explain what a doctype is, I'll explain why it matters when validating HTML
and I'll list the doctypes that are now supported.

### Doctype What?

Martians have the slightly-odd inability to remember anything
about written languages. They're really good at remembering small details such as phone numbers and the
birthdays of various family members but when it comes to whole languages
the information goes in one ear and out the other three.

This proved problematic when Aunt Susan in Australia first set out
to make a penfriend of Gozava who lives in the calming equitorial climate
of the foothills of Aeolis Mons. To read a letter she receives, Gozava
has first to slot a language module into her head.

To know which of the many language modules to slot into your head,
you first look at the very first line of the letter. There on the very
first line of the letter is the document type declaration - a collection
of symbols simple enough for the Martian mind to remember that state
the language being used.

A letter lacking a doctype, or one that contains an incorrect doctype,
cannot be understood. Without knowing the language in which a letter
is written the words appear as nonsense.

Interestingly, most of the same concepts apply to documents on the web
(fancy that!) and to fully understand the markup behind a web page, the
web page needs to include a doctype line.

The doctype line of a web page, much like Aunt Susan's letter, states
the markup language used. A web page lacking a doctype, or one that
contains an incorrect doctype, cannot be understood and the intent of the
author of the page can only be guessed at.

Peek at the source of a web page and you may see on the very first
line `<!DOCTYPE html>` for HTML5 documents or `<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN">`
for HTML 4.01 documents.

### The Importance of Including a Valid Doctype

For most of their lives, your web pages are displayed in browsers
and are read by people.

A browser doesn't much care about the validity of your markup and will
always try to display the best interpretation of what
you may have meant in cases where the markup is invalid or in cases
where the doctype is incorrect.

When validating your markup, however, the doctype is very important
much like the language of a document is important for a spell checker
to behave correctly.

In a case where a web page contains markup that pretty much matches
what is available in HTML5 but which includes a HTML 3.2 doctype, it's
not possible to state whether the doctype is right and the markup
is wrong or whether the doctype is wrong and the markup is right.

A web page without a recognised doctype cannot be validated. Without
knowing the markup language used, the concept of what is valid cannot
be defined.

### Improved Doctype Detection

As you might have guessed, we need to find the doctype within your
web page and check if the doctype is valid before running a HTML validation
test.

It was around the area of doctype detection and validation that things
didn't previously work so well. We were not looking as well
as we could to try and find the doctype declaration.

Here are the ways in which that has been improved:

#### Finding Doctypes That Ignore The First Rule of Doctypes

Since a document cannot be understood until the doctype has
been identified, the first rule of doctypes states that the
doctype must be on the very first line and must be preceded
by nothing whatsoever.

Nevertheless, some web pages do not feature the doctype on the
very first line and instead the doctype is preceded by
any amount of whitespace (which is fair), IE-specific conditional
comments (which is silly), copyright notices within comments (which is double silly plus one),
build-related comments such as version details and page generation times (which is silly and pointless)
or just random nonsense.

We can now correctly find the doctype line if it is preceded by
comments or any amount of non-markup nonsense (within reason).

#### Finding Multi-line Doctypes

Doctypes are often presented in documentation examples as
spanning just one line, perhaps two if that reads more clearly.

The [W3C list of recommended doctypes](href="https://www.w3.org/QA/2002/04/valid-dtd-list.html#DTD)
suggests for HTML 4.01 to use:

    <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN"
    "http://www.w3.org/TR/html4/strict.dtd">

There is quite likely a SGML specification that defines
the allowed format of a doctype line. I couldn't find it and
instead experimented with the W3C HTML validator to see
what it would and wouldn't accept.

It turns out that all whitespace is equal and we will now
find your doctype even if it is spread over as many lines as
possible.

The following is now perfectly fine if a little silly:

    <!DOCTYPE
    HTML
    PUBLIC
    "-//W3C//DTD
    HTML
    4.01//EN"
    "http://www.w3.org/TR/html4/strict.dtd"
    >

### Improved Doctype Validation

Finding the doctype is only part of the problem. We also need to verify
that it is valid.

This was previously achieved by comparing an extracted doctype against
a list of known valid doctypes. This approach was quick, easy, often
right, sometimes wrong and ultimately incorrect.

Consider the following doctype:

    <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN"
    "http://www.w3.org/TR/html4/strict.dtd">

The very first part, reading `DOCTYPE HTML PUBLIC`, is not
case sensitive. I've yet to see any documentation where it isn't all
in uppercase (except for perhaps the "html" part sometimes being in
lowercase). Any combination of uppercase and lowercase is fine.

The part reading `-//W3C//DTD HTML 4.01//EN` is the formal
public identifier (FPI) and the part towards the end reading `http://www.w3.org/TR/html4/strict.dtd`
is the URI.

We were previously checking against only a handful of FPIs belonging
to the most commonly-used version of HTML or XHTML. It turns out there
are many more and we now use a list of 27 FPIs when checking the
validity of a doctype.

Regarding the URI I learned two interesting details.

Firstly, the URI is entirely optional - omitting the URI does not change the validity of the
doctype. This was news to me.

Secondly, the URI value can vary. That shown in the above example is the
URI to the latest version of the HTML 4.01 strict document type definition (DTD).
When language specifications are being defined and revised, DTDs may change
with the older, deprecated DTDs found at different URIs.

One equivalent alternative to the above example is this:

    <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN"
    "http://www.w3.org/TR/html4/strict.dtd">

I found four acceptable variations of the URI for the HTML 4.01 DTD. For other
versions of HTML there may be a greater or smaller number of acceptable
alternative URIs.

Taking into consideration the 27 FPIs one might use and the range
of different URIs one might opt for leaves us with 78 doctype
variations that are all perfectly valid.

### Supported Doctype List

For completeness, here is the full list of all doctypes now
detectable and considered suitably valid. This does include some
variants that could be argued as being technically invalid but which
are included as they cause no problems with validation and because they
are very commonly used.

- `<!DOCTYPE html PUBLIC "-//IETF//DTD HTML//EN">`
- `<!DOCTYPE html PUBLIC "-//IETF//DTD HTML 2.0//EN">`
- `<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 3.2 Final//EN">`
- `<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 3.2//EN">`
- `<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 3.2 Draft//EN">`
- `<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.0//EN" "http://www.w3.org/TR/1998/REC-html40-19980424/strict.dtd">`
- `<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.0//EN" "http://www.w3.org/TR/REC-html40-971218/strict.dtd">`
- `<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.0//EN" "http://www.w3.org/TR/1998/REC-html40-19980424/strict.dtd">`
- `<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.0//EN" "http://www.w3.org/TR/1998/REC-html40-19980424/strict.dtd">`
- `<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.0//EN" "http://www.w3.org/TR/1998/REC-html40-19980424/strict.dtd">`
- `<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.0//EN" "http://www.w3.org/TR/1998/REC-html40-19980424/strict.dtd">`
- `<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" "http://www.w3.org/TR/1998/REC-html40-19980424/loose.dtd">`
- `<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" "http://www.w3.org/TR/REC-html40-971218/loose.dtd">`
- `<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" "http://www.w3.org/TR/1998/REC-html40-19980424/loose.dtd">`
- `<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" "http://www.w3.org/TR/1998/REC-html40-19980424/loose.dtd">`
- `<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" "http://www.w3.org/TR/1998/REC-html40-19980424/loose.dtd">`
- `<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" "http://www.w3.org/TR/1998/REC-html40-19980424/loose.dtd">`
- `<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.0 Frameset//EN" "http://www.w3.org/TR/1998/REC-html40-19980424/frameset.dtd">`
- `<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.0 Frameset//EN" "http://www.w3.org/TR/REC-html40-971218/frameset.dtd">`
- `<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.0 Frameset//EN" "http://www.w3.org/TR/1998/REC-html40-19980424/frameset.dtd">`
- `<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.0 Frameset//EN" "http://www.w3.org/TR/1998/REC-html40-19980424/frameset.dtd">`
- `<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.0 Frameset//EN" "http://www.w3.org/TR/1998/REC-html40-19980424/frameset.dtd">`
- `<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.0 Frameset//EN" "http://www.w3.org/TR/1998/REC-html40-19980424/frameset.dtd">`
- `<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">`
- `<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/REC-html40/strict.dtd">`
- `<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/1999/REC-html401-19991224/strict.dtd">`
- `<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html40/strict.dtd">`
- `<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">`
- `<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/REC-html40/loose.dtd">`
- `<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/1999/REC-html401-19991224/loose.dtd">`
- `<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html40/loose.dtd">`
- `<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Frameset//EN" "http://www.w3.org/TR/html4/frameset.dtd">`
- `<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Frameset//EN" "http://www.w3.org/TR/REC-html40/frameset.dtd">`
- `<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Frameset//EN" "http://www.w3.org/TR/1999/REC-html401-19991224/frameset.dtd">`
- `<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Frameset//EN" "http://www.w3.org/TR/html40/frameset.dtd">`
- `<!DOCTYPE html>`
- `<!DOCTYPE html SYSTEM "about:legacy-compat">`
- `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">`
- `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/2002/REC-xhtml1-20020801/DTD/xhtml1-strict.dtd">`
- `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/2000/REC-xhtml1-20000126/DTD/xhtml1-strict.dtd">`
- `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/MarkUp/DTD/xhtml1-strict.dtd">`
- `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">`
- `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/2002/REC-xhtml1-20020801/DTD/xhtml1-transitional.dtd">`
- `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/2000/REC-xhtml1-20000126/DTD/xhtml1-transitional.dtd">`
- `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/MarkUp/DTD/xhtml1-transitional.dtd">`
- `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Frameset//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-frameset.dtd">`
- `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Frameset//EN" "http://www.w3.org/TR/2002/REC-xhtml1-20020801/DTD/xhtml1-frameset.dtd">`
- `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Frameset//EN" "http://www.w3.org/TR/2000/REC-xhtml1-20000126/DTD/xhtml1-frameset.dtd">`
- `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Frameset//EN" "http://www.w3.org/MarkUp/DTD/xhtml1-frameset.dtd">`
- `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">`
- `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/MarkUp/DTD/xhtml11.dtd">`
- `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/2010/REC-xhtml11-20101123/DTD/xhtml11.dtd">`
- `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/2001/REC-xhtml11-20010531/DTD/xhtml11.dtd">`
- `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML Basic 1.0//EN" "http://www.w3.org/TR/xhtml-basic/xhtml-basic10.dtd">`
- `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML Basic 1.0//EN" "http://www.w3.org/TR/2010/REC-xhtml-basic-20101123/xhtml-basic10.dtd">`
- `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML Basic 1.0//EN" "http://www.w3.org/TR/2008/REC-xhtml-basic-20080729/xhtml-basic10.dtd">`
- `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML Basic 1.0//EN" "http://www.w3.org/MarkUp/DTD/xhtml-basic10.dtd">`
- `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML Basic 1.1//EN" "http://www.w3.org/TR/xhtml-basic/xhtml-basic11.dtd">`
- `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML Basic 1.1//EN" "http://www.w3.org/TR/2010/REC-xhtml-basic-20101123/xhtml-basic11.dtd">`
- `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML Basic 1.1//EN" "http://www.w3.org/TR/2008/REC-xhtml-basic-20080729/xhtml-basic11.dtd">`
- `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML Basic 1.1//EN" "http://www.w3.org/MarkUp/DTD/xhtml-basic11.dtd">`
- `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML-Print 1.0//EN" "http://www.w3.org/TR/xhtml-print/DTD/xhtml-print10.dtd">`
- `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML-Print 1.0//EN" "http://www.w3.org/TR/2010/REC-xhtml-print-20101123/DTD/xhtml-print10.dtd">`
- `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML-Print 1.0//EN" "http://www.w3.org/TR/2006/REC-xhtml-print-20060920/DTD/xhtml-print10.dtd">`
- `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML-Print 1.0//EN" "http://www.w3.org/MarkUp/DTD/xhtml-print10.dtd">`
- `<!DOCTYPE html PUBLIC "-//WAPFORUM//DTD XHTML Mobile 1.0//EN" "http://www.wapforum.org/DTD/xhtml-mobile10.dtd">`
- `<!DOCTYPE html PUBLIC "-//WAPFORUM//DTD XHTML Mobile 1.1//EN" "http://www.openmobilealliance.org/tech/DTD/xhtml-mobile11.dtd">`
- `<!DOCTYPE html PUBLIC "-//WAPFORUM//DTD XHTML Mobile 1.2//EN" "http://www.openmobilealliance.org/tech/DTD/xhtml-mobile12.dtd">`
- `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML+RDFa 1.0//EN" "http://www.w3.org/MarkUp/DTD/xhtml-rdfa-1.dtd">`
- `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML+RDFa 1.1//EN" "http://www.w3.org/MarkUp/DTD/xhtml-rdfa-2.dtd">`
- `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML+ARIA 1.0//EN" "http://www.w3.org/WAI/ARIA/schemata/xhtml-aria-1.dtd">`
- `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML+ARIA 1.0//EN" "http://www.w3.org/MarkUp/DTD/xhtml-aria-1.dtd">`
- `<!DOCTYPE html PUBLIC "-//W3C//DTD HTML+ARIA 1.0//EN" "http://www.w3.org/WAI/ARIA/schemata/html4-aria-1.dtd">`
- `<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01+RDFa 1.0//EN" "http://www.w3.org/MarkUp/DTD/html401-rdfa-1.dtd">`
- `<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01+RDFa 1.1//EN" "http://www.w3.org/MarkUp/DTD/html401-rdfa11-1.dtd">`
- `<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01+RDFa Lite 1.1//EN" "http://www.w3.org/MarkUp/DTD/html401-rdfalite11-1.dtd">`
- `<!DOCTYPE html PUBLIC "ISO/IEC 15445:2000//DTD HTML//EN">`
- `<!DOCTYPE html PUBLIC "ISO/IEC 15445:2000//DTD HyperText Markup Language//EN">`

