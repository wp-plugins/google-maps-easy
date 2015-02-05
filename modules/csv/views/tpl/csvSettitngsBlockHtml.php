<h2><?php langGmp::_e('Export / Import');?></h2>

<table class="form-table">
	<tbody>
	<tr>
		<th scope="row">
			<label>
				<?php langGmp::_e('Maps'); ?>
			</label>
		</th>
		<td>
			<button id="gmpCsvExportMapsBtn" class="button">
				<?php langGmp::_e('Export'); ?>
			</button>
			<!-- /#gmpCsvExportMapsBtn.button -->

			<?php echo htmlGmp::ajaxfile('csv_import_file', array(
				'url' => uriGmp::_(array('baseUrl' => admin_url('admin-ajax.php'), 'page' => 'csv', 'action' => 'import', 'reqType' => 'ajax')),
				'data' => 'gmpCsvImportData',
				'buttonName' => 'Import',
				'responseType' => 'json',
				'onSubmit' => 'gmpCsvImportOnSubmit',
				'onComplete' => 'gmpCsvImportOnComplete',
				'btn_class' => 'button',
			))?>
		</td>
	</tr>
	<tr>
		<th scope="row">
			<label for="gmpCsvExportMarkersBtn">
				<?php langGmp::_e('Markers'); ?>
			</label>
		</th>
		<td>
			<button id="gmpCsvExportMarkersBtn" class="button">
				<?php langGmp::_e('Export'); ?>
			</button>
			<!-- /#gmpCsvExportMarkersBtn.button -->

			<button id="gmpCsvImportMarkersBtn" class="button">
				<?php langGmp::_e('Import'); ?>
			</button>
			<!-- /#gmpCsvImportMarkersBtn.button -->
		</td>
	</tr>
	</tbody>
</table>
<!-- /.form-table -->
<!---->
<!--<div class="gmpFormRow">-->
<!--	--><?php //echo htmlGmp::button(array(
//		'value' => langGmp::_('Export Maps'),
//		'attrs' => 'id="gmpCsvExportMapsBtn" class="btn btn-success"'
//	))?>
<!--	--><?php //echo htmlGmp::button(array(
//		'value' => langGmp::_('Export Markers'),
//		'attrs' => 'id="gmpCsvExportMarkersBtn" class="btn btn-success"'
//	))?>
<!--	<br />-->
<!--	--><?php //echo htmlGmp::checkbox('csv_export_with_markers', array(
//		'attrs' => 'id="gmpCsvWithMarkersCheck"'
//	))?>
<!--	<label for="gmpCsvWithMarkersCheck">--><?php //langGmp::_e('Export maps with markers')?><!--</label>-->
<!--</div>-->
<!---->
<!--<hr />-->
<!---->
<!--<div class="gmpFormRow">-->
<!--	--><?php //echo htmlGmp::ajaxfile('csv_import_file', array(
//		'url' => uriGmp::_(array('baseUrl' => admin_url('admin-ajax.php'), 'page' => 'csv', 'action' => 'import', 'reqType' => 'ajax')),
//		'data' => 'gmpCsvImportData',
//		'buttonName' => 'Import Maps / Markers',
//		'responseType' => 'json',
//		'onSubmit' => 'gmpCsvImportOnSubmit',
//		'onComplete' => 'gmpCsvImportOnComplete',
//		'btn_class' => 'btn btn-success',
//	))?>
<!--	<br />-->
<!--	<span id="gmpCsvImportMsg"></span>-->
<!--	<br />-->
<!--	--><?php //echo htmlGmp::checkbox('csv_import_overwrite_same_names', array(
//		'attrs' => 'id="gmpCsvOverwriteSameNames"'
//	))?>
<!--	<label for="gmpCsvOverwriteSameNames">--><?php //langGmp::_e('Overwrite data with same names')?><!--</label>-->
<!---->
<!--</div>-->

<script type="text/javascript">
	(function ($) {
		$(document).ready(function () {
			$('#gmpCsvImportMarkersBtn').on('click', function () {
				$('input[name="csv_import_file"]').click();
			});
		});
	}(jQuery));
</script>