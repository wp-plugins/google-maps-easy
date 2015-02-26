jQuery.fn.scrollTo = function(elem) { 
	jQuery(this).scrollTop(jQuery(this).scrollTop() - jQuery(this).offset().top + jQuery(elem).offset().top); 
	return this; 
};
function toggleBounce(marker,animType) {
	if(animType == 0 || !marker){
		return false;   
	}
	if (marker.getAnimation() != null) {
		marker.setAnimation(null);
	} else if(animType==2) {	
		marker.setAnimation(null);
	} else {
		marker.setAnimation(google.maps.Animation.BOUNCE);
	}
}