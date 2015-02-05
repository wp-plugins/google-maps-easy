<?php foreach($this->tabsData as $id => $data): ?>
        <li role="presentation" class="<?php echo $id; ?>">
            <a href="#<?php echo $id; ?>" role="tab" data-toggle="tab">
                <?php echo htmlspecialchars($data['title']); ?>
            </a>
        </li>
        <!-- /.<?php echo $id; ?> -->
<?php endforeach; ?>
