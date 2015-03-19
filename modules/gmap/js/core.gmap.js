// Maps
function gmpGoogleMap(elementId, params) {
	if(typeof(google) === 'undefined') {
		alert('Please check your Internet connection - we need it to load Google Maps Library from Google Server');
		return false;
	}
	params = params ? params : {};
	var defaults = {
		center: new google.maps.LatLng(40.69847032728747, -73.9514422416687)
	,	zoom: 8
	,	mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	if(params.type) {
		params.mapTypeId = params.type;
	}
	if(params.map_center && params.map_center.coord_x && params.map_center.coord_y) {
		params.center = new google.maps.LatLng(params.map_center.coord_x, params.map_center.coord_y);
	}
	if(params.zoom) {
		params.zoom = parseInt(params.zoom);
	}
	if (typeof(elementId) === 'string') {
		elementId = jQuery(elementId)[0];
	}
	this._elementId = elementId;
	this._mapParams = jQuery.extend({}, defaults, params);
	this._mapObj = null;
	this._markers = [];
	this.init();
}
gmpGoogleMap.prototype.init = function() {
	this._mapObj = new google.maps.Map(this._elementId, this._mapParams);
};
gmpGoogleMap.prototype.getRawMapInstance = function() {
	return this._mapObj;
};
gmpGoogleMap.prototype.setCenter = function (lat, lng) {
	this.getRawMapInstance().setCenter(new google.maps.LatLng(lat, lng));
	return this;
};
gmpGoogleMap.prototype.getCenter = function () {
	return this.getRawMapInstance().getCenter();
};
gmpGoogleMap.prototype.setZoom = function (zoomLevel) {
	this.getRawMapInstance().setZoom(parseInt(zoomLevel));
};
gmpGoogleMap.prototype.getZoom = function () {
	return this.getRawMapInstance().getZoom();
};
gmpGoogleMap.prototype.addMarker = function(params) {
	var newMarker = new gmpGoogleMarker(this, params);
	this._markers.push( newMarker );
	return newMarker;
};
gmpGoogleMap.prototype.getMarkerById = function(id) {
	if(this._markers && this._markers.length) {
		for(var i in this._markers) {
			if(this._markers[ i ].getId() == id)
				return this._markers[ i ];
		}
	}
	return false;
};
gmpGoogleMap.prototype.removeMarker = function(id) {
	var marker = this.getMarkerById( id );
	if(marker) {
		marker.removeFromMap();
	}
};
gmpGoogleMap.prototype.getAllMarkers = function() {
	return this._markers;
};
// Markers
function gmpGoogleMarker(map, params) {
	this._map = map;
	this._markerObj = null;
	var defaults = {
		// Empty for now
	};
	if(!params.position && params.coord_x && params.coord_y) {
		params.position = new google.maps.LatLng(params.coord_x, params.coord_y);
	}
	this._markerParams = jQuery.extend({}, defaults, params);
	this._markerParams.map = this._map.getRawMapInstance();
	//this._id = params.id ? params.id : 0;
	this._infoWindow = null;
	this._infoWndOpened = false;
	this.init();
}
gmpGoogleMarker.prototype.infoWndOpened = function() {
	return this._infoWndOpened;
};
gmpGoogleMarker.prototype.init = function() {
	this._markerObj = new google.maps.Marker( this._markerParams );
	if(this._markerParams.dragend) {
		this._markerObj.addListener('dragend', jQuery.proxy(this._markerParams.dragend, this));
	}
	if(this._markerParams.click) {
		this._markerObj.addListener('click', jQuery.proxy(this._markerParams.click, this));
	}
	this._markerObj.addListener('click', jQuery.proxy(function () {
		this.showInfoWnd();
	}, this));
};
gmpGoogleMarker.prototype.showInfoWnd = function() {
	if(this._infoWindow && !this._infoWndOpened) {
		var allMapMArkers = this._map.getAllMarkers();
		if(allMapMArkers && allMapMArkers.length > 1) {
			for(var i = 0; i < allMapMArkers.length; i++) {
				allMapMArkers[i].hideInfoWnd();
			}
		}
		this._infoWindow.open(this._map.getRawMapInstance(), this._markerObj);
		this._infoWndOpened = true;
	}
};
gmpGoogleMarker.prototype.hideInfoWnd = function() {
	if(this._infoWindow && this._infoWndOpened) {
		this._infoWindow.close();
		this._infoWndOpened = false;
	}
};
gmpGoogleMarker.prototype.getRawMarkerInstance = function() {
	return this._markerObj;
};
gmpGoogleMarker.prototype.getRawMarkerParams = function() {
	return this._markerParams;
};
gmpGoogleMarker.prototype.setIcon = function(iconPath) {
	this._markerObj.setIcon( iconPath );
};
gmpGoogleMarker.prototype.setTitle = function(title, noRefresh) {
	this._markerObj.setTitle( title );
	this._markerParams.title = title;
	if(!noRefresh)
		this._updateInfoWndContent();
};
gmpGoogleMarker.prototype.getPosition = function() {
	return this._markerObj.getPosition();
};
gmpGoogleMarker.prototype.setPosition = function(lat, lng) {
	this._markerObj.setPosition( new google.maps.LatLng(lat, lng) );
};
gmpGoogleMarker.prototype.lat = function() {
	return this.getPosition().lat();
};
gmpGoogleMarker.prototype.lng = function(lng) {
	return this.getPosition().lng();
};
gmpGoogleMarker.prototype.setId = function(id) {
	this._markerParams.id = id;
};
gmpGoogleMarker.prototype.getId = function() {
	return this._markerParams.id;
};
gmpGoogleMarker.prototype.setDescription = function (description, noRefresh) {
	this._markerParams.description = description;
	if(!noRefresh)
		this._updateInfoWndContent();
};
gmpGoogleMarker.prototype._updateInfoWndContent = function() {
	var contentStr = jQuery('<div/>', {});
	var title = this._markerParams.title ? this._markerParams.title : false;
	var description = this._markerParams.description ? this._markerParams.description.replace(/([^>])\n/g, '$1<br/>') : false;
	if(title) {
		contentStr.append(jQuery('<div/>', {})
			.addClass('gmpInfoWindowtitle')
			.html( title ));
	}
	if(description) {
		contentStr.append(jQuery('<div/>', {})
			.addClass('egm-marker-iw')
			.html(description));
	}
	this._setInfoWndContent( contentStr );
};
gmpGoogleMarker.prototype._setInfoWndContent = function(newContentHtmlObj) {
	if (!this._infoWindow) {
		this._infoWindow = new google.maps.InfoWindow();
	}
	this._infoWindow.setContent(newContentHtmlObj[0]);
};
gmpGoogleMarker.prototype.removeFromMap = function() {
	this.getRawMarkerInstance().setMap( null );
};
// Common functions
var g_gmpGeocoder = null;
jQuery.fn.mapSearchAutocompleateGmp = function(params) {
	params = params || {};
    jQuery(this).keyup(function(event){
		// Ignore tab, enter, caps, end, home, arrows
		if(toeInArrayGmp(event.keyCode, [9, 13, 20, 35, 36, 37, 38, 39, 40])) return;
		var address = jQuery.trim(jQuery(this).val());
		if(address && address != '') {
			if(typeof(params.msgEl) === 'string')
				params.msgEl = jQuery(params.msgEl);
			params.msgEl.showLoaderGmp();
			var self = this;
			jQuery(this).autocomplete({
				source: function(request, response) {
					var geocoder = gmpGetGeocoder();
					geocoder.geocode( { 'address': address}, function(results, status) {
						params.msgEl.html('');
						if (status == google.maps.GeocoderStatus.OK && results.length) {
							var autocomleateData = [];
							for(var i in results) {
								autocomleateData.push({
									lat: results[i].geometry.location.lat()
								,	lng: results[i].geometry.location.lng()
								,	label: results[i].formatted_address
								});
							}
							response(autocomleateData);
						} else {
							var notFoundMsg = toeLangGmp('Google can\'t find requested address coordinates, please try to modify search criterias.');
							if(jQuery(self).parent().find('.ui-helper-hidden-accessible').size()) {
								jQuery(self).parent().find('.ui-helper-hidden-accessible').html( notFoundMsg );
							} else {
								params.msgEl.html( notFoundMsg );
							}
						}
					});
				}
			,	select: function(event, ui) {
					if(params.onSelect) {
						params.onSelect(ui.item, event, ui);
					}
				}
			});
			// Force imidiate search right after creation
			jQuery(this).autocomplete('search');
		}
	});
};
function gmpGetGeocoder() {
	if(!g_gmpGeocoder) {
		g_gmpGeocoder = new google.maps.Geocoder();
	}
	return g_gmpGeocoder;
}
function _gmpPrepareMarkersList(markers, params) {
	params = params || {};
	if(markers) {
		for(var i in markers) {
			markers[i].coord_x = parseFloat( markers[i].coord_x );
			markers[i].coord_y = parseFloat( markers[i].coord_y );
			markers[i].icon = markers[i].icon_data.path;
			if(params.dragend) {
				markers[i].draggable = true;
				markers[i].dragend = params.dragend;
			}
		}
	}
	return markers;
}
