var g_gmlAllMaps = [];
jQuery(document).ready(function(){
	if(typeof(gmpAllMapsInfo) !== 'undefined' && gmpAllMapsInfo && gmpAllMapsInfo.length) {
		for(var i = 0; i < gmpAllMapsInfo.length; i++) {
			var newMap = new gmpGoogleMap('#'+ gmpAllMapsInfo[i].view_html_id, gmpAllMapsInfo[i].params);
			if(gmpAllMapsInfo[i].markers && gmpAllMapsInfo[i].markers.length) {
				gmpAllMapsInfo[i].markers = _gmpPrepareMarkersList( gmpAllMapsInfo[i].markers );
				for(var j = 0; j < gmpAllMapsInfo[i].markers.length; j++) {
					var newMarker = newMap.addMarker( gmpAllMapsInfo[i].markers[j] );
					newMarker.setTitle( gmpAllMapsInfo[i].markers[j].title, true );
					newMarker.setDescription( gmpAllMapsInfo[i].markers[j].description );
				}
				newMap.markersRefresh();
			}
			g_gmlAllMaps.push( newMap );
		}
	}
});
function gmpGetAllMaps() {
	return g_gmlAllMaps;
}
function gmpGetMapById(id) {
	var allMaps = g_gmlAllMaps;
	for(var i = 0; i < allMaps.length; i++) {
		if(allMaps[i].getId() == id) {
			return allMaps[i];
		}
	}
	return false;
}