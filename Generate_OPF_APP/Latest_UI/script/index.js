$(document).ready(function (){
	if ($('.sidebar').height() > $('.main').height()) {
		//$('.sidebar').attr('style','height: ' + $('.main').height());
		//alert($('.sidebar').height());
		/*setInterval(function () {

			start();
	   }, 3000); */

	}
});


function animateContent(direction) {  
    var animationOffset = $('.main').height() - $('.sidebar').height();
    if (direction == 'up') {
        animationOffset = 0;
    }

    console.log("animationOffset:"+animationOffset);
    $('.sidebar').animate({ "marginTop": (animationOffset)+ "px" }, 9000);
}

function up(){
    animateContent("up")
}
function down(){
    animateContent("down")
}

function start(){
	setTimeout(function () {
		down();
	}, 2000);
	setTimeout(function () {
		up();
	}, 2000);
	setTimeout(function () {
		console.log("wait...");
	}, 5000);
} 
