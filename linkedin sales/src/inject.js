chrome.tabs.onUpdated.addListener(function(tabId, changeInfo) {
  if (changeInfo.status === 'complete') {
    // var newURL = "http://stackoverflow.com/";
    // chrome.tabs.create({ url: newURL });
    
    chrome.tabs.executeScript(tabId,
    {
      file: 'src/lib/jquery-2.1.4.min.js'
    },
    function () {
      chrome.tabs.executeScript(tabId,
      {
        file: 'src/lib/mozilla-localForage-1.2.4.min.js'
      },
      function () {
        chrome.tabs.executeScript(tabId,
        {
          file: 'src/payload.js'
        });
      });
    });
  }
});
