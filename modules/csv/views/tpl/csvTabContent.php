<section>
	<div class="supsystic-item supsystic-panel">
		<div id="containerWrapper">
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
						<button id="gmpCsvImportMarkersBtn" class="button">
							<?php langGmp::_e('Import'); ?>
						</button>
					</td>
				</tr>
				</tbody>
			</table>
		</div>
	</div>
</section>