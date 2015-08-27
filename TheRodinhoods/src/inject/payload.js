console.log('loaded!');

var my_url = 'http://therodinhoods.com/profile/GirishNayak';

var base_url = 'http://therodinhoods.com';
var current_url = window.location.href;
var current_uri = window.location.pathname;

var current_url_hash = window.location.hash;

localforage.config({
  driver      : localforage.INDEXEDDB, // Force WebSQL; same as using setDriver()
  name        : 'myApp',
  version     : 1.0,
  size        : 4980736, // Size of database, in bytes. WebSQL-only for now.
  storeName   : 'keyvaluepairs', // Should be alphanumeric, with underscores.
  description : 'some description'
});

$(document).ready(function() {
  // // current_url_hash callback
  // if (current_url_hash !== '') {
  //   var fn = window[ current_url_hash.substr(1) ];
  //   if(typeof fn === 'function') { fn(); }
  // }
  
  // window.setTimeout(function() {
  //   get_next_task();
  // }, 2000);
});

function get_next_task()
{
  var next_task_url = null;
  
  localforage.iterate(function(value, key, iterationNumber) {
    // Resulting key/value pair -- this callback
    // will be executed for every item in the
    // database.
    // console.log([key, value]);

    if (next_task_url == null) {
      if (value.user_avatar_is_custom == true) {
        if (value.add_as_friend == undefined) {
          console.log('Add as friend: ' + key);
          next_task_url = key + "#add_as_friend";

          value.add_as_friend = Date();
        }
      }
    }

    // if (next_task_url !== null) {
    //   // Permission Denied or any other issues: mark done
    //   if (current_url == next_task_url) {
    //     next_task_url = null;
    //     localforage.setItem(key, value, function(err, value) {});
    //   }
    // }
  }, function() {
    console.log('Iteration has completed');
    
    if (next_task_url !== null) {
      console.log('Redirect to: ' + next_task_url);
      window.location = next_task_url;
    }
    else console.log('All done!');
  });
}

function add_as_friend() {
  key = base_url + current_uri;
  console.log('key: ' + key);

  localforage.getItem(key, function(err, value) {
    if (value == null) {
      console.log('key not found');
    }
    else if (value.add_as_friend == undefined) {

      // var name = $('h1').first().find('span').first().text();

      // $('#relationship').find('a').first().click();
      // $('a.xg_sprite.xg_sprite-add').first().click();

      window.setTimeout(function() {
        var button = $('#relationship').find('a');
        console.log(button);

        button.click();
        console.log('button clicked');
      }, 1000);
      
      // button.click();
    }
  });
}
