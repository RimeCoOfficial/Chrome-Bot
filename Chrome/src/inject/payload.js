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
chrome.storage.sync.get("userPaths", function (obj) {
    // console.log('userPaths', obj);

    var userPaths = {};
    userPaths = obj['userPaths'];

    if (userPaths == undefined) userPaths = {};

    // function browse(data)
    var el = getElementsStartsWithId('user_');
    if (el.length > 0)
    {
        for (var i = 0; i < el.length; i++) {
          an_list = el[i].getElementsByTagName('a');
          path = 'https://vimeo.com' + an_list[0].getAttribute('href');
          console.log(path);

          userPaths[path] = 0;
        };

        // console.log(userPaths);

        console.log(Object.keys(userPaths).length + ' users found');

        data['userPaths'] = userPaths;
        chrome.storage.sync.set(data, function() { console.log("Saved", data); });

        // window.setTimeout(function() {
        //     var elNext = document.getElementsByClassName('pagination_next');
        //     if (elNext.length > 0)
        //     {
        //         nextAnchor = elNext[0].getElementsByTagName('a');
        //         nextPath = 'https://vimeo.com' + nextAnchor[0].getAttribute('href');
        //         // nextAnchor.click();
        //         console.log('next: ' + nextPath);
        //         this.document.location = nextPath;
        //     }
        // }, 2000);
    }


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
                document.getElementById('cm_message').value = 'Hola';
                document.getElementsByClassName('btn btn_submit');
                var el = document.getElementsByClassName('btn btn_submit');
                // el[0].click();

                console.log('done!');

                // mark it done
                userPaths[selfURL] = 1;

                // update list
                data['userPaths'] = userPaths;
                chrome.storage.sync.set(data, function() { console.log("Saved", data); });
            }, 2000);
        }

        window.setTimeout(function() {
            // goto next target
            for (var uPath in userPaths)
            {
                if (userPaths[uPath] == 0)
                {
                    console.log('next: '+uPath);
                    this.document.location = uPath;
                    break;
                }
            }
        }, 4000);
    }
});


