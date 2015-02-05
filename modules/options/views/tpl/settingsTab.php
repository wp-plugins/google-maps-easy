<div class="clearfix"></div>

<?php if (!empty($this->additionalGlobalSettings)): ?>
	<?php foreach ($this->additionalGlobalSettings as $setData): ?>
<!--		<div class="gmpPluginSettingsFormContainer">-->
			<?php echo $setData ?>
<!--		</div>-->
	<?php endforeach; ?>
<?php endif; ?>