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


// ////////////////// utility //////////////////

// Returns a random number between 0 (inclusive) and 1 (exclusive)
function getRandom() {
  return Math.random();
}
// Returns a random number between min (inclusive) and max (exclusive)
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}
// Returns a random integer between min (included) and max (excluded)
// Using Math.round() will give you a non-uniform distribution!
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
// Returns a random integer between min (included) and max (included)
// Using Math.round() will give you a non-uniform distribution!
function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function is_today(date_str) {
  var now = new Date();
  var ago = new Date(date_str);

  if (now.getDate() == ago.getDate()) {
    if (now.getMonth() == ago.getMonth()) {
      if (now.getFullYear() == ago.getFullYear()) {
        return true;
      }
    }
  }
  
  return false;
}

// if (typeof String.prototype.startsWith != 'function') {
//   // see below for better implementation!
//   String.prototype.startsWith = function (str){
//     return this.indexOf(str) === 0;
//   };
// }

// if (typeof String.prototype.endsWith != 'function') {
//   String.prototype.endsWith = function (str){
//     return this.slice(-str.length) == str;
//   };
// }
