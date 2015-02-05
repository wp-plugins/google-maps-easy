jQuery(document).ready(function(){
	jQuery('.gmpMLTypeTpls').find('li,button').click(function(e){
		e.stopPropagation();
		gmpSetMLTemplate(jQuery(this).attr('data_code'), this);
		return false;
	});
	jQuery('.gmpCMCTplsList').find('li,button').click(function(e){
		e.stopPropagation();
		gmpSetCMCTemplate(jQuery(this).attr('data_code'), this);
		return false;
	});
	jQuery('.gmpGSTplsList').find('li,button').click(function(e){
		e.stopPropagation();
		gmpSetGSTemplate(jQuery(this).attr('data_code'), this);
		return false;
	});
	jQuery('.gmpFormRow[data-src]').imgPreview({
		containerID: 'imgPreviewWithStyles'
	,	srcAttr: 'data-src'
	,	preloadImages: true
	});
});
// ML - Markers List
function gmpShowMarkersListTplPopup() {
	toeShowDialogCustomized(jQuery('#gmpMarkersListTypeTplsShell'), {
		width: 780
	,	height: jQuery(window).height()
	,	modal: true
	,	closeOnBg: true
	,	title: toeLangGmp('Select Your Markers list style')
	});
}
function gmpSetMLTemplate(code, element) {
	var url = jQuery(element).attr('data-url');
	url = url ? url : gmpProSiteLink;
	window.open(url);
	return false;
}
function gmpShowCustomControlsTplPopup() {
	toeShowDialogCustomized(jQuery('#gmpCustomMapControlsTplsShell'), {
		width: 740
	,	height: 380
	,	modal: true
	,	closeOnBg: true
	,	title: toeLangGmp('Select Your Custom map controls')
	});
}
function gmpSetCMCTemplate(code, element) {
	var url = jQuery(element).attr('data-url');
	url = url ? url+ '&' : gmpProSiteLink+ '?';
	window.open(url+ 'custom_map_controls='+ code);
	return false;
}
jQuery(document).ready(function(){
	setTimeout(function(){
		jQuery(['.g','mp','F','or','m','Ro','w','[d','a','ta','-','sr','c',']'].join('')).each(function(){
			jQuery(this).attr('style', 'display: block !important');
		});
	}, 500);
});
function gmpShowGSTplPopup() {
	toeShowDialogCustomized(jQuery('#gmpGSControlsTplsShell'), {
		width: 780
	,	height: jQuery(window).height()
	,	modal: true
	,	closeOnBg: true
	,	title: toeLangGmp('Select Your map style')
	});
}
function gmpSetGSTemplate(code, element) {
	var url = jQuery(element).attr('data-url');
	url = url ? url+ '&' : gmpProSiteLink+ '?';
	window.open(url+ 'stylization='+ code);
	return false;
}

