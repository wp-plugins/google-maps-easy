<?php
class templatesGmp extends moduleGmp {
    protected $_styles = array();
    public function init() {
        if (is_admin()) {
			if($isAdminPlugOptsPage = frameGmp::_()->isAdminPlugOptsPage()) {
				$this->loadCoreJs();
				$this->loadAdminCoreJs();
				$this->loadCoreCss();
				$this->loadJqueryUi();
				//$this->loadChosenSelects();
				frameGmp::_()->addScript('adminOptionsGmp', GMP_JS_PATH. 'admin.options.js', array(), false, true);
				add_action('admin_enqueue_scripts', array($this, 'loadMediaScripts'));
			}
			// Some common styles - that need to be on all admin pages - be careful with them
			frameGmp::_()->addStyle('supsystic-for-all-admin-'. GMP_CODE, GMP_CSS_PATH. 'supsystic-for-all-admin.css');
		}
        parent::init();
    }
	public function loadMediaScripts() {
		wp_enqueue_media();
	}
	public function loadAdminCoreJs() {
		frameGmp::_()->addScript('jquery-ui-dialog', '', array('jquery'));
		frameGmp::_()->addScript('jquery-ui-slider', '', array('jquery'));
		frameGmp::_()->addScript('wp-color-picker');
		frameGmp::_()->addScript('tooltipster', GMP_JS_PATH. 'jquery.tooltipster.min.js');
		frameGmp::_()->addScript('icheck', GMP_JS_PATH. 'icheck.min.js');
		frameGmp::_()->addScript('jquery-ui-autocomplete', '', array('jquery'));
	}
	public function loadCoreJs() {
		static $loaded = false;
		if(!$loaded) {
			frameGmp::_()->addScript('jquery');

			frameGmp::_()->addScript('commonGmp', GMP_JS_PATH. 'common.js', array('jquery'));
			frameGmp::_()->addScript('coreGmp', GMP_JS_PATH. 'core.js', array('jquery'));

			$ajaxurl = admin_url('admin-ajax.php');
			if(frameGmp::_()->getModule('options')->get('ssl_on_ajax')) {
				$ajaxurl = uriGmp::makeHttps($ajaxurl);
			}
			$jsData = array(
				'siteUrl'					=> GMP_SITE_URL,
				'imgPath'					=> GMP_IMG_PATH,
				'cssPath'					=> GMP_CSS_PATH,
				'loader'					=> GMP_LOADER_IMG, 
				'close'						=> GMP_IMG_PATH. 'cross.gif', 
				'ajaxurl'					=> $ajaxurl,
				'GMP_CODE'					=> GMP_CODE,
			);
			if(is_admin()) {
				$jsData['isPro'] = frameGmp::_()->getModule('supsystic_promo')->isPro();
			}
			$jsData = dispatcherGmp::applyFilters('jsInitVariables', $jsData);
			frameGmp::_()->addJSVar('coreGmp', 'GMP_DATA', $jsData);
			$loaded = true;
		}
	}
	public function loadCoreCss() {
		$this->_styles = array(
			'styleGmp'			=> array('path' => GMP_CSS_PATH. 'style.css', 'for' => 'admin'), 
			'supsystic-uiGmp'	=> array('path' => GMP_CSS_PATH. 'supsystic-ui.css', 'for' => 'admin'), 
			'dashicons'			=> array('for' => 'admin'),
			'bootstrap-alerts'	=> array('path' => GMP_CSS_PATH. 'bootstrap-alerts.css', 'for' => 'admin'),
			'bootstrap-cols'	=> array('path' => GMP_CSS_PATH. 'bootstrap-cols.css', 'for' => 'admin'),
			'tooltipster'		=> array('path' => GMP_CSS_PATH. 'tooltipster.css', 'for' => 'admin'),
			'icheck'			=> array('path' => GMP_CSS_PATH. 'jquery.icheck.css', 'for' => 'admin'),
			//'uniform'			=> array('path' => GMP_CSS_PATH. 'uniform.default.css', 'for' => 'admin'),
			//'selecter'			=> array('path' => GMP_CSS_PATH. 'jquery.fs.selecter.min.css', 'for' => 'admin'),
			'wp-color-picker'	=> array('for' => 'admin'),
		);
		foreach($this->_styles as $s => $sInfo) {
			if(!empty($sInfo['path'])) {
				frameGmp::_()->addStyle($s, $sInfo['path']);
			} else {
				frameGmp::_()->addStyle($s);
			}
		}
		$this->loadFontAwesome();
	}
	public function loadJqueryUi() {
		static $loaded = false;
		if(!$loaded) {
			frameGmp::_()->addStyle('jquery-ui', GMP_CSS_PATH. 'jquery-ui.min.css');
			frameGmp::_()->addStyle('jquery-ui.structure', GMP_CSS_PATH. 'jquery-ui.structure.min.css');
			frameGmp::_()->addStyle('jquery-ui.theme', GMP_CSS_PATH. 'jquery-ui.theme.min.css');
			frameGmp::_()->addStyle('jquery-slider', GMP_CSS_PATH. 'jquery-slider.css');
			$loaded = true;
		}
	}
	public function loadJqGrid() {
		static $loaded = false;
		if(!$loaded) {
			$this->loadJqueryUi();
			frameGmp::_()->addScript('jq-grid', GMP_JS_PATH. 'jquery.jqGrid.min.js', array('jquery'));
			frameGmp::_()->addStyle('jq-grid', GMP_CSS_PATH. 'ui.jqgrid.css');
			$langToLoad = utilsGmp::getLangCode2Letter();
			if(!file_exists(GMP_JS_DIR. 'i18n'. DS. 'grid.locale-'. $langToLoad. '.js')) {
				$langToLoad = 'en';
			}
			frameGmp::_()->addScript('jq-grid-lang', GMP_JS_PATH. 'i18n/grid.locale-'. $langToLoad. '.js');
			$loaded = true;
		}
	}
	public function loadFontAwesome() {
		frameGmp::_()->addStyle('font-awesomeGmp', GMP_CSS_PATH. 'font-awesome.css');
	}
	public function loadChosenSelects() {
		frameGmp::_()->addStyle('jquery.chosen', GMP_CSS_PATH. 'chosen.min.css');
		frameGmp::_()->addScript('jquery.chosen', GMP_JS_PATH. 'chosen.jquery.min.js');
	}
	public function loadDatePicker() {
		frameGmp::_()->addScript('jquery-ui-datepicker');
	}
	public function loadJqplot() {
		static $loaded = false;
		if(!$loaded) {
			$jqplotDir = 'jqplot/';

			frameGmp::_()->addStyle('jquery.jqplot', GMP_CSS_PATH. 'jquery.jqplot.min.css');

			frameGmp::_()->addScript('jplot', GMP_JS_PATH. $jqplotDir. 'jquery.jqplot.min.js');
			frameGmp::_()->addScript('jqplot.canvasAxisLabelRenderer', GMP_JS_PATH. $jqplotDir. 'jqplot.canvasAxisLabelRenderer.min.js');
			frameGmp::_()->addScript('jqplot.canvasTextRenderer', GMP_JS_PATH. $jqplotDir. 'jqplot.canvasTextRenderer.min.js');
			frameGmp::_()->addScript('jqplot.dateAxisRenderer', GMP_JS_PATH. $jqplotDir. 'jqplot.dateAxisRenderer.min.js');
			frameGmp::_()->addScript('jqplot.canvasAxisTickRenderer', GMP_JS_PATH. $jqplotDir. 'jqplot.canvasAxisTickRenderer.min.js');
			frameGmp::_()->addScript('jqplot.highlighter', GMP_JS_PATH. $jqplotDir. 'jqplot.highlighter.min.js');
			frameGmp::_()->addScript('jqplot.cursor', GMP_JS_PATH. $jqplotDir. 'jqplot.cursor.min.js');
			frameGmp::_()->addScript('jqplot.barRenderer', GMP_JS_PATH. $jqplotDir. 'jqplot.barRenderer.min.js');
			frameGmp::_()->addScript('jqplot.categoryAxisRenderer', GMP_JS_PATH. $jqplotDir. 'jqplot.categoryAxisRenderer.min.js');
			frameGmp::_()->addScript('jqplot.pointLabels', GMP_JS_PATH. $jqplotDir. 'jqplot.pointLabels.min.js');
			frameGmp::_()->addScript('jqplot.pieRenderer', GMP_JS_PATH. $jqplotDir. 'jqplot.pieRenderer.min.js');
			$loaded = true;
		}
	}
}
