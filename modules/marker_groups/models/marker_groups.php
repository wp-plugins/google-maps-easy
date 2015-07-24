<?php
class marker_groupsModelGmp extends modelGmp {
	function __construct() {
		$this->_setTbl('marker_groups');
	}
	public function getAllMarkerGroups($d = array()){
		if(isset($d['limitFrom']) && isset($d['limitTo']))
			frameGmp::_()->getTable('marker_groups')->limitFrom($d['limitFrom'])->limitTo($d['limitTo']);
		if(isset($d['orderBy']) && !empty($d['orderBy'])) {
			frameGmp::_()->getTable('marker_groups')->orderBy( $d['orderBy'] );
		}
		return $markerGroups = frameGmp::_()->getTable('marker_groups')->get('*', $d);
	}
	public function getMarkerGroupById($id = false){
		if(!$id){
			return false;
		}
		$markerGroup = frameGmp::_()->getTable('marker_groups')->get('*', array('id' => (int)$id), '', 'row');

		if(!empty($markerGroup)){
			return $markerGroup;
		}
		return false;
	}
	public function remove($markerGroupId){
		$markerGroupId = (int) $markerGroupId;
		if(!empty($markerGroupId)) {
			return frameGmp::_()->getTable("marker_groups")->delete($markerGroupId);
		} else
			$this->pushError (__('Invalid ID', GMP_LANG_CODE));
		return false;
	}
	public function prepareParams($params){
		$insert = array(
			'title' => trim($params['title']),
		);
		return $insert;
	}
	private function _validateSaveMarkerGroup($markerGroup) {
		if(empty($markerGroup['title'])) {
			$this->pushError(__('Please enter Marker Category'), 'marker_group[title]', GMP_LANG_CODE);
		}
		return !$this->haveErrors();
	}
	public function updateMarkerGroup($params){
		$data = $this->prepareParams($params);
		if($this->_validateSaveMarkerGroup($data)) {
			$res = frameGmp::_()->getTable('marker_groups')->update($data, array('id' => (int)$params['id']));
			return $res;
		}
		return false;
	}
	public function saveNewMarkerGroup($params){
		if(!empty($params)) {
			$insertData = $this->prepareParams($params);
			if($this->_validateSaveMarkerGroup($insertData)) {
				$newMarkerGroupId = frameGmp::_()->getTable('marker_groups')->insert($insertData);
				if($newMarkerGroupId){
					return $newMarkerGroupId;
				} else {
					$this->pushError(frameGmp::_()->getTable('marker_groups')->getErrors());
				}
			}
		} else
			$this->pushError(__('Empty Params', GMP_LANG_CODE));
		return false;
	}
}