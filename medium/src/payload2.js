console.log('loaded!!!!!');
var countOfPagesScrolled = 0;


localforage.config({
  driver      : localforage.INDEXEDDB, // Force WebSQL; same as using setDriver()
  name        : 'myApp',
  version     : 1.0,
  size        : 4980736, // Size of database, in bytes. WebSQL-only for now.
  storeName   : 'keyvaluepairs', // Should be alphanumeric, with underscores.
  description : 'some description'
});


$(document).ready(function() {
 	// if(window.location.href in )
 	// localforage.setItem(window.location.href,"visited");
 	var twitter = [];
 	$('a.button.button--chromeless.u-baseColor--buttonNormal.button--withIcon.button--withSvgIcon').each(function(){
 		 twitter.push($(this).attr('href'));
 	});
 	console.log(twitter.slice(1));
 	localforage.setItem(window.location.href,
 		twitter.slice(1));
 	go_next();
});

function go_next(){
next_task_url = null;
localforage.iterate(function(value,key,iterationNumber){
	console.log("iterating "+key);
	// window.location.assign(key);

	if (next_task_url == null && value == ' ')
	{
		next_task_url = key;
	}
},function() {
      console.log('Iteration is complete');

      if (next_task_url !== null) {
        console.log('Redirect to: ' + next_task_url);
        window.location = next_task_url;
      }
      else console.log('All done!');
    });
}