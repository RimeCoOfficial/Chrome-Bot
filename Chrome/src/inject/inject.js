chrome.tabs.onUpdated.addListener(function(tabId, changeInfo) {
    if (changeInfo.status === 'complete') {
        // var newURL = "http://stackoverflow.com/";
        // chrome.tabs.create({ url: newURL });
        
        chrome.tabs.executeScript(tabId, {
            // allFrames: true, 
            file: 'src/inject/payload.js'
        });
    }
});