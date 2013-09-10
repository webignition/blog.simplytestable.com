var fs = require('fs');
var $ = require('jquery');

var replace_incorrectly_encoded_href_id = function (content, match_result) {
    var new_href = match_result[0].replace('&id=', '&amp;id=');
    return content.substr(0, match_result.index) + new_href + content.substr(match_result.index + match_result[0].length);
};

var replace_double_encoded_ampersand = function (content, match_result) {
    var new_href = match_result[0].replace('&amp;amp;', '&amp;');    
    return content.substr(0, match_result.index) + new_href + content.substr(match_result.index + match_result[0].length);
};

var posts_directory = __dirname + '/../_posts';
var posts = fs.readdirSync(posts_directory);

for (var post_index = 0; post_index < posts.length; post_index++) {        
    var post_path = posts_directory + '/' + posts[post_index];        
    var content = fs.readFileSync(post_path, "utf8");
    
    var content_sections = content.split("---\n\n");
    var is_modified = false;
    
    var incorrectly_encoded_href_id_match_result = content_sections[1].match(/href=".*&id=.*"/);
    while (incorrectly_encoded_href_id_match_result !== null) {
        console.log('Fixing unencoded ampersand in query string for "'+posts[post_index]+'"');
        content_sections[1] = replace_incorrectly_encoded_href_id(content_sections[1], incorrectly_encoded_href_id_match_result);        
        is_modified = true;
        incorrectly_encoded_href_id_match_result = content_sections[1].match(/href=".*&id=.*"/);
    }
    
    var double_encoded_ampersand_match_result = content_sections[1].match(/href=".*&amp;amp;.*"/);
    while (double_encoded_ampersand_match_result !== null) {
        console.log('Fixing double-encoded ampersand in query string for "'+posts[post_index]+'"');
        content_sections[1] = replace_double_encoded_ampersand(content_sections[1], double_encoded_ampersand_match_result);        
        is_modified = true;        
        double_encoded_ampersand_match_result = content_sections[1].match(/href=".*&amp;amp;.*"/);
    }
    
    if (is_modified) {
        fs.writeFileSync(post_path, content_sections.join("---\n\n"), "utf8", function (err) {        
            console.log(err);
            process.exit();
        });            
    }     
}