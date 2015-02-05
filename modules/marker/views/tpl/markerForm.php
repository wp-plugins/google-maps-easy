<!-- File: <?php echo __FILE__; ?> -->

<form id="egmMarkerForm" style="display: none;">
    <table class="form-table egm-form-marker">
        <tbody>
        <tr>
            <th scope="row">
                <label for="markerName" class="label-bold label-bigger">
                    <?php langGmp::_e('Marker Name'); ?>:
                    <span class="float-right" data-toggle="tooltip"
                          title="Marker name">
                        <i class="fa fa-fw fa-question supsystic-tooltip"></i>
                    </span>
                </label>
            </th>
            <td>
                <input class="regular-text" type="text"
                       name="marker_opts[title]"
                       id="markerName"/>
            </td>
        </tr>
        <tr>
            <th scope="row">
                <label for="markerDescription">
                    <?php langGmp::_e('Marker Description'); ?>:
                    <span class="float-right" data-toggle="tooltip"
                          title="Marker description">
                        <i class="fa fa-fw fa-question supsystic-tooltip"></i>
                    </span>
                </label>
            </th>
            <td></td>
        </tr>
        <tr>
            <th scope="row" colspan="2">
                <?php wp_editor('', 'markerDescription', array(
                    'textarea_name' => 'marker_opts[description]',
                    'textarea_rows' => 50
                )); ?>
            </th>
        </tr>
        <tr>
            <th scope="row">
                <label for="markerIcon">
                    <?php langGmp::_e('Icon'); ?>:
                    <span class="float-right" data-toggle="tooltip"
                          title="Marker icon">
                        <i class="fa fa-fw fa-question supsystic-tooltip"></i>
                    </span>
                </label>
            </th>
            <td>
                <span class="egm-marker-icon">
                    <img src="" alt=""/>
                </span>
                <button class="button float-right button-icon">
                    <?php langGmp::_e('Choose icon'); ?>
                </button>
            </td>
        </tr>
        <tr>
            <th scope="row">
                <label for="markerAddress">
                    <?php langGmp::_e('Address'); ?>:
                    <span class="float-right" data-toggle="tooltip"
                          title="Marker address">
                        <i class="fa fa-fw fa-question supsystic-tooltip"></i>
                        <!-- /.fa fa-fw fa-question supsystic-tooltip -->
                    </span>
                    <!-- /.float-right -->
                </label>
            </th>
            <td>
                <input class="regular-text" type="text"
                       name="marker_opts[address]"
                       id="markerAddress"/>
                <!-- /#markerAddress.regular-text -->
            </td>
        </tr>
        <tr>
            <th scope="row">
                <label for="markerLat">
                    <?php langGmp::_e('Latitude'); ?>:
                    <span class="float-right" data-toggle="tooltip"
                          title="Marker latitude">
                        <i class="fa fa-fw fa-question supsystic-tooltip"></i>
                        <!-- /.fa fa-fw fa-question supsystic-tooltip -->
                    </span>
                    <!-- /.float-right -->
                </label>
            </th>
            <td>
                <input class="regular-text" type="text"
                       name="marker_opts[coord_x]"
                       id="markerLat"/>
                <!-- /#markerLat.regular-text -->
            </td>
        </tr>
        <tr>
            <th scope="row">
                <label for="markerLng">
                    <?php langGmp::_e('Longitude'); ?>:
                    <span class="float-right" data-toggle="tooltip"
                          title="Marker longitude">
                        <i class="fa fa-fw fa-question supsystic-tooltip"></i>
                        <!-- /.fa fa-fw fa-question supsystic-tooltip -->
                    </span>
                    <!-- /.float-right -->
                </label>
            </th>
            <td>
                <input class="regular-text" type="text"
                       name="marker_opts[coord_y]"
                       id="markerLng"/>
                <!-- /#markerLng.regular-text -->
            </td>
        </tr>
        </tbody>
    </table>

    <?php echo htmlGmp::hidden('marker_opts[id]')?>
    <?php echo htmlGmp::hidden('marker_opts[map_id]')?>
    <?php echo htmlGmp::hidden('marker_opts[icon]')?>
    <?php echo htmlGmp::hidden('marker_opts[path]')?>
    <?php echo htmlGmp::hidden('page', array('value' => 'marker'))?>
    <?php echo htmlGmp::hidden('action', array('value' => 'save'))?>
    <?php echo htmlGmp::hidden('reqType', array('value' => 'ajax'))?>

</form>

<div id="iconsPopup" title="<?php langGmp::_e('Choose icon'); ?>">
    <?php if (!empty($this->icons)): ?>
        <ul class="iconsList">
            <?php foreach ($this->icons as $icon): ?>
                <li class="previewIcon" data-toggle="tooltip" title="<?php echo $icon['title']; ?>" data-id="<?php echo $icon['id']; ?>" data-tags="<?php echo $icon['description']; ?>" data-path="<?php echo $icon['path']; ?>">
                    <img src="<?php echo $icon['path']; ?>" alt="<?php echo $icon['title']; ?>"/>
                </li>
                <!-- /.previewIcon -->
            <?php endforeach; ?>
        </ul>
        <!-- /.button button-block -->
        <!-- /.or -->
        <!-- /.iconsList -->
    <?php else: ?>
        <!-- No icons -->
    <?php endif; ?>
</div>
<!-- /#iconsPopup -->

<!-- End of File: <?php echo __FILE__; ?> -->