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
