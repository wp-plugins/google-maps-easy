<section>
	<div class="supsystic-item supsystic-panel">
		<div id="containerWrapper">
			<div class="supsistic-half-side-box">
				<div class="row">
					<form id="gmpMapForm">
						<table class="form-table">
							<tr>
								<th scope="row">
									<label class="label-big" for="map_opts_title">
										<?php _e('Map Name', GMP_LANG_CODE)?>:
									</label>
									<i style="float: right;" class="fa fa-question supsystic-tooltip" title="<?php _e('Your map name', GMP_LANG_CODE)?>"></i>
								</th>
								<td>
									<?php echo htmlGmp::text('map_opts[title]', array(
										'value' => $this->editMap ? $this->map['title'] : '',
										'attrs' => 'style="width: 100%;" id="map_opts_title"',
										'required' => true))?>
								</td>
							</tr>
							<tr>
								<th scope="row">
									<label for="map_opts_width">
										<?php _e('Map Width', GMP_LANG_CODE)?>:
									</label>
									<i style="float: right;" class="fa fa-question supsystic-tooltip" title="<?php _e('Your map width', GMP_LANG_CODE)?>"></i>
								</th>
								<td>
									<div class="sup-col sup-w-25">
										<?php echo htmlGmp::text('map_opts[width]', array(
											'value' => $this->editMap ? $this->map['html_options']['width'] : '100',
											'attrs' => 'style="width: 100%;" id="map_opts_width"'))?>
									</div>
									<div class="sup-col sup-w-75">
										<label style="margin-right: 15px; position: relative; top: 7px;"><?php echo htmlGmp::radiobutton('map_opts[width_units]', array(
											'value' => 'px',
											'checked' => $this->editMap ? htmlGmp::checkedOpt($this->map['params'], 'width_units', 'px') : false,
										))?>&nbsp;<?php _e('Pixels', GMP_LANG_CODE)?></label>
										<label style="margin-right: 15px; position: relative; top: 7px;"><?php echo htmlGmp::radiobutton('map_opts[width_units]', array(
											'value' => '%',
											'checked' => $this->editMap ? htmlGmp::checkedOpt($this->map['params'], 'width_units', '%') : true,
										))?>&nbsp;<?php _e('Percents', GMP_LANG_CODE)?></label>
									</div>
								</td>
							</tr>
							<tr>
								<th scope="row">
									<label for="map_opts_height">
										<?php _e('Map Height', GMP_LANG_CODE)?>:
									</label>
									<i style="float: right;" class="fa fa-question supsystic-tooltip" title="<?php _e('Your map width', GMP_LANG_CODE)?>"></i>
								</th>
								<td>
									<div class="sup-col sup-w-25">
										<?php echo htmlGmp::text('map_opts[height]', array(
											'value' => $this->editMap ? $this->map['html_options']['height'] : '250',
											'attrs' => 'style="width: 100%;" id="map_opts_height"'))?>
									</div>
									<div class="sup-col sup-w-75">
										<label style="margin-right: 15px; position: relative; top: 7px;"><?php echo htmlGmp::radiobutton('map_opts_height_units_is_constant', array(
											'value' => 'px',
											'checked' => true,
										))?>&nbsp;<?php _e('Pixels', GMP_LANG_CODE)?></label>
									</div>
								</td>
							</tr>
						</table>
						<?php echo htmlGmp::hidden('mod', array('value' => 'gmap'))?>
						<?php echo htmlGmp::hidden('action', array('value' => 'save'))?>
						<?php echo htmlGmp::hidden('map_opts[id]', array('value' => $this->editMap ? $this->map['id'] : ''))?>
						<?php echo htmlGmp::hidden('map_opts[map_center][coord_x]', array('value' => $this->editMap ? $this->map['params']['map_center']['coord_x'] : ''))?>
						<?php echo htmlGmp::hidden('map_opts[map_center][coord_y]', array('value' => $this->editMap ? $this->map['params']['map_center']['coord_y'] : ''))?>
						<?php echo htmlGmp::hidden('map_opts[zoom]', array('value' => $this->editMap ? $this->map['params']['zoom'] : ''))?>
					</form>
				</div>
				<div class="row">
					<a href="#" id="gmpAddNewMarkerBtn" class="button"><?php _e('Add New Marker', GMP_LANG_CODE)?></a>
					<a href="#" id="gmpSaveMarkerBtn" class="button"><?php _e('Save Marker', GMP_LANG_CODE)?></a>
					<div style="clear: both;"></div>
				</div>
				<div class="row">
					<form id="gmpMarkerForm" style="display: none;">
						<table class="form-table">
							<tr>
								<th scope="row">
									<label class="label-big" for="marker_opts_title">
										<?php _e('Marker Name', GMP_LANG_CODE)?>:
									</label>
									<i style="float: right;" class="fa fa-question supsystic-tooltip" title="<?php _e('Your marker title', GMP_LANG_CODE)?>"></i>
								</th>
								<td>
									<?php echo htmlGmp::text('marker_opts[title]', array(
										'value' => '',
										'attrs' => 'style="width: 100%;" id="marker_opts_title"'))?>
								</td>
							</tr>
							<tr>
								<th scope="row">
									<label for="marker_opts_title">
										<?php _e('Marker Description', GMP_LANG_CODE)?>:
									</label>
									<i style="float: right;" class="fa fa-question supsystic-tooltip" title="<?php _e('Write here all text, that you want to appear in marker info-window PopUp', GMP_LANG_CODE)?>"></i>
								</th>
								<td></td>
							</tr>
							<tr>
								<th colspan="2">
									<?php wp_editor('', 'markerDescription', array(
										//'textarea_name' => 'marker_opts[description]',
										'textarea_rows' => 10
									));?>
									<?php echo htmlGmp::hidden('marker_opts[description]', array('value' => ''))?>
								</th>
							</tr>
							<tr>
								<th scope="row">
									<label class="label-big" for="gmpMarkerIconBtn">
										<?php _e('Icon', GMP_LANG_CODE)?>:
									</label>
									<i style="float: right;" class="fa fa-question supsystic-tooltip" title="<?php _e('Your marker Icon, that will appear on your map for this marker', GMP_LANG_CODE)?>"></i>
								</th>
								<td>
									<?php echo htmlGmp::hidden('marker_opts[icon]', array(
										'value' => 1 /*Default Icon ID*/ ))?>
									<img id="gmpMarkerIconPrevImg" src="" style="float: left;" />
									<a id="gmpMarkerIconBtn" href="#" class="button" style="float: right;" ><?php _e('Choose icon', GMP_LANG_CODE)?></a>
									<div style="clear: both;"></div>
								</td>
							</tr>
							<tr>
								<th scope="row">
									<label for="marker_opts_address">
										<?php _e('Address', GMP_LANG_CODE)?>:
									</label>
									<i style="float: right;" class="fa fa-question supsystic-tooltip" title="<?php _e('Search your location by address, just start typing here', GMP_LANG_CODE)?>"></i>
								</th>
								<td>
									<?php echo htmlGmp::text('marker_opts[address]', array(
										'value' => '',
										'placeholder' => '603 Park Avenue, Brooklyn, NY 11206, USA',
										'attrs' => 'style="width: 100%;" id="marker_opts_address"'))?>
								</td>
							</tr>
							<tr>
								<th scope="row">
									<label for="marker_opts_coord_x">
										<?php _e('Latitude', GMP_LANG_CODE)?>:
									</label>
									<i style="float: right;" class="fa fa-question supsystic-tooltip" title="<?php _e('Latitude for your marker', GMP_LANG_CODE)?>"></i>
								</th>
								<td>
									<?php echo htmlGmp::text('marker_opts[coord_x]', array(
										'value' => '',
										'placeholder' => '40.69827799999999',
										'attrs' => 'style="width: 100%;" id="marker_opts_coord_x"'))?>
								</td>
							</tr>
							<tr>
								<th scope="row">
									<label for="marker_opts_coord_y">
										<?php _e('Longitude', GMP_LANG_CODE)?>:
									</label>
									<i style="float: right;" class="fa fa-question supsystic-tooltip" title="<?php _e('Longitude for your marker', GMP_LANG_CODE)?>"></i>
								</th>
								<td>
									<?php echo htmlGmp::text('marker_opts[coord_y]', array(
										'value' => '',
										'placeholder' => '-73.95141139999998',
										'attrs' => 'style="width: 100%;" id="marker_opts_coord_y"'))?>
								</td>
							</tr>
						</table>
						<?php echo htmlGmp::hidden('mod', array('value' => 'marker'))?>
						<?php echo htmlGmp::hidden('action', array('value' => 'save'))?>
						<?php echo htmlGmp::hidden('marker_opts[id]', array('value' => ''))?>
						<?php echo htmlGmp::hidden('marker_opts[map_id]', array('value' => $this->editMap ? $this->map['id'] : ''))?>
						<?php echo htmlGmp::hidden('marker_opts[path]', array('value' => ''))?>
					</form>
				</div>
				<div class="row">
					<div id="markerList">
						<div style="display: none;" id="markerRowTemplate" class="row gmpMapMarkerRow">
							<div class="col-xs-12 egm-marker">
								<div class="row">
									<div class="col-xs-2 egm-marker-icon">
										<img alt="" src="">
									</div>
									<div class="col-xs-4 egm-marker-title">
									</div>
									<div class="col-xs-3 egm-marker-latlng">
									</div>
									<div class="col-xs-3 egm-marker-actions">
										<button title="<?php _e('Edit', GMP_LANG_CODE)?>" type="button" class="button button-small egm-marker-edit">
											<i class="fa fa-fw fa-pencil"></i>
										</button>
										<button title="<?php _e('Delete', GMP_LANG_CODE)?>" type="button" class="button button-small egm-marker-remove">
											<i class="fa fa-fw fa-trash-o"></i>
										</button>
									</div>
								</div>
							</div>
							<div style="clear: both;"></div>
						</div>
						
					</div>
				</div>
			</div>
			<div class="supsistic-half-side-box">
				<div id="gmpMapRightStickyBar" class="supsystic-sticky">
					<div id="gmpMapPreview" style="width: 100%; height: 300px;"></div>
					<div class="row">
						<div class="shortcode-wrap">
							<p id="shortcodeCode" style="display: none;">
								<strong style="margin-top: 2px; font-size: 1.2em; float: left;"><?php _e('Map shortcode', GMP_LANG_CODE)?>:</strong>
								<span class="gmpMapShortCodeShell"><?php /*Will be inserted from JS*/ ?></span>
							</p>
							<p id="shortcodeNotice" style="display: none;"><?php _e('Shortcode will appear after you save map.', GMP_LANG_CODE)?></p>
						</div>
						<div style="clear: both;"></div>
					</div>
					<div class="row">
						<div class="sup-col sup-w-50">
							<button id="gmpMapSaveBtn" class="button button-primary" style="width: 100%;"><?php _e('Save Map', GMP_LANG_CODE)?></button>
						</div>
						<div class="sup-col sup-w-50" style="padding-right: 0;">
							<button id="gmpMapDeleteBtn" class="button button-primary" style="width: 100%;"><?php _e('Delete Map', GMP_LANG_CODE)?></button>
						</div>
					</div>
				</div>
			</div>
			<div style="clear: both;"></div>
		</div>
	</div>
</section>
<!--Icons Wnd-->
<div id="gmpIconsWnd" style="display: none;">
	<ul class="iconsList">
		<?php foreach($this->icons as $icon) { ?>
		<li class="previewIcon" data-id="<?php echo $icon['id']?>" title="<?php echo $icon['title']?>">
			<img src="<?php echo $icon['path']?>" >
		</li>
		<?php }?>
	</ul>
</div>