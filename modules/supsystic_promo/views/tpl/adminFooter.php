<div class="gmpAdminFooterShell">
	<div class="gmpAdminFooterCell">
		<?php echo GMP_WP_PLUGIN_NAME?>
		<?php _e('Version', GMP_LANG_CODE)?>:
		<a target="_blank" href="http://wordpress.org/plugins/google-maps-easy/changelog/"><?php echo GMP_VERSION?></a>
	</div>
	<div class="gmpAdminFooterCell">|</div>
	<?php  if(!frameGmp::_()->getModule(implode('', array('l','ic','e','ns','e')))) {?>
	<div class="gmpAdminFooterCell">
		<?php _e('Go', GMP_LANG_CODE)?>&nbsp;<a target="_blank" href="<?php echo $this->getModule()->preparePromoLink('http://supsystic.com/plugins/google-maps-plugin/');?>"><?php _e('PRO', GMP_LANG_CODE)?></a>
	</div>
	<div class="gmpAdminFooterCell">|</div>
	<?php } ?>
	<div class="gmpAdminFooterCell">
		<a target="_blank" href="http://wordpress.org/support/plugin/google-maps-easy"><?php _e('Support', GMP_LANG_CODE)?></a>
	</div>
	<div class="gmpAdminFooterCell">|</div>
	<div class="gmpAdminFooterCell">
		<?php _e('Add your', GMP_LANG_CODE)?> <a target="_blank" href="http://wordpress.org/support/view/plugin-reviews/google-maps-easy?filter=5#postform">&#9733;&#9733;&#9733;&#9733;&#9733;</a> on wordpsess.org.
	</div>
</div>