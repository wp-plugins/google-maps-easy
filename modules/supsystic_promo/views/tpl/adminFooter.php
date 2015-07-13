<div class="gmpAdminFooterShell">
	<div class="gmpAdminFooterCell">
		<?php echo GMP_WP_PLUGIN_NAME?>
		<?php _e('Version', GMP_LANG_CODE)?>:
		<a target="_blank" href="http://wordpress.org/plugins/google-maps-easy/changelog/"><?php echo GMP_VERSION_PLUGIN?></a>
	</div>
	<div class="gmpAdminFooterCell">|</div>
	<?php  if(!frameGmp::_()->getModule(implode('', array('l','ic','e','ns','e')))) {?>
	<div class="gmpAdminFooterCell">
		<?php _e('Go', GMP_LANG_CODE)?>&nbsp;<a target="_blank" href="<?php echo frameGmp::_()->getModule('supsystic_promo')->getMainLink();?>"><?php _e('PRO', GMP_LANG_CODE)?></a>
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
<div id="reviewNotice" title="Review" style="display: none;" hidden>
	<h3>Hey, I noticed you just use Google Maps Easy by Supsystic over a week – that’s awesome!</h3>
	<p>Could you please do me a BIG favor and give it a 5-star rating on WordPress? Just to help us spread the word and boost our motivation.</p>

	<ul style="list-style: circle; padding-left: 30px;">
		<li>
			<button class="button button-primary"><a href="//wordpress.org/support/view/plugin-reviews/google-maps-easy?rate=5#postform" target="_blank" class="bupSendStatistic" data-statistic-code="is_shown" style="color:#000000 !important;">Ok, you deserve it</a></button>
		</li>
		<li>
			<button class="button button-primary"><span class="toeLikeLink bupSendStatistic" data-statistic-code="date">Nope, maybe later</span></button>
		</li>
		<li>
			<button class="button button-primary"><span class="toeLikeLink bupSendStatistic" data-statistic-code="is_shown">I already did</span></button>
		</li>
	</ul>
</div>