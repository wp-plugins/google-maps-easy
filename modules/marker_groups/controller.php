<?php
class marker_groupsControllerGmp extends controllerGmp {
     public function refreshGroupsList(){
        $markers = $this->getModel()->getMarkerGroups();
        $data = $this->getView()->showGroupsTab($markers,true);
        $res= new responseGmp();
        $res->setHtml($data);
        return $res->ajaxExec();
    }
    function saveGoup() {
        $data=  reqGmp::get('post');
        $res = new responseGmp();
        if(!isset($data['goupInfo'])){
            $res->pushError(__('Nothing To Save', GMP_LANG_CODE));
            return $res->ajaxExec();
        }
        if($id = $this->getModel()->saveGroup($data['goupInfo'])) {
            $res->addMessage(__('Done', GMP_LANG_CODE));
			$res->addData('group', $this->getModel()->getGroupById($id));
        } else {
            $res->pushError(__('Cannot Save Group', GMP_LANG_CODE));
        }
        return $res->ajaxExec();
    }
    public function removeGroup(){
        $params = reqGmp::get('post');
        $res = new responseGmp();
        if(!isset($params['group_id'])){
            $res->pushError(__('Group Not Found', GMP_LANG_CODE));
            return $res->ajaxExec();
        }    
        if($this->getModel()->removeGroup($params["group_id"])){
           $res->addMessage(__("Done", GMP_LANG_CODE)); 
        }else{
            $res->pushError(__("Cannot remove group", GMP_LANG_CODE));
        }
        frameGmp::_()->getModule("supsystic_promo")->getModel()->saveUsageStat("group.delete");
        return $res->ajaxExec();
    }
	/**
	 * @see controller::getPermissions();
	 */
	public function getPermissions() {
		return array(
			GMP_USERLEVELS => array(
				GMP_ADMIN => array('refreshGroupsList', 'saveGoup', 'removeGroup')
			),
		);
	}
}