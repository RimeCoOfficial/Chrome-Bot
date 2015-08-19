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
  fill_db();
  goto_next_page();
});

function fill_db()
{
  $("p[class=meta]").each(function(i) {
    var user_link = $(this).find('a').attr('href');

    user_link = base_url + user_link;
    console.log(user_link);

    var key = user_link;
    // var value = {};
    // value.msg_sent = Date();

    localforage.getItem(key, function(err, value) {
      // console.log(value);

      if (value === null) {
        value = {};
        value = JSON.stringify(value);
        localforage.setItem(key, value, function(err, value) {
          // console.log(value);
        });
      }
    });
  });
}

function goto_next_page()
{
  var next_page_url = $("a[rel^=next]").attr('href');

  // next_page_url = undefined;
  if (next_page_url === undefined)
  {
    // save the db
    save_db_file()
  }
  else
  {
    next_page_url = base_url + next_page_url;

    // redirect
    console.log('Redirecct to next page: ' + next_page_url);
    this.document.location = next_page_url;
  }
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
