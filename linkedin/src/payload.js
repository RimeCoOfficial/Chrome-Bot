console.log('loaded!!!!!');

var counter = 0;

 function sendrequest(){
 	$('li.search-result').each(function() {
 		// var details = $(this).find('div.search-result__info').text();
 		var details = $(this).text();
 		console.log(details);
 		console.log(this);

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
 // 	setTimeout(function(){
	// 	$("button.next").click();
	// }, 2000);
 	
 }

 $(document).ready(function() {
 sendrequest();
});
