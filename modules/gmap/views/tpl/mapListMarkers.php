<!-- File: <?php echo __FILE__; ?> -->
<div class="mapListMarkers">
    <?php if (isset($this->map['markers']) && !empty($this->map['markers'])): ?>
        <?php $rest = count($this->map['markers']) - 2; ?>
        <?php for ($i = 0; $i <= 1; $i++): ?>
            <span
                <?php if (!empty($this->map['markers'][$i]['address'])): ?>data-toggle="tooltip"
                title="<?php echo htmlspecialchars(
                    $this->map['markers'][$i]['address']
                ); ?>"
                style="cursor: help;"<?php endif; ?>>
            <?php echo htmlspecialchars(
                (isset($this->map['markers'][$i]) ? $this->map['markers'][$i]['title'] : '')
            ); ?><?php if ($i < 1 && count($this->map['markers']) > 1): ?>,<?php endif; ?>
        </span>
            <?php //array_shift($this->map['markers']); ?>
        <?php endfor; ?>
        <?php if ($rest > 0): ?>
            <?php $markers = array(); array_shift($this->map['markers']); array_shift($this->map['markers']);  foreach ($this->map['markers'] as $marker): $markers[] = htmlspecialchars($marker['title']); endforeach; ?>
            <span data-toggle="tooltip" title="<?php echo implode(', ', $markers); ?>" style="cursor: help"><?php echo sprintf(
                    langGmp::_('and %s more'),
                    $rest
                ); ?></span>
        <?php endif; ?>
    <?php else: ?>
        <span>&mdash;</span>
    <?php endif; ?>
</div>
<!-- /.mapListMarkers -->

<!-- End of File: <?php echo __FILE__; ?> -->