console.log('🤖 loaded!!!!!');

var countOfPagesScrolled = 0;
var maxcount = 1500;

localforage.config({
  driver      : localforage.INDEXEDDB, // Force WebSQL; same as using setDriver()
  name        : 'myApp',
  version     : 1.0,
  size        : 4980736, // Size of database, in bytes. WebSQL-only for now.
  storeName   : 'keyvaluepairs', // Should be alphanumeric, with underscores.
  description : 'some description'
});

function sendrequest(interval = 500){

 	//taking the details one person a time
 	$('li.search-result').each(function() {
 		var details = $(this).find('div.search-result__info').text();
        details = details.replace(/\s+/g, '');
 		// details = $(this).text().replace(/ /g,'');
 		// console.log(details);
 		// console.log(this);
 		
 		//counting the number of results in a page
 		counter++;
 		//storing the count in local storage
 		localforage.setItem('counter', counter);

        var b = $(this).find('button.search-result__actions--primary.button-secondary-medium.m5');
        setTimeout( function(){ $(b).click(); }, interval);
        interval += 2000;

        setTimeout( function(){
            var c = $('#li-modal-container');
            // var popup_btn = c.find('button.send-invite__cancel-btn');
            var popup_btn = c.find('button.button-primary-large.ml3');

            $(popup_btn).each(function() { $(this).click(); });

            console.log(details);

        }, interval);
        interval += 3000;
 	});

    console.log("total request sent: " + counter);

 	//going to the next page
 	setTimeout(function(){
        console.log("go to next page");

		$("button.next").click();
	}, interval+1000);
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
	 		scrollDown(document.body.clientHeight,1);
		}
        else console.log('max request sent ' + maxcount + '!!!');
	});
});

//scrolling function
function scrollDown(height, countOfPagesScrolled){
	scroll(0, document.body.clientHeight);
	setTimeout(function(){
		if(height != document.body.clientHeight && countOfPagesScrolled > 0){

            console.log('scroll to bottom');
			scrollDown(document.body.clientHeight, --countOfPagesScrolled);
		}
        else{

			return sendrequest();
        }
	}, 3000);
}
