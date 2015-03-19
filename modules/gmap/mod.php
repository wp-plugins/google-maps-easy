<?php
class  gmapGmp extends moduleGmp {
	public function init() {
		dispatcherGmp::addFilter('mainAdminTabs', array($this, 'addAdminTab'));
        add_action('wp_footer', array($this, 'addMapDataToJs'));
		add_shortcode(GMP_SHORTCODE, array($this, 'drawMapFromShortcode'));
	}
	public function addAdminTab($tabs) {
		$tabs[ $this->getCode(). '_add_new' ] = array(
			'label' => __('Add Map', GMP_LANG_CODE), 'callback' => array($this, 'getAddNewTabContent'), 'fa_icon' => 'fa-plus-circle', 'sort_order' => 10, 'add_bread' => $this->getCode(),
		);
		$tabs[ $this->getCode(). '_edit' ] = array(
			'label' => __('Edit', GMP_LANG_CODE), 'callback' => array($this, 'getEditTabContent'), 'sort_order' => 20, 'child_of' => $this->getCode(), 'hidden' => 1, 'add_bread' => $this->getCode(),
		);
		$tabs[ $this->getCode() ] = array(
			'label' => __('All Maps', GMP_LANG_CODE), 'callback' => array($this, 'getTabContent'), 'fa_icon' => 'fa-list', 'sort_order' => 20, //'is_main' => true,
		);
		return $tabs;
	}
	public function getAddNewTabContent() {
		return $this->getView()->getEditMap();
	}
	public function getEditTabContent() {
		$id = (int) reqGmp::getVar('id', 'get');
		if(!$id)
			return __('No Map Found', GMP_LANG_CODE);
		return $this->getView()->getEditMap( $id );
	}
	public function getTabContent() {
		return $this->getView()->getTabContent();
	}
    public function drawMapFromShortcode($params = null) {
		frameGmp::_()->addScript('commonGmp', GMP_JS_PATH. 'common.js', array('jquery'));
		frameGmp::_()->addScript('coreGmp', GMP_JS_PATH. 'core.js', array('jquery'));
        if(!isset($params['id'])) {
            return __('Empty or Invalid Map ID', GMP_LANG_CODE);
        }
        return $this->getController()->getView()->drawMap($params);
    }
    public function addMapDataToJs(){
        $this->getView()->addMapDataToJs();
    }
	public function generateShortcode($map) {
		$shortcodeParams = array();
		$shortcodeParams['id'] = $map['id'];
		// For PRO version
		$shortcodeParamsArr = array();
		foreach($shortcodeParams as $k => $v) {
			$shortcodeParamsArr[] = $k. "='". $v. "'";
		}
		return '['. GMP_SHORTCODE. ' '. implode(' ', $shortcodeParamsArr). ']';
	}
	public function getControlsPositions() {
		return array(
			'TOP_CENTER' => langGmp::_('Top Center'),
			'TOP_LEFT' => langGmp::_('Top Left'),
			'TOP_RIGHT' => langGmp::_('Top Right'),
			'LEFT_TOP' => langGmp::_('Left Top'),
			'RIGHT_TOP' => langGmp::_('Right Top'),
			'LEFT_CENTER' => langGmp::_('Left Center'),
			'RIGHT_CENTER' => langGmp::_('Right Center'),
			'LEFT_BOTTOM' => langGmp::_('Left Bottom'),
			'RIGHT_BOTTOM' => langGmp::_('Right Bottom'),
			'BOTTOM_CENTER' => langGmp::_('Bottom Center'),
			'BOTTOM_LEFT' => langGmp::_('Bottom Left'),
			'BOTTOM_RIGHT' => langGmp::_('Bottom Right'),
		);
	}
	public function getEditMapLink($id) {
		return frameGmp::_()->getModule('options')->getTabUrl('gmap_edit'). '&id='. $id;
	}
}