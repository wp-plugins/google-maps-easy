var gmpAdminFormChanged = []
,	gmpDefaultOpenTab = '';
window.onbeforeunload = function() {
	if (window.EasyGoogleMaps && window.EasyGoogleMaps.EditMapController) {
		if (window.EasyGoogleMaps.EditMapController.Form.isDirty()) {
			return 'You have not saved your changes after editing map. ' +
				'Do you want to leave this page without saving?';
		}
	}
};
jQuery(document).ready(function(){
	jQuery('#gmpAdminOptionsTabs').tabs({
		beforeActivate: function( event, ui ) {
		   if(!checkAdminFormSaved())
			   return false;
		}
	});
    jQuery('#gmpAdminOptionsTabs li').removeClass('ui-corner-top').addClass('ui-corner-left');
	//jQuery('#gmpAdminOptionsTabs li a[href="#gmpAllMaps"]').click(function(){
	//	if(checkAdminFormSaved()) {
	//		gmpOpenMapLists();
	//		// Mark tab as active, as we marked it as deactivated when went to edit map form
	//		jQuery(this).parents('li:first').addClass('ui-tabs-active');
	//	}
	//});
	jQuery('#gmpAdminOptionsTabs li a[href="#gmpMarkerList"]').click(function(){
		if(checkAdminFormSaved()) {
			jQuery('.gmpCancelMarkerEditing').trigger('click');
		}
	});
	jQuery('#gmpAdminOptionsSaveMsg').submit(function(){
		return false;
	});
	jQuery('.gmpOptTip').live('mouseover',function(event){
		if(!jQuery('#gmpOptDescription').attr('toeFixTip')) {
			var pageY = event.pageY - jQuery(window).scrollTop();
			var pageX = event.pageX;
			var tipMsg = jQuery(this).attr('tip');
			var moveToLeft = jQuery(this).hasClass('toeTipToLeft');	// Move message to left of the tip link
			if(typeof(tipMsg) == 'undefined' || tipMsg == '') {
				tipMsg = jQuery(this).attr('title');
			}
			toeOptShowDescriptionGmp( tipMsg, pageX, pageY, moveToLeft );
			jQuery('#gmpOptDescription').attr('toeFixTip', 1);
		}
		return false;
    });
    jQuery('.gmpOptTip').live('mouseout',function(){
		toeOptTimeoutHideDescriptionGmp();
        return false;
    });
	jQuery('#gmpOptDescription').live('mouseover',function(e){
		jQuery(this).attr('toeFixTip', 1);
		return false;
    });
	jQuery('#gmpOptDescription').live('mouseout',function(e){
		toeOptTimeoutHideDescriptionGmp();
		return false;
    });
	// If some changes was made in those forms and they were not saved - show message for confirnation before page reload
	var formsPreventLeave = ['gmpAddMarkerToEditMap', 'gmpEditMapForm'];
	jQuery('#'+ formsPreventLeave.join(', #')).find('input,select').change(function(e){
		if(e.originalEvent) {
			var formId = jQuery(this).parents('form:first').attr('id');
			changeAdminFormGmp(formId);
		}
	});
	jQuery('#'+ formsPreventLeave.join(', #')).find('input[type=text],textarea').keyup(function(e){
		if(e.originalEvent) {
			var formId = jQuery(this).parents('form:first').attr('id');
			changeAdminFormGmp(formId);
		}
	});
	if(gmpDefaultOpenTab && gmpDefaultOpenTab != '') {
		// Call after all initialization will compleate
		setTimeout(function(){
			switch(gmpDefaultOpenTab) {
				case 'gmpAddNewMap':
					// Wait until tiny wp editor will be fully loaded
					setTimeout(gmpShowAddMap, 2000);
					break;
				case 'gmpMarkerList':
					selectTabMainGmp('gmpMarkerList');
					break;
				case 'gmpMarkerGroups':
					selectTabMainGmp('gmpMarkerGroups');
					break;
				case 'gmpPluginSettings':
					selectTabMainGmp('gmpPluginSettings');
					break;
			}
		}, 500);
	}
});
function changeAdminFormGmp(formId) {
	if(jQuery.inArray(formId, gmpAdminFormChanged) == -1)
		gmpAdminFormChanged.push(formId);
}
function adminFormSavedGmp(formId) {
	if(gmpAdminFormChanged.length) {
		for(var i in gmpAdminFormChanged) {
			if(gmpAdminFormChanged[i] == formId) {
				gmpAdminFormChanged.pop(i);
			}
		}
	}
}
function checkAdminFormSaved() {
	if(gmpAdminFormChanged.length) {
		if(!confirm(toeLangGmp('Some changes were not-saved. Are you sure you want to leave?'))) {
			return false;
		}
		gmpAdminFormChanged = [];	// Clear unsaved forms array - if user wanted to do this
	}
	return true;
}
function isAdminFormChanged(formId) {
	if(gmpAdminFormChanged.length) {
		for(var i in gmpAdminFormChanged) {
			if(gmpAdminFormChanged[i] == formId) {
				return true;
			}
		}
	}
	return false;
}
function toeShowDialogCustomized(element, options) {
	options = jQuery.extend({
		resizable: false
	,	width: 500
	,	height: 300
	,	closeOnEscape: true
	,	open: function(event, ui) {
			jQuery('.ui-dialog-titlebar').css({
				'background-color': '#222222'
			,	'background-image': 'none'
			,	'border': 'none'
			,	'margin': '0'
			,	'padding': '0'
			,	'border-radius': '0'
			,	'color': '#CFCFCF'
			,	'height': '27px'
			});
			jQuery('.ui-dialog-titlebar-close').css({
				'background': 'url("'+ GMP_DATA.cssPath+ 'img/tb-close.png") no-repeat scroll 0 0 transparent'
			,	'border': '0'
			,	'width': '15px'
			,	'height': '15px'
			,	'padding': '0'
			,	'border-radius': '0'
			,	'margin': '6px 6px 0'
			,	'float': 'right'
			}).html('').removeClass('ui-dialog-titlebar-close');
			jQuery('.ui-dialog').css({
				'border-radius': '3px'
			,	'background-color': '#FFFFFF'
			,	'background-image': 'none'
			,	'padding': '1px'
			,	'z-index': '300000'
			});
			jQuery('.ui-dialog-buttonpane').css({
				'background-color': '#FFFFFF'
			});
			jQuery('.ui-dialog-title').css({
				'color': '#CFCFCF'
			,	'font': '12px sans-serif'
			,	'padding': '6px 10px 0'
			});
			if(options.openCallback && typeof(options.openCallback) == 'function') {
				options.openCallback(event, ui);
			}
			jQuery('.ui-widget-overlay').css({
				'z-index': jQuery( event.target ).parents('.ui-dialog:first').css('z-index') - 1
			,	'background-image': 'none'
			});
			if(options.modal && options.closeOnBg) {
				jQuery('.ui-widget-overlay').unbind('click').bind('click', function() {
					jQuery( element ).dialog('close');
				});
			}
		}
	}, options);
	return jQuery(element).dialog(options);
}
function selectTabMainGmp(id) {
	/*var index = jQuery('#gmpAdminOptionsTabs a[href="#'+ id+ '"]').parent().index();
	jQuery('#gmpAdminOptionsTabs').tabs('option', 'active', index);*/
	selectTab(id, 'gmpAdminOptionsTabs');
}
function selectTab(id, tabsElementId) {
	var tabsSelector = '#'+ tabsElementId
	,	index = jQuery(tabsSelector+ ' a[href="#'+ id+ '"]').parent().index();
	jQuery(tabsSelector).tabs('option', 'active', index);
}