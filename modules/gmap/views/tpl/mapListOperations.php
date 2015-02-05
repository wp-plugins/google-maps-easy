<!-- File: <?php echo __FILE__; ?> -->

<div class="supsystic-actions-wrap">
	<a class="button button-table-action" id="editMap<?php echo $this->map['id']; ?>" href="javascript:;" onclick="EasyGoogleMaps.EditMapController.editMap(<?php echo $this->map['id']; ?>);">
		<i class="fa fa-fw fa-pencil"></i>
		<!-- /.fa fa-fw fa-pencil -->
	</a>
	<!-- /#editMap<?php echo $this->map['id']; ?>.button.button-table-action -->

	<a class="button button-table-action" id="deleteMap<?php echo $this->map['id']; ?>" href="javascript:;" onclick="gmpRemoveMap(<?php echo $this->map['id'];?>);">
		<i class="fa fa-fw fa-trash-o"></i>
		<!-- /.fa fa-fw fa-trash-o -->
	</a>
	<!-- /#deleteMap<?php echo $this->map['id']; ?>.button.button-table-action -->

	<div id="gmpRemoveElemLoader__<?php echo $this->map['id'];?>"></div>
</div>
<!-- /.supsystic-actions-wrap -->

<!-- End of File: <?php echo __FILE__; ?> -->