<div class="gmpFormRowsCon">
	<h3>
		<?php langGmp::_e('KML Layers')?>
		<a target="_blank" href="<?php echo $this->proLinkPrepared?>"><i style="font-size: 10px;"><?php langGmp::_e('for PRO only')?></i></a>
	</h3>
	<p>
		<small>
			<i>
			<?php langGmp::_e('Keyhole Markup Language additional layers for your map')?>
			<?php langGmp::_e('available in PRO')?>
			</i>
		</small>
	</p>
	<div class="gmpFormRow" data-src="<?php echo $this->promoModPath. 'img/prev_opts/kml.jpg'?>">
		<div class="gmpFormElemCon">
			<input type="text" disabled="disabled" style="width: 220px;" class="gmpHintElem" value="" name="map_opts[kml_file_url][]">
			<label class="hiddenLabelHint"><?php langGmp::_e('KML file URL')?></label><br>
			<a target="_blank" href="<?php echo $this->proLinkPrepared?>" class="btn btn-primary">
				<?php langGmp::_e('or upload KML file')?>
				<i style="font-size: 10px;"><?php langGmp::_e('for PRO only')?></i>
			</a>
			<br>
		</div>
		<a target="_blank" href="<?php echo $this->proLinkPrepared?>" style="float: left; margin-right: 5px; padding-top: 0; height: 21px;" class="btn btn-danger">X</a>
		<label class="gmpFormLabel" for="map_optsenable_full_screen_btn_check">
			<?php langGmp::_e('Enter KML file URL')?>
		</label>
		<br>
		<span class="gmpKmlUploadMsg"></span>
	</div>
	<a class="btn btn-success" target="_blank" href="<?php echo $this->proLinkPrepared?>">
		<?php langGmp::_e('+ Add one more file')?>
		<i style="font-size: 10px;"><?php langGmp::_e('for PRO only')?></i>
	</a>
</div>
<?php echo $this->proFieldsHtml?>