var fs = require('fs');
var $ = require('jquery');

var posts_directory = __dirname + '/../_posts';

var posts = fs.readdirSync(posts_directory);

for (var post_index = 0; post_index < posts.length; post_index++) {    
    var post_path = posts_directory + '/' + posts[post_index];        
    var content = fs.readFileSync(post_path, "utf8");
    
    var content_sections = content.split("---\n\n");
    
    var jqueryified = $('<div/>').html(content_sections[1]);
    
    var is_modified = false;
    
    $('a', jqueryified).each(function () {
        var anchor = $(this);
        if (anchor.attr('href').indexOf('&id=') !== -1) {
            console.log('Fixing unencoded ampersand in query string for "'+posts[post_index]+'"');
            anchor.attr('href', anchor.attr('href').replace('&id=', '&amp;id='));
            is_modified = true;
        }
    });
    
    if (is_modified) {
        content_sections[1] = jqueryified.html();
        fs.writeFileSync(post_path, content_sections.join("---\n\n"), "utf8", function (err) {        
            console.log(err);
            process.exit();
        });            
    }     
}