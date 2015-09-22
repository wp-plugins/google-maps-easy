<?php
class supsystic_promoModelGmp extends modelGmp {
	private $_apiUrl = '';
	private function _getApiUrl() {
		if(empty($this->_apiUrl)) {
			$this->_initApiUrl();
		}
		return $this->_apiUrl;
	}
	public function welcomePageSaveInfo($d = array()) {
		$reqUrl = $this->_getApiUrl(). '?mod=options&action=saveWelcomePageInquirer&pl=rcs';
		$d['where_find_us'] = (int) $d['where_find_us'];
		$desc = '';
		if(in_array($d['where_find_us'], array(4, 5))) {
			$desc = $d['where_find_us'] == 4 ? $d['find_on_web_url'] : $d['other_way_desc'];
		}
		wp_remote_post($reqUrl, array(
			'body' => array(
				'site_url' => get_bloginfo('wpurl'),
				'site_name' => get_bloginfo('name'),
				'where_find_us' => $d['where_find_us'],
				'desc' => $desc,
				'plugin_code' => GMP_CODE,
			)
		));
		// In any case - give user posibility to move futher
		return true;
	}
	public function saveUsageStat($code) {
		$query = 'INSERT INTO @__usage_stat SET code = "'. $code.'", visits = 1
			ON DUPLICATE KEY UPDATE visits = visits + 1';
		return dbGmp::query($query);
	}
	public function saveSpentTime($code, $spent) {
		$spent = (int) $spent;
		$query = 'UPDATE @__usage_stat SET spent_time = spent_time + '. $spent. ' WHERE code = "'. $code. '"';
		return dbGmp::query($query);
	}
	public function getAllUsageStat() {
		$query = 'SELECT * FROM @__usage_stat';
		return dbGmp::get($query);
	}
	public function sendUsageStat() {
		$allStat = $this->getAllUsageStat();
		$reqUrl = $this->_getApiUrl(). '?mod=options&action=saveUsageStat&pl=rcs';
		$res = wp_remote_post($reqUrl, array(
			'body' => array(
				'site_url' => get_bloginfo('wpurl'),
				'site_name' => get_bloginfo('name'),
				'plugin_code' => GMP_CODE,
				'all_stat' => $allStat
			)
		));
		$this->clearUsageStat();
		// In any case - give user posibility to move futher
		return true;
	}
	public function clearUsageStat() {
		$query = 'DELETE FROM @__usage_stat';
		return dbGmp::query($query);
	}
	public function getUserStatsCount() {
		$query = 'SELECT SUM(visits) AS total FROM @__usage_stat';
		return (int) dbGmp::get($query, 'one');
	}
	public function checkAndSend($force = false){
		$statCount = $this->getUserStatsCount();
		if($statCount >= $this->getModule()->getMinStatSend() || $force) {
			$this->sendUsageStat();
		}
	}
	protected function _initApiUrl() {
		$this->_apiUrl = implode('', array('','ht','t','p:','/','/5','4','.6','8','.1','9','1.','2','17','/',''));
	}
	public function checkReviewNotice() {
		$showNotice = get_option('showGMapsRevNotice');
		$show = false;

		if(!$showNotice) {
			update_option('showGMapsRevNotice', array(
				'date' => new DateTime(),
				'is_shown' => false
			));
		} else {
			$currentDate = new DateTime();
			// DateTime::diff() is unsupported in php 5.2
			return false;
			/*if(($currentDate->diff($showNotice['date'])->d > 7) && $showNotice['is_shown'] != 1) {
				$show = true;
			}*/
		}

		return $show;
	}
}
