<?php foreach ($this->tabsData as $id => $data): ?>
    <div id="<?php echo $id; ?>" class="plugin-page tab-pane fade in <?php echo $id; ?>" role="tabpanel">
        <div id="<?php echo $id; ?>Content" class="plugin-page-body">
            <?php echo $data['content']; ?>
        </div>
        <div class="clear"></div>
    </div>
    <!-- /#<?php echo $id; ?>.plugin-page tab-pane -->
<?php endforeach;
