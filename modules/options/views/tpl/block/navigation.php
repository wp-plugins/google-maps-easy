<!-- File: <?php echo __FILE__; ?> -->

<nav class="supsystic-navigation supsystic-sticky supsystic-sticky-active">
    <ul>
        <?php foreach ($this->tabsData as $id => $data): ?>
            <li>
                <a href="#<?php echo $id; ?>">
                    <i class="<?php echo $data['icon']; ?>"></i>
                    <!-- /.<?php echo $data['icon']; ?> -->
                    <?php echo $data['title']; ?>
                </a>
            </li>
        <?php endforeach; ?>
    </ul>
    <div class="clear"></div>
</nav>
<!-- /.supsystic-navigation -->

<!-- End of File: <?php echo __FILE__; ?> -->