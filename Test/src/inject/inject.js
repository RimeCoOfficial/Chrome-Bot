chrome.tabs.onUpdated.addListener(function(tabId, changeInfo) {
    if (changeInfo.status === 'complete') {
        // var newURL = "http://stackoverflow.com/";
        // chrome.tabs.create({ url: newURL });
        
        chrome.tabs.executeScript(tabId, {
            file: 'src/inject/jquery-2.1.4/jquery-2.1.4.min.js'
        });

        chrome.tabs.executeScript(tabId, {
            file: 'src/inject/mozilla-localForage-1.2.4/localforage.min.js'
        });

        chrome.tabs.executeScript(tabId, {
            file: 'src/inject/payload.js'
        });
    }
});