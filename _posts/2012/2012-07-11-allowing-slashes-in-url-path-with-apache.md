---
layout: default
title: "Allowing Slashes in the URL Path With Apache"
author:
name: Jon Cram
url: https://github.com/webignition
---
 
Ever found yourself needing to allow slashes in a URL path?
<code>
    http://app.simplytestable.com/job/<strong>https://simplytestable.com</strong>/start
</code>

Even if you correctly encode slashes as `%2F`, Apache will decode them and treat them as normal
path part separators, just as if you had used a slash as it is most commonly used.

This is a little daft. If you want to separate path parts, use a slash. If you want to literally include a slash,
encode it.

Nonetheless, you can configure Apache to allow encoded slashes with `AllowEncodedSlashes On` in the relevant
vhost:

<pre>
<VirtualHost 127.0.0.1:80>
    ServerName app.simplytestable.com
    <strong>AllowEncodedSlashes On</strong>
    # ...
</VirtualHost>
</pre>

Thanks to:

- [Stackoverflow: Need to allow encoded slashes on Apache](http://stackoverflow.com/questions/4390436/need-to-allow-encoded-slashes-on-apache)
- [Apache AllowEncodedSlashes documentation](httpd.apache.org/docs/2.0/mod/core.html#allowencodedslashes)
