<!-- File: <?php echo __FILE__; ?> -->

<section class="supsystic-container">

    <?php foreach($this->tabsData as $id => $data): ?>

        <div class="supsystic-item" id="<?php echo $id; ?>" data-tabcontent="true">
            <?php echo $data['content']; ?>
            <div class="clear"></div>
        </div>
        <!-- /.supsystic-item -->

    <?php endforeach; ?>

    <div class="clear"></div>
</section>
<!-- /.supsystic-container-->

<!-- End of File: <?php echo __FILE__; ?> -->