<?php
class shortcodesGmp extends moduleGmp {
	public function init() {
		$gmapModule = frameGmp::_()->getModule('gmap');
		add_shortcode('google_map_easy', array($gmapModule, 'drawMapFromShortcode'));
	}
}