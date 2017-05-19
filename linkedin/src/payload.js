console.log('loaded!!!!!');
var countOfPagesScrolled = 0;
var counter = 0;

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

 		// var b = $(this).find('button.search-result__actions--primary');
 		// $(b).click();

 		// var c = $(this).find('button.button-primary-large');
 		// $(c).click();

 		// var c = $(this).find('send-invite__cancel-btn');
 		// setTimeout(function(){
 		// $(c).click();
 		// }, 1000);

 	});
 	setTimeout(function(){
		$("button.next").click();
	}, 2000);
 	
 }

 $(document).ready(function() {
 scrollDown(document.body.clientHeight,0);
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
