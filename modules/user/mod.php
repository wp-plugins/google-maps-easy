<?php
class userGmp extends moduleGmp {
    public function loadUserData() {
        return $this->getCurrent();
    }
    public function addProfileFieldsHtml($user) {
        //if($this->isCustomer($user->ID)) {
            $this->getController()->getView('user')->displayAllMeta($user->ID);
        //}
    }

    public function isAdmin() {
		if(!function_exists('wp_get_current_user')) {
			frameGmp::_()->loadPlugins();
		}
        return current_user_can('manage_options');
    }

	public function getCurrentUserPosition() {
		if($this->isAdmin())
			return GMP_ADMIN;
		else if($this->getCurrentID())
			return GMP_LOGGED;
		else 
			return GMP_GUEST;
	}
    public function getCurrent() {
        return $this->getController()->getModel('user')->get();
    }

    public function getCurrentID() {
        return $this->getController()->getModel()->getCurrentID();
    }
}

