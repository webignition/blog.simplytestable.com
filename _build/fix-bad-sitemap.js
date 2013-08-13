var fs = require('fs');
var $ = require('jquery');
var S = require('string');

var sitemap_path = __dirname + '/../sitemap.xml';
var content = fs.readFileSync(sitemap_path, "utf8");

var jqueryified = $('<div/>').html(content);

var is_illustrations_url = function (url) {    
    return url.indexOf('/illustrations/') !== -1;
};

$('loc', jqueryified).each(function () {
    var url = S($(this).text()).trim().s;
    
    if (is_illustrations_url(url)) {
        var new_url = url.split('/illustrations').slice(0, 2).join('/illustrations') + '/';
        $(this).text(new_url);
    }
});

fs.writeFileSync(sitemap_path, jqueryified.html(), "utf8", function (err) {        
    console.log(err);
    process.exit();
});