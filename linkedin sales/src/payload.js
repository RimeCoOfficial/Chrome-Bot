console.log('🤖 loaded!!!!!');

var countOfPagesScrolled = 0;
var maxcount = 1000;

localforage.config({
  driver      : localforage.INDEXEDDB, // Force WebSQL; same as using setDriver()
  name        : 'myApp',
  version     : 1.0,
  size        : 4980736, // Size of database, in bytes. WebSQL-only for now.
  storeName   : 'keyvaluepairs', // Should be alphanumeric, with underscores.
  description : 'some description'
});

function sendrequest(){
    interval = 2000;

    //taking the details one person a time
    $('li.result').each(function() {
        var details = $(this).find('div.entity-info').text();
        details = details.replace(/\s+/g, '');

        var name = $(this).find('div.name-container').text();
        var name_res = name.split(" ");
        var first_name = name_res[0];
        
        // details = $(this).text().replace(/ /g,'');
        // console.log(details);
        // console.log(this);

        var b = $(this).find('button.action.connect');
        setTimeout( function(){ $(b).click(); }, interval);
        interval += 15000 + Math.floor(Math.random() * 29000);

        interval2 = 3000 + Math.floor(Math.random() * 10000);
        setTimeout( function(){
            var c = $('#dialog');
            var invite_btn = c.find('button.submit-button');
            var text_area = c.find('#connect-message-content');

            $(text_area).val("Hi " + first_name + ", It's great to connect with like-minded people. I am the founder of AI blog building platform Rime(https://rime.co), IIT-B Alumni and working on a couple of cutting-edge products. I hope varied geographical knowledge will be useful for each other. Thanks for connecting!");

            setTimeout(function(){
                $(invite_btn).each(function() { $(this).click(); });
            }, interval2);

            console.log(details);

            //counting the number of results in a page
            counter++;
            //storing the count in local storage
            localforage.setItem('counter', counter);

        }, interval);
        interval += interval2;
    });

    console.log("total request sent: " + counter);

    //going to the next page
    setTimeout(function(){
        console.log("go to next page");
        $('a.next-pagination.page-link>span.pagination-text').click();
    }, interval + 3000);
 }

 $(document).ready(function() {
    
    //going to the local storage to get the current count
    localforage.getItem('counter',function(err, value){
        if( isNaN(value)){
            counter =0;
            localforage.setItem('counter', counter);
        }
        else{
            counter = value;
        }

        //only send maxcount request at one time
        if(counter < maxcount){
            setTimeout(function() { return sendrequest(); }, 4000);
        }
        else console.log('max request sent ' + maxcount + '!!!');
    });
});
