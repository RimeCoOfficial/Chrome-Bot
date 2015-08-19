console.log('loaded!');

var base_url = 'https://vimeo.com';

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
  // modify();
  save_db_file();
});

// follow, unfollow, msg
// videos [
//   url, like, unlike
// ]
function modify() {
  console.log('Modifying db');

  key = 'https://vimeo.com/1027films';
  localforage.getItem(key, function(err, value) {
    value.unfollow = Date();
    value.issue = 'cant unfollow';

    console.log(value);

    localforage.setItem(key, value, function(err, value) {});
  });

  // localforage.iterate(function(value, key, iterationNumber) {
  //   // Resulting key/value pair -- this callback
  //   // will be executed for every item in the
  //   // database.
  //   // console.log([key, value]);

  //   if (value.videos != undefined) {
  //     for (var i = 0; i < value.videos.length; i++) {
  //       if (value.videos[i].like != undefined) { 
  //         console.log(key + ' ' + value.videos[i].like);
  //       }
  //     }
  //   }

  //   // localforage.setItem(key, value, function(err, value) { if (err) console.error(err); });

  //   // if (iterationNumber % 100 == 0) console.log('.');

  // }, function() {
  //   console.log('Iteration has completed');
  // });
}

function save_db_file()
{
  console.log('Saving db');

  data = [];
  localforage.iterate(function(value, key, iterationNumber) {
    // Resulting key/value pair -- this callback
    // will be executed for every item in the
    // database.
    // console.log([key, value]);

    var entry = {}
    entry.key = key;
    entry.value = value;
    data.push(entry);
  }, function() {
    console.log('Iteration has completed');

    data = JSON.stringify(data);
    download(data, 'vimeo.json', 'application/json');
  });
}

// save the db
function download(text, name, type) {
    // text = typeof text !== 'undefined' ? text : '';
    name = typeof name !== 'undefined' ? name : 'untitled.txt';
    type = typeof type !== 'undefined' ? type : 'text/plain';

    var a = document.createElement("a");
    var file = new Blob([text], {type: type});
    a.href = URL.createObjectURL(file);
    a.download = name;
    a.click();
}
