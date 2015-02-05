<?php foreach($this->proFields as $name => $f) { ?>
	<?php
		$htmlType = $f['type'];
		$id = 'gmpProControlId_'. mt_rand(1, 999999);
		$showName = $id. '_'. $name;
		$htmlAttrs = array(
			'attrs' => 'id="'. $id. '"',
		);
		if(isset($f['desc']) && !empty($f['desc'])) {
			$htmlAttrs['attrs'] .= ' class="gmpHintElem"';
			$htmlAttrs['hint'] = $f['desc'];
		}
		if(isset($f['htmlParams'])) {
			$htmlAttrs = array_merge($htmlAttrs, $f['htmlParams']);
		}
		$promoLink = isset($f['url']) && $f['url'] ? $f['url'] : $this->proLinkPrepared;
	?>
	<?php if(isset($f['startCon'])) { ?>
		<div class="gmpFormRowsCon">
			<h3>
				<?php echo $f['startCon']['label']?>
				<a target="_blank" href="<?php echo $promoLink?>" style="font-size: 10px;"><i><?php langGmp::_e('for PRO only')?></i></a>
			</h3>
			<?php if(isset($f['startCon']['desc'])) { ?>
			<p><small><i><?php echo $f['startCon']['desc']?></i></small></p>
			<?php }?>
	<?php }?>
	<div class="gmpFormRow" data-src="<?php echo $this->promoModPath. 'img/prev_opts/'. $name. '.jpg'?>">
		<div class="gmpFormElemCon">
			<?php echo htmlGmp::$htmlType($showName, $htmlAttrs);?>
		</div>
		<label class="gmpFormLabel" for="<?php echo $id?>">
			<?php echo $f['label']?>
			<a target="_blank" href="<?php echo $promoLink?>" style="font-size: 10px;"><i><?php langGmp::_e('for PRO only')?></i></a>
		</label>
	</div>
	<?php if(isset($f['endCon'])) { ?>
		</div>
	<?php }?>
<?php }?>
<style type="text/css">
	#imgPreviewWithStyles {
		background: #222;
		-moz-border-radius: 10px;
		-webkit-border-radius: 10px;
		padding: 10px;
		z-index: 999;
		border: none;
	}
</style>