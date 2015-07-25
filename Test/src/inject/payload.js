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

window.requestFileSystem  = window.requestFileSystem || window.webkitRequestFileSystem;

var requestedBytes = 1024*1024*280; 

navigator.webkitPersistentStorage.requestQuota (requestedBytes, function(grantedBytes) {  
  window.requestFileSystem(PERSISTENT, grantedBytes, onInitFs, errorHandler);
}, function(e) {
  console.log('Error', e);
});


function onInitFs(fs) {

  fs.root.getFile('log3.txt', {create: true}, function(fileEntry) {

    console.log(fileEntry);

    // fileEntry.getMetadata(successCallback, opt_errorCallback);

    // Create a FileWriter object for our FileEntry (log.txt).
    fileEntry.createWriter(function(fileWriter) {

      fileWriter.onwriteend = function(e) {
        console.log('Write completed.');
      };

      fileWriter.onerror = function(e) {
        console.log('Write failed: ' + e.toString());
      };

      // Create a new Blob and write it to log.txt.
      var blob = new Blob(['Lorem Ipsum'], {type: 'text/plain'});

      fileWriter.write(blob);

    }, errorHandler);

  }, errorHandler);

}

// function onInitFs(fs) {

//   fs.root.getFile('log.txt', {}, function(fileEntry) {

//     // Get a File object representing the file,
//     // then use FileReader to read its contents.
//     fileEntry.file(function(file) {
//        var reader = new FileReader();

//        reader.onloadend = function(e) {
//          var txtArea = document.createElement('textarea');
//          txtArea.value = this.result;
//          document.body.appendChild(txtArea);
//        };

//        reader.readAsText(file);
//     }, errorHandler);

//   }, errorHandler);

// }

// var path = 'music/genres/jazz/';

// function createDir(rootDirEntry, folders) {
//   // Throw out './' or '/' and move on to prevent something like '/foo/.//bar'.
//   if (folders[0] == '.' || folders[0] == '') {
//     folders = folders.slice(1);
//   }
//   rootDirEntry.getDirectory(folders[0], {create: true}, function(dirEntry) {
//     // Recursively add the new subfolder (if we still have another to create).
//     if (folders.length) {
//       createDir(dirEntry, folders.slice(1));
//     }
//   }, errorHandler);
// };

// function onInitFs(fs) {
//   createDir(fs.root, path.split('/')); // fs.root is a DirectoryEntry.
// }

// filesystem:http://example.com/temporary/
// window.requestFileSystem(window.TEMPORARY, 5*1024*1024 /*5MB*/, onInitFs);

function errorHandler(e) {
  var msg = '';

  switch (e.code) {
    case FileError.QUOTA_EXCEEDED_ERR:
      msg = 'QUOTA_EXCEEDED_ERR';
      break;
    case FileError.NOT_FOUND_ERR:
      msg = 'NOT_FOUND_ERR';
      break;
    case FileError.SECURITY_ERR:
      msg = 'SECURITY_ERR';
      break;
    case FileError.INVALID_MODIFICATION_ERR:
      msg = 'INVALID_MODIFICATION_ERR';
      break;
    case FileError.INVALID_STATE_ERR:
      msg = 'INVALID_STATE_ERR';
      break;
    default:
      msg = 'Unknown Error';
      break;
  };

  console.log('Error: ' + msg);
}
