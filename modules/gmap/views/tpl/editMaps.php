<!-- Map edit page -->

<div class="row">
    <!-- #gmpEditMapContainer -->
    <div class="col-xs-12 col-md-6" id="gmpEditMapContainer">
        <div id="gmpEditMapContent">
            <?php echo $this->mapForm; ?>
        </div>
        <div class="row">
            <div id="gmpMarkerAddBtnWrapper" class="col-xs-12">
                <button id="gmpAddMarkerBtn" class="button button-block" type="button">
                    <?php langGmp::_e('Add New Marker'); ?>
                </button>

                <!-- This button need to be shown when marker editor is opened -->
                <button id="gmpSaveMarkerBtn" class="button pull-right" type="button" style="display: none;">
                    <?php langGmp::_e('Save Marker'); ?>
                </button>
                <div class="clear"></div>
            </div>
            <div class="clear"></div>
        </div>
        <div class="row">
            <div id="gmpMarkerFormWrapper" class="col-xs-12">
                <?php echo $this->markerForm; ?>
            </div>
            <div class="clear"></div>
        </div>

        <!-- Markers list -->
        <div class="egm-marker-list" id="markerList">
            <div class="row" id="markerTemplate" style="display: none;">
                <div class="col-xs-12">
                    <div class="egm-marker">
                        <div class="row">
                            <div class="col-xs-2 egm-marker-icon">
                                <img src="" alt=""/>
                            </div>
                            <!-- /.col-xs-2 egm-marker-icon -->
                            <div class="col-xs-4 egm-marker-title">
                            </div>
                            <!-- /.col-xs-4 egm-marker-title -->
                            <div class="col-xs-3 egm-marker-latlng">
                            </div>
                            <!-- /.col-xs-3 egm-marker-latlng -->
                            <div class="col-xs-3 egm-marker-actions">
                                <button class="button button-small egm-marker-edit" type="button" data-toggle="tooltip" title="Edit">
                                    <i class="fa fa-fw fa-pencil"></i>
                                    <!-- /.fa fa-fw fa-pencil -->
                                </button>
                                <!-- /#egmEditMarker.button -->
                                <button class="button button-small egm-marker-remove" type="button" data-toggle="tooltip" title="Delete">
                                    <i class="fa fa-fw fa-trash-o"></i>
                                    <!-- /.fa fa-fw fa-trash-o -->
                                </button>
                                <!-- /#egmRemoveMarker.button button-small -->
                            </div>
                            <!-- /.col-xs-3 egm-marker-actions -->
                        </div>
                        <!-- /.row -->
                    </div>
                    <!-- /.egm-marker -->
                </div>
                <!-- /.col-xs-12 -->
            </div>
            <!-- /.row -->
        </div>
        <!-- /#markerList.egm-marker-list -->


        <div class="clear"></div>
    </div>
    <div class="col-xs-12 col-md-6">
        <div class="row">
            <div class="col-xs-12">
                <div id="gmpMapPreview" style="width: 100%; height: 300px;"></div>
                <div class="clear"></div>
            </div>
            <div class="clear"></div>
        </div>

        <div id="mapShortcode">
            <div class="row">
                <div class="col-xs-12">
                    <div class="shortcode-wrap">
                        <p id="shortcodeCode">
                            <strong class="float-left" style="margin-top: 2px; font-size: 1.2em;">
                                <?php langGmp::_e('Map shortcode'); ?>:
                            </strong>
                            <!-- /.float-left -->
                            <span class="description float-right" style="background: none; font-family: Consolas, Monaco, monospace;">
                                [google_map_easy id="<span></span>"]
                            </span>
                            <!-- /.description float-right -->
                        </p>
                        <p id="shortcodeNotice">Shortcode will appear after you save map.</p>
                    </div>
                </div>
                <!-- /#shortcode.col-xs-12 -->
                <div class="clear"></div>
            </div>
        </div>
        <!-- /#mapShortcode -->

        <div class="row">
            <div class="col-xs-6">
                <button type="button" class="button button-block" id="gmpSaveMap" >
                    <?php langGmp::_e('Save Map'); ?>
                </button>
            </div>
            <div class="col-xs-6">
                <button type="button" class="button button-block" id="gmpDeleteMap">
                    <?php langGmp::_e('Delete Map'); ?>
                </button>
            </div>
        </div>
        <div class="row">
            <div class="col-xs-12">
                <div id="gmpEditMapFormAlerts"></div>
            </div>
        </div>
    </div>
    <!-- /#gmpEditMapContainer -->
    <div class="clear"></div>
</div>