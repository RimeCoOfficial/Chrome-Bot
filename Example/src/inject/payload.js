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

$(document).ready(function() {
  console.log("is_today(Date()): " + is_today(Date()));

  console.log("'abc'.startsWith('a'): " + 'abc'.startsWith('a'));
  console.log("'abc'.endsWith('c'): " + 'abc'.endsWith('c'));

  console.log("getRandom(): " + getRandom());
  console.log("getRandomArbitrary(1,100): " + getRandomArbitrary(1,100));
  console.log("getRandomInt(1,100): " + getRandomInt(1,100));
  console.log("getRandomIntInclusive(1,100): " + getRandomIntInclusive(1,100));
});
