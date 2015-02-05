<!--
<div id="gmpAdminOptionsTabs">
    <h1>
        <?php echo GMP_WP_PLUGIN_NAME?>
    </h1>
	<div class="gmpSingleBtnContainer">
		<a class="btn btn-primary gmpShowNewMapFormBtn">
			<span class="gmpIcon gmpIcongmpAddNewMap"></span>
			<?php langGmp::_e('Add New Map');?>
		</a>
	</div>
	<ul class="nav nav-tabs gmpMainTab" >
		<?php foreach($this->tabsData as $tId => $tData) { ?>
		<li class="<?php echo $tId?> ">
			<a href="#<?php echo $tId ?>">
				<span class="gmpIcon gmpIcon<?php echo $tId ?>"></span>
				<?php langGmp::_e($tData['title'])?>
			</a>
		</li>
		<?php }?>
	</ul>
	<?php foreach($this->tabsData as $tId => $tData) { ?>
	<div id="<?php echo $tId?>" class="tab-pane" >
		<?php echo $tData['content']; ?>
	</div>
	<?php }?>
</div>
--><?php
