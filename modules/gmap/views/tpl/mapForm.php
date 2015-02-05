<!-- File: <?php echo __FILE__; ?> -->

<?php echo htmlGmp::formStart(
    'editMapForm',
    array('attrs' => 'id="gmpEditMapForm" class="gmpMapFormItm"')
); ?>

<table class="form-table egm-form-map">
    <tbody>
    <tr>
        <th scope="row">
            <label for="mapName" class="label-bold label-bigger">
                <?php langGmp::_e('Map Name'); ?>:
                <span class="float-right" data-toggle="tooltip" title="Map name">
                    <i class="fa fa-fw fa-question supsystic-tooltip"></i>
                </span>
                <div class="clear"></div>
            </label>
        </th>
        <td>
            <input class="regular-text" type="text" name="map_opts[title]" id="mapName"/>
        </td>
    </tr>
    <tr>
        <th scope="row">
            <label for="mapWidth">
                <?php langGmp::_e('Map Width'); ?>:
                <span class="float-right" data-toggle="tooltip" title="Map width">
                    <i class="fa fa-fw fa-question supsystic-tooltip"></i>
                </span>
            </label>
        </th>
        <td>
            <div class="row">
                <div class="col-xs-3">
                    <input class="regular-text" type="text" name="map_opts[width]"
                           id="mapWidth"/>
                </div>
                <div class="col-xs-9">
                    <label for="mapWidthUnitsPx" class="supsystic-radio" data-toggle="tooltip" title="Pixels" style="margin-right: 15px;">
                        <input type="radio" name="map_opts[width_units]" value="px" id="mapWidthUnitsPx"/>
                        <?php langGmp::_e('Pixels'); ?>
                    </label>
                    <label for="mapWidthUnitsPerc" class="supsystic-radio" data-toggle="tooltip" title="Percents">
                        <input type="radio" name="map_opts[width_units]" value="%" id="mapWidthUnitsPerc"/>
                        <?php langGmp::_e('Percents'); ?>
                    </label>
                </div>
            </div>
        </td>
    </tr>
    <tr>
        <th scope="row">
            <label for="mapHeight">
                <?php langGmp::_e('Map Height'); ?>:
                <span class="float-right" data-toggle="tooltip" title="Map Height">
                    <i class="fa fa-fw fa-question supsystic-tooltip"></i>
                </span>
            </label>
        </th>
        <td>
            <div class="row">
                <div class="col-xs-3">
                    <input class="regular-text" type="text"
                           name="map_opts[height]"
                           id="mapHeight"/>
                </div>
                <div class="col-xs-9">
                    <label for="mapHeightUnitsPx" class="supsystic-radio" data-toggle="tooltip" title="Pixels">
                        <input type="radio" id="mapHeightUnitsPx" checked="checked"/>
                        <?php langGmp::_e('Pixels'); ?>
                    </label>
                </div>
                <!-- /.col-xs-9 -->
            </div>
        </td>
    </tr>
    <?php dispatcherGmp::doAction('googleMapEasyProButtons'); ?>
    </tbody>
</table>

<?php //echo dispatcherGmp::doAction('editMapFormProSimpleButtons'); ?>
<?php echo htmlGmp::hidden('map_opts[id]')?>
<?php echo htmlGmp::hidden('map_opts[map_center][coord_x]')?>
<?php echo htmlGmp::hidden('map_opts[map_center][coord_y]')?>
<?php echo htmlGmp::hidden('map_opts[zoom]')?>
<?php echo htmlGmp::hidden('page', array('value' => 'gmap'))?>
<?php echo htmlGmp::hidden('action', array('value' => 'save'))?>
<?php echo htmlGmp::hidden('reqType', array('value' => 'ajax'))?>
<?php echo htmlGmp::formEnd(); ?>

<!-- End of File: <?php echo __FILE__; ?> -->