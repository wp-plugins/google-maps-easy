<?php
class supsystic_promoControllerGmp extends controllerGmp {
    public function welcomePageSaveInfo() {
		$res = new responseGmp();
		installerGmp::setUsed();
		if($this->getModel()->welcomePageSaveInfo(reqGmp::get('get'))) {
			$res->addMessage(__('Information was saved. Thank you!', GMP_LANG_CODE));
		} else {
			$res->pushError($this->getModel()->getErrors());
		}
		$originalPage = reqGmp::getVar('original_page');
		$http = isset($_SERVER['HTTPS']) && !empty($_SERVER['HTTPS']) ? 'https://' : 'http://';
		if(strpos($originalPage, $http. $_SERVER['HTTP_HOST']) !== 0) {
			$originalPage = '';
		}
		redirectGmp($originalPage);
	}
	public function sendContact() {
		$res = new responseGmp();
		$time = time();
		$prevSendTime = (int) get_option(GMP_CODE. '_last__time_contact_send');
		if($prevSendTime && ($time - $prevSendTime) < 5 * 60) {	// Only one message per five minutes
			$res->pushError(__('Please don\'t send contact requests so often - wait for response for your previous requests.'));
			$res->ajaxExec();
		}
        $data = reqGmp::get('post');
        $fields = $this->getModule()->getContactFormFields();
		foreach($fields as $fName => $fData) {
			$validate = isset($fData['validate']) ? $fData['validate'] : false;
			$data[ $fName ] = isset($data[ $fName ]) ? trim($data[ $fName ]) : '';
			if($validate) {
				$error = '';
				foreach($validate as $v) {
					if(!empty($error))
						break;
					switch($v) {
						case 'notEmpty':
							if(empty($data[ $fName ])) {
								$error = $fData['html'] == 'selectbox' ? __('Please select %s', GMP_LANG_CODE) : __('Please enter %s', GMP_LANG_CODE);
								$error = sprintf($error, $fData['label']);
							}
							break;
						case 'email':
							if(!is_email($data[ $fName ])) 
								$error = __('Please enter valid email address', GMP_LANG_CODE);
							break;
					}
					if(!empty($error)) {
						$res->pushError($error, $fName);
					}
				}
			}
		}
		if(!$res->error()) {
			$msg = 'Message from: '. get_bloginfo('name').', Host: '. $_SERVER['HTTP_HOST']. '<br />';
			$msg .= 'Plugin: '. GMP_WP_PLUGIN_NAME. '<br />';
			foreach($fields as $fName => $fData) {
				if(in_array($fName, array('name', 'email', 'subject'))) continue;
				if($fName == 'category')
					$data[ $fName ] = $fData['options'][ $data[ $fName ] ];
                $msg .= '<b>'. $fData['label']. '</b>: '. nl2br($data[ $fName ]). '<br />';
            }
			if(frameGmp::_()->getModule('mail')->send('support@supsystic.team.zendesk.com', $data['subject'], $msg, $data['name'], $data['email'])) {
				update_option(GMP_CODE. '_last__time_contact_send', $time);
			} else {
				$res->pushError( frameGmp::_()->getModule('mail')->getMailErrors() );
			}
			
		}
        $res->ajaxExec();
	}
	public function checkNoticeButton() {
		$res = new responseGmp();
		$code = reqGmp::getVar('buttonCode');
		$showNotice = get_option('showGMapsRevNotice');

		if($code == 'is_shown') {
			$showNotice['is_shown'] = true;
		} else {
			$showNotice['date'] = new DateTime();
		}

		$this->sendUsageStat($code);
		update_option('showGMapsRevNotice', $showNotice);

		return $res->ajaxExec();
	}
	public function sendUsageStat($state) {
		$apiUrl = 'http://54.68.191.217';

		$reqUrl = $apiUrl . '?mod=options&action=saveUsageStat&pl=rcs';
		$res = wp_remote_post($reqUrl, array(
			'body' => array(
				'site_url' => get_bloginfo('wpurl'),
				'site_name' => get_bloginfo('name'),
				'plugin_code' => 'gmp',
				'all_stat' => array('views' => 'review', 'code' => $state),
			)
		));

		return true;
	}
	/**
	 * @see controller::getPermissions();
	 */
	public function getPermissions() {
		return array(
			GMP_USERLEVELS => array(
				GMP_ADMIN => array('welcomePageSaveInfo', 'sendContact'),
			),
		);
	}
}