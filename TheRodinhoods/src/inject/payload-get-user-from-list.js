console.log('loaded!');

var base_url = 'http://therodinhoods.com';

localforage.config({
  driver      : localforage.INDEXEDDB, // Force WebSQL; same as using setDriver()
  name        : 'myApp',
  version     : 1.0,
  size        : 4980736, // Size of database, in bytes. WebSQL-only for now.
  storeName   : 'keyvaluepairs', // Should be alphanumeric, with underscores.
  description : 'some description'
});

// users from channel

$(document).ready(function() {
  fill_db();
  
  window.setTimeout(function() {
    goto_next_page();
  }, 2000);
});

function fill_db()
{
  $(".member_item_thumbnail").each(function(i) {
    // /profile/[username]?xg_source=profiles_memberList
    var user_link = $(this).find('a').attr('href');
    
    // http://therodinhoods.com/profile/[username]?xg_source=profiles_memberList
    user_link = base_url + user_link;
    
    // http://therodinhoods.com/profile/[username]
    user_link = user_link.replace('?xg_source=profiles_memberList', '');
    
    console.log(user_link);

    var user_avatar = $(this).find('img').attr('src');
    // console.log(user_avatar);

    var key = user_link;

    localforage.getItem(key, function(err, value) {
      if (value === null) {
        value = {};
        value.user_avatar_is_custom = ! user_avatar.includes('rodinhoodlogotherodinhoods.png');

        localforage.setItem(key, value, function(err, value) {});
      }
    });
  });
}

function goto_next_page()
{
  // http://therodinhoods.com/profiles/friend/list?page=2

  var next_page_button = $(".goto_button.button");

  if (next_page_button.length) {
    next_page_button.click();
  }
}
