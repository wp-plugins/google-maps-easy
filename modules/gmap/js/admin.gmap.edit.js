var g_gmpMap = null
,	g_gmpMapMarkersIdsAdded = []	// Markers, added for map
,	g_gmpEditMap = false	// Adding or editing map
,	g_gmpCurrentEditMarker = null
,	g_gmpTinyMceEditorUpdateBinded = false
,	g_gmpMarkerFormChanged = false;
jQuery(document).ready(function(){
	// Preview map definition
	gmpMainMap = typeof(gmpMainMap) === 'undefined' ? null : gmpMainMap;
	var previewMapParams = {};
	if(gmpMainMap) {
		previewMapParams = gmpMainMap.params;
		g_gmpEditMap = true;
	}
	g_gmpMap = new gmpGoogleMap('#gmpMapPreview', previewMapParams);
	if(gmpMainMap && gmpMainMap.markers) {
		gmpMainMap.markers = _gmpPrepareMarkersList(gmpMainMap.markers, {
			dragend: _gmpMarkerDragEndClb
		});
		for(var i in gmpMainMap.markers) {
			var newMarker = g_gmpMap.addMarker( gmpMainMap.markers[i] );
			newMarker.setTitle( gmpMainMap.markers[i].title, true );
			newMarker.setDescription( gmpMainMap.markers[i].description );
		}
	}
	// Map saving form
	jQuery('#gmpMapForm').submit(function(){
		var currentId = gmpGetCurrentId()
		,	firstTime = currentId ? false : true;

		jQuery(this).find('input[name="map_opts[map_center][coord_x]"]').val(g_gmpMap.getCenter().lat());
		jQuery(this).find('input[name="map_opts[map_center][coord_y]"]').val(g_gmpMap.getCenter().lng());
		jQuery(this).find('input[name="map_opts[zoom]"]').val(g_gmpMap.getZoom());
		
		jQuery(this).sendFormGmp({
			btn: '#gmpMapSaveBtn'
		,	appendData: {add_marker_ids: g_gmpMapMarkersIdsAdded}
		,	onSuccess: function(res) {
				if(!res.error) {
					if(res.data.map_id) {
						jQuery('#gmpMapForm input[name="map_opts[id]"]').val( res.data.map_id );
					}
					if(firstTime) {
						gmpCheckShortcode();
						if (res.data.edit_url) {
							setBrowserUrl( res.data.edit_url );
							jQuery('.supsystic-main-navigation-list li').removeClass('active');
							jQuery('.supsystic-main-navigation-list li[data-tab-key="gmap"]').addClass('active');
						}
						g_gmpMapMarkersIdsAdded = [];
						gmpMainMap = res.data.map;
					}
					if(_gmpIsMarkerFormChanged() && jQuery('#gmpMarkerForm input[name="marker_opts[title]"]').val() != '') {
						jQuery('#gmpMarkerForm').submit();
					}
				}
			}
		});
		return false;
	});
	jQuery('#gmpMapSaveBtn').click(function(){
		jQuery('#gmpMapForm').submit();
		return false;
	});
	// Check - should we show shortcode block or not
	gmpCheckShortcode();
	// Markers form functionality
	jQuery('#gmpAddNewMarkerBtn').click(function(){
		gmpOpenMarkerForm();
		// Add new marker - right after click on "Add new"
		var mapCenter = g_gmpMap.getCenter();
		gmpSetCurrentMarker( g_gmpMap.addMarker({
			position: mapCenter
		,	icon: gmpGetIconPath()
		,	draggable: true
		,	dragend: _gmpMarkerDragEndClb
		}));
		jQuery('#gmpMarkerForm [name="marker_opts[coord_x]"]').val(mapCenter.lat());
		jQuery('#gmpMarkerForm [name="marker_opts[coord_y]"]').val(mapCenter.lng());
		return false;
	});
	jQuery('#gmpSaveMarkerBtn').click(function(){
		jQuery('#gmpMarkerForm').submit();
		return false;
	});
	// Marker saving
	jQuery('#gmpMarkerForm').submit(function(){
		var currentMapId = gmpGetCurrentId()
		,	currentMarkerMapId = parseInt( jQuery('#gmpMarkerForm input[name="marker_opts[map_id]"]').val() );
		if(currentMapId && !currentMarkerMapId) {
			jQuery('#gmpMarkerForm input[name="marker_opts[map_id]"]').val( currentMapId );
		}
		jQuery('#gmpMarkerForm input[name="marker_opts[description]"]').val( gmpGetTxtEditorVal('markerDescription') );
		
		jQuery(this).sendFormGmp({
			btn: jQuery('#gmpSaveMarkerBtn')
		,	onSuccess: function(res) {
				if(!res.error) {
					if(!res.data.update) {
						jQuery('#gmpMarkerForm input[name="marker_opts[id]"]').val( res.data.marker.id );
						gmpGetCurrentMarker().setId( res.data.marker.id );
					}
					if(!currentMarkerMapId) {
						g_gmpMapMarkersIdsAdded.push( res.data.marker.id );
						
					}
					gmpRefreshMapMarkersList( true );
					_gmpUnchangeMarkerForm();
				}
			}
		});
		return false;
	});
	jQuery('#gmpMarkerForm').find('input,textarea,select').change(function(){
		_gmpChangeMarkerForm();
	});
	gmpInitIconsWnd();
	jQuery('#gmpMarkerForm [name="marker_opts[title]"]').keyup(function(){
		var marker = gmpGetCurrentMarker();
		if(marker) {
			marker.setTitle( jQuery(this).val() );
			marker.showInfoWnd();
		}
	});
	// Build initial markers list
	gmpRefreshMapMarkersList();
	// Bind change marker description - with it's description in map preview
	setTimeout(function(){
		gmpBindTinyMceUpdate();
		if(!g_gmpTinyMceEditorUpdateBinded) {
			jQuery('.wp-switch-editor.switch-tmce').click(function(){
				setTimeout(gmpBindTinyMceUpdate, 500);
			});
		}
	}, 500);
	jQuery('#gmpMarkerForm [name="marker_opts[address]"]').mapSearchAutocompleateGmp({
		msgEl: ''
	,	onSelect: function(item, event, ui) {
			if(item) {
				jQuery('#gmpMarkerForm [name="marker_opts[coord_x]"]').val(item.lat);
				jQuery('#gmpMarkerForm [name="marker_opts[coord_y]"]').val(item.lng).trigger('change');
			}
		}
	});
	jQuery('#gmpMarkerForm').find('input[name="marker_opts[coord_x]"],input[name="marker_opts[coord_y]"]').change(function(){
		var currentMarker = gmpGetCurrentMarker();
		if(currentMarker) {
			currentMarker.setPosition(jQuery('#gmpMarkerForm [name="marker_opts[coord_x]"]').val(), jQuery('#gmpMarkerForm [name="marker_opts[coord_y]"]').val());
		}
	});
});
jQuery(window).load(function(){
	jQuery('#gmpMapRightStickyBar').width( jQuery('#gmpMapRightStickyBar').width() );
});
function gmpBindTinyMceUpdate() {
	if(!g_gmpTinyMceEditorUpdateBinded && typeof(tinyMCE) !== 'undefined' && tinyMCE.editors && tinyMCE.editors.markerDescription) {
		tinyMCE.editors.markerDescription.onKeyUp.add(function(){
			var marker = gmpGetCurrentMarker();
			if(marker) {
				marker.setDescription( gmpGetTxtEditorVal('markerDescription') );
				marker.showInfoWnd();
			}
		});
		g_gmpTinyMceEditorUpdateBinded = true;
	}
}
function gmpCheckShortcode() {
	var currentId = gmpGetCurrentId();
	if(currentId) {
		jQuery('#shortcodeCode .gmpMapShortCodeShell').html('['+ gmpMapShortcode+ ' id="'+ currentId+ '"]');
		jQuery('#shortcodeCode').slideDown( g_gmpAnimationSpeed );
		jQuery('#shortcodeNotice').slideUp( g_gmpAnimationSpeed );
	} else {
		jQuery('#shortcodeCode').hide();
		jQuery('#shortcodeNotice').show();
	}
}
function gmpGetCurrentId() {
	return parseInt( jQuery('#gmpMapForm input[name="map_opts[id]"]').val() );
}
function gmpInitIconsWnd() {
	var $container = jQuery('#gmpIconsWnd').dialog({
		modal:    true
	,	autoOpen: false
	,	width: 540
	,	height: 600
	});

	jQuery('#gmpMarkerIconBtn').click(function(){
		$container.dialog('open');
		return false;
	});
	jQuery('.previewIcon').click(function(){
		var newId = jQuery(this).data('id');
		jQuery('#gmpMarkerForm input[name="marker_opts[icon]"]').val( newId );
		gmpSetIconImg();
		gmpGetCurrentMarker().setIcon( gmpGetIconPath() );
		$container.dialog('close');
		return false;
	});
}
function gmpSetIconImg() {
	var id = parseInt( jQuery('#gmpMarkerForm input[name="marker_opts[icon]"]').val() );
	jQuery('#gmpMarkerIconPrevImg').attr('src', jQuery('.previewIcon[data-id="'+ id+ '"] img').attr('src'));
}
function gmpGetIconPath() {
	return jQuery('#gmpMarkerIconPrevImg').attr('src');
}
function gmpSetCurrentMarker(marker) {
	g_gmpCurrentEditMarker = marker;
}
function gmpGetCurrentMarker() {
	return g_gmpCurrentEditMarker;
}
function gmpRefreshMapMarkersList(fromServer) {
	var shell = jQuery('#markerList');
	var buildListClb = function(markersList) {
		if(gmpMainMap)
			gmpMainMap.markers = markersList;
		shell.find('.gmpMapMarkerRow:not(#markerRowTemplate)').remove();
		if(markersList && markersList.length) {
			for(var i = 0; i < markersList.length; i++) {
				var newRow = jQuery('#markerRowTemplate').clone();
				newRow.find('.egm-marker-icon img').attr('src', markersList[i].icon_data.path);
				newRow.find('.egm-marker-title').html(markersList[i].title);
				newRow.find('.egm-marker-latlng').html(parseFloat(markersList[i].coord_x).toFixed(2)+ '"N '+ parseFloat(markersList[i].coord_y).toFixed(2)+ '"E');
				newRow.data('id', markersList[i].id);
				newRow.find('.egm-marker-edit').click(function(){
					var markerRow = jQuery(this).parents('.gmpMapMarkerRow:first');
					gmpOpenMarkerEdit( markerRow.data('id') );
					return false;
				});
				newRow.find('.egm-marker-remove').click(function(){
					var markerRow = jQuery(this).parents('.gmpMapMarkerRow:first');
					gmpRemoveMarkerFromMapTblClick(markerRow.data('id'), markerRow);
					return false;
				});
				newRow.removeAttr('id').show();
				shell.append( newRow );
			}
		}
	};
	if(fromServer) {
		shell.find('.egm-marker').css('opacity', '0.5');
		shell.addClass('supsystic-inline-loader');
		var currentMapId = gmpGetCurrentId();
		jQuery.sendFormGmp({
			data: {mod: 'marker', action: 'getMapMarkers', map_id: (currentMapId ? currentMapId : 0), 'added_marker_ids': g_gmpMapMarkersIdsAdded}
		,	onSuccess: function(res) {
				if(!res.error) {
					shell.find('.egm-marker').css('opacity', '1');
					shell.removeClass('supsystic-inline-loader');
					buildListClb( res.data.markers );
				}
			}
		});
	} else {
		if(gmpMainMap)
			buildListClb( gmpMainMap.markers );
	}
}
function gmpOpenMarkerEdit(id) {
	gmpOpenMarkerForm();
	var marker = g_gmpMap.getMarkerById( id );
	if(marker) {
		var markerParams = marker.getRawMarkerParams();
		jQuery('#gmpMarkerForm input[name="marker_opts[title]"]').val( markerParams.title );
		gmpSetTxtEditorVal('markerDescription', markerParams.description);
		jQuery('#gmpMarkerForm input[name="marker_opts[icon]"]').val( markerParams.icon_data.id );
		jQuery('#gmpMarkerForm input[name="marker_opts[address]"]').val( markerParams.address );
		jQuery('#gmpMarkerForm input[name="marker_opts[coord_x]"]').val( markerParams.coord_x );
		jQuery('#gmpMarkerForm input[name="marker_opts[coord_y]"]').val( markerParams.coord_y );
		jQuery('#gmpMarkerForm input[name="marker_opts[id]"]').val( markerParams.id );
		gmpSetIconImg();
		gmpSetCurrentMarker( marker );
		marker.showInfoWnd();
	}
}
function gmpRemoveMarkerFromMapTblClick(markerId, row) {
	var markerTitle = row ? row.find('.egm-marker-title').text() : '';
	if(!confirm('Remove "'+ markerTitle+ '" marker?')) {
		return false;
	}
	if(markerId == ''){
		return false;
	}
	jQuery.sendFormGmp({
		btn: row.find('.egm-marker-remove')
	,	data: {action: 'removeMarker', mod: 'marker', id: markerId}
	,	onSuccess: function(res) {
			if(!res.error){
				if(row) {
					row.slideUp(g_gmpAnimationSpeed, function(){
						row.remove();
					});
				}
				g_gmpMap.removeMarker( markerId );
				gmpResetMarkerForm();
				gmpRefreshMapMarkersList( true );
			}
		}
	});
}
function gmpOpenMarkerForm() {
	gmpShowMarkerForm();
	gmpResetMarkerForm();
}
function gmpShowMarkerForm() {
	var markerFormIsVisible = jQuery('#gmpMarkerForm').is(':visible');
	if(!markerFormIsVisible) {
		var btnClone = jQuery('#gmpAddNewMarkerBtn').clone().css('width', 'auto').appendTo('#containerWrapper')
		,	requiredWidth = btnClone.outerWidth();
		btnClone.remove();
		jQuery('#gmpAddNewMarkerBtn').animate({
			'width': requiredWidth
		}, g_gmpAnimationSpeed);
		jQuery('#gmpSaveMarkerBtn').show( g_gmpAnimationSpeed );
		jQuery('#gmpMarkerForm').slideDown( g_gmpAnimationSpeed );
	}
}
function gmpResetMarkerForm() {
	jQuery('#gmpMarkerForm')[0].reset();
	jQuery('#gmpMarkerForm input[name="marker_opts[id]"]').val('');
	jQuery('#gmpMarkerForm input[name="marker_opts[icon]"]').val( 1 );
	gmpSetIconImg();
}
function _gmpMarkerDragEndClb() {
	var currentMarkerIdInForm = g_gmpCurrentEditMarker ? g_gmpCurrentEditMarker.getId() : 0
	,	draggedId =  this.getId();
	if((currentMarkerIdInForm && currentMarkerIdInForm == draggedId) || (!currentMarkerIdInForm && !draggedId)) {
		jQuery('#gmpMarkerForm input[name="marker_opts[coord_x]"]').val( this.lat() );
		jQuery('#gmpMarkerForm input[name="marker_opts[coord_y]"]').val( this.lng() );
	}
	if(draggedId) {	// Just save it in database
		jQuery.sendFormGmp({
			data: {mod: 'marker', action: 'updatePos', id: draggedId, lat: this.lat(), lng: this.lng()}
		,	onSuccess: function(res) {
				if(!res.error) {
					gmpRefreshMapMarkersList( true );
				}
			}
		});
	}
}
function _gmpIsMarkerFormChanged() {
	return g_gmpMarkerFormChanged;
}
function _gmpChangeMarkerForm() {
	g_gmpMarkerFormChanged = true;
}
function _gmpUnchangeMarkerForm() {
	g_gmpMarkerFormChanged = false;
}