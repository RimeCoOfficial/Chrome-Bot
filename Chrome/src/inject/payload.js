console.log('loaded!');

// browse
function getElementsStartsWithId( id ) {
  var children = document.body.getElementsByTagName('*');
  var elements = [], child;
  for (var i = 0, length = children.length; i < length; i++) {
    child = children[i];
    if (child.id.substr(0, id.length) == id)
      elements.push(child);
  }
  return elements;
}

var data = {};

// Reset save data
// data['userPaths'] = {};
// chrome.storage.sync.set(data, function() { console.log("Saved reset", data); });

chrome.storage.sync.get("userPaths", function (obj) {
    console.log('userPaths', obj);

    page_url = document.URL;

    if (page_url.substring(0, 17) == "https://vimeo.com")
    {
        var userPaths = {};
        userPaths = obj['userPaths'];
        if (userPaths == undefined) userPaths = {};

        if (Object.keys(userPaths).length == 0)
        {
            // function browse(data)
            var el = getElementsStartsWithId('user_');
            if (el.length > 0)
            {
                for (var i = 0; i < el.length; i++) {
                // for (var i = 0; i < 2; i++) {
                  an_list = el[i].getElementsByTagName('a');
                  path = 'https://vimeo.com' + an_list[0].getAttribute('href');
                  // console.log(path);

                  userPaths[path] = 0;
                };

                // console.log(userPaths);

                console.log(Object.keys(userPaths).length + ' users found');

                var elNext = document.getElementsByClassName('pagination_next');
                if (elNext.length > 0)
                {
                    nextAnchor = elNext[0].getElementsByTagName('a');
                    nextPath = 'https://vimeo.com' + nextAnchor[0].getAttribute('href');
                    // nextAnchor.click();
                    console.log('next: ' + nextPath);
                    // this.document.location = nextPath;

                    userPaths['next'] = nextPath;
                }

                data['userPaths'] = userPaths;
                chrome.storage.sync.set(data, function() { console.log("Saved", data); });

                
                window.setTimeout(function() {
                    this.document.location = path;
                }, 2000);
            }
        }
        else {

            var el = document.getElementsByClassName('message btn iconify_envelope_b en');
            if (el.length > 0)
            {
                selfURL = document.URL;
                
                // check user in the list
                if (userPaths[selfURL] == 0)
                {
                    el[0].click();

                    // 1. wait for page to load
                    // 2. send message
                    window.setTimeout(function() {
                        var h1content = document.getElementById('content');
                        var h1span = h1content.getElementsByTagName('span')[0];
                        var userFullName = h1span.childNodes[0].nodeValue;

                        document.getElementById('cm_message').value = 'Hey '+userFullName+','
                        +"\n\n"
                        +"I like the art you are making. Your content is creative and engaging.\n"
                        +"\n"
                        +"Join the group of content creators. These people are vimeoers, youtubers, bloggers, artists and many other creative people from other niche community."
                        +"\n\n"
                        +"I am Girish, Co-Founder of Rime would like to invite you to join Rime  https://rime.co/?invited_by=Girish ."
                        +"\n\n"
                        +"I would love to help you setting up account if needed. It will take couple of minute to setup your rime profile and within an hour your contents will be visible to others."
                        +"\n\n"
                        +"Thank you, and let me know how I can return the favour. "
                        +"\n\n"
                        +"Thanks"+"\n"
                        +"Girish N"+"\n"
                        +"Web : https://rime.co/@Girish"+"\n"
                        +"E-mail : girishnayak@rime.co";


                        var count = document.getElementsByClassName('stat_list_count');
                        countValue = count[0].childNodes[0].nodeValue;

                        if (countValue > 5)
                        {
                            document.getElementsByClassName('btn btn_submit');
                            var el = document.getElementsByClassName('btn btn_submit');
                            el[0].click(); // enable to send message
                            console.log('msg send..');
                        }
                        
                        // mark it done
                        userPaths[selfURL] = 1;
                        console.log('done!');

                        // update list
                        data['userPaths'] = userPaths;
                        chrome.storage.sync.set(data, function() { console.log("Saved", data); });
                    }, 2000);
                }
            }

            window.setTimeout(function() {

                var got_next_user = 0;
                // goto next target
                for (var uPath in userPaths)
                {
                    if (userPaths[uPath] == 0)
                    {
                        got_next_user = 1;
                        console.log('next: '+uPath);
                        this.document.location = uPath;
                        break;
                    }
                }

                if (got_next_user == 0) {

                    // reset data
                    data['userPaths'] = {};
                    chrome.storage.sync.set(data, function() { console.log("Saved reset", data); });

                    // goto next page
                    this.document.location = userPaths['next'];
                }
            }, 4000);
        }
    }
});
