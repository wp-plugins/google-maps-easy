<?php
/**
 * Plugin Name: Google Maps Easy
 * Plugin URI: http://supsystic.com/plugins/google-maps-plugin/
 * Description: The easiest way to create Google Map with markers or locations. Display any data on the map: text, images, videos. Custom map marker icons
 * Version: 1.0.3
 * Author: supsystic.com
 * Author URI: http://supsystic.com
 **/
    require_once(dirname(__FILE__). DIRECTORY_SEPARATOR. 'config.php');
    require_once(dirname(__FILE__). DIRECTORY_SEPARATOR. 'functions.php');
    importClassGmp('dbGmp');
    importClassGmp('installerGmp');
    importClassGmp('baseObjectGmp');
    importClassGmp('moduleGmp');
    importClassGmp('modelGmp');
    importClassGmp('viewGmp');
    importClassGmp('controllerGmp');
    importClassGmp('helperGmp');
    importClassGmp('tabGmp');
    importClassGmp('dispatcherGmp');
    importClassGmp('fieldGmp');
    importClassGmp('tableGmp');
    importClassGmp('frameGmp');
    importClassGmp('langGmp');
    importClassGmp('reqGmp');
    importClassGmp('uriGmp');
    importClassGmp('htmlGmp');
    importClassGmp('responseGmp');
    importClassGmp('fieldAdapterGmp');
    importClassGmp('validatorGmp');
    importClassGmp('errorsGmp');
    importClassGmp('utilsGmp');
    importClassGmp('modInstallerGmp');
    importClassGmp('wpUpdaterGmp');
	importClassGmp('installerDbUpdaterGmp');

    installerGmp::update();
    errorsGmp::init();
 
    dispatcherGmp::doAction('onBeforeRoute');
    frameGmp::_()->parseRoute();
    dispatcherGmp::doAction('onAfterRoute');

    dispatcherGmp::doAction('onBeforeInit');
    frameGmp::_()->init();
    dispatcherGmp::doAction('onAfterInit');

    dispatcherGmp::doAction('onBeforeExec');
    frameGmp::_()->exec();
    dispatcherGmp::doAction('onAfterExec');