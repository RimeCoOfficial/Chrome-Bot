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
  save_db_file();
});

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
    download(data, 'therodinhoods.com.json', 'application/json');
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
