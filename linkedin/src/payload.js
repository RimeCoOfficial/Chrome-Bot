console.log('loaded!!!!!');
var countOfPagesScrolled = 0;
var maxcount = 150;

localforage.config({
  driver      : localforage.INDEXEDDB, // Force WebSQL; same as using setDriver()
  name        : 'myApp',
  version     : 1.0,
  size        : 4980736, // Size of database, in bytes. WebSQL-only for now.
  storeName   : 'keyvaluepairs', // Should be alphanumeric, with underscores.
  description : 'some description'
});

 function sendrequest(){
 	//taking the details one person a time
 	$('li.search-result').each(function() {
 		// var details = $(this).find('div.search-result__info').text();
 		var details = $(this).text();
 		console.log(details);
 		console.log(this);
 		
 		//counting the number of results in a page
 		counter++;
 		console.log("count is " + counter);
 		//storing the count in local storage
 		localforage.setItem('counter', counter);

 		//sending request
 		// var b = $(this).find('button.search-result__actions--primary');
 		// $(b).click();

 		//confirming sending request
 		// var c = $(this).find('button.button-primary-large');
 		// setTimeout(function(){
 		// $(c).click();
 		// }, 1000);

 		//cancel request
 		// var c = $(this).find('send-invite__cancel-btn');
 		// setTimeout(function(){
 		// $(c).click();
 		// }, 1000);

 	});
 	//going to the next page
 	setTimeout(function(){
		$("button.next").click();
	}, 2000);
 	
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
	 		scrollDown(document.body.clientHeight,0);
		}
	});
});

//scrolling function
function scrollDown(height, countOfPagesScrolled){
	scroll(0, document.body.clientHeight);
	setTimeout(function(){
		if(height != document.body.clientHeight && countOfPagesScrolled > 0){
			scrollDown(document.body.clientHeight, --countOfPagesScrolled);
		}else
			return sendrequest();
	}, 1500);
}
