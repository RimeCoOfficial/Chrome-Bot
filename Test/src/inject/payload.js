console.log('loaded!');

// http://cdn.rawgit.com/mozilla/localForage/master/dist/localforage.js
// localforage.setDriver(localforage.LOCALSTORAGE);

localforage.config({
    driver      : localforage.INDEXEDDB, // Force WebSQL; same as using setDriver()
    name        : 'myApp',
    version     : 1.0,
    size        : 4980736, // Size of database, in bytes. WebSQL-only for now.
    storeName   : 'keyvaluepairs', // Should be alphanumeric, with underscores.
    description : 'some description'
});

localforage.setItem('key', 'value', function(err, value) { console.log(value); });

localforage.getItem('key', function(err, value) { console.log(value) });

$();