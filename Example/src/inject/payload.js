console.log('loaded!');

// // http://cdn.rawgit.com/mozilla/localForage/master/dist/localforage.js
// // localforage.setDriver(localforage.LOCALSTORAGE);
// localforage.config({
//     driver      : localforage.INDEXEDDB, // Force WebSQL; same as using setDriver()
//     name        : 'myApp',
//     version     : 1.0,
//     size        : 4980736, // Size of database, in bytes. WebSQL-only for now.
//     storeName   : 'keyvaluepairs', // Should be alphanumeric, with underscores.
//     description : 'some description'
// });

// localforage.setItem('key', 'value', function(err, value) { console.log(value); });

// localforage.getItem('key', function(err, value) { console.log(value) });

// // jQuery
// $();

// var client = new XMLHttpRequest();
// client.open('GET', 'file:///Users/suvozit/.gitconfig');
// client.onreadystatechange = function() {
//   alert(client.responseText);
// }
// client.send();

// // load the db
// jQuery.get('https://raw.githubusercontent.com/RimeOfficial/Chrome-Bot/master/Test/readme.md', function(data) {
//   console.log(data);
// });

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
// download('abc', 'foo.txt', 'application/json');
// download('abc', 'foo.txt');
// download();