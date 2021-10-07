<?php

use Stanford\ChangeReasonOverride\ChangeReasonOverride;

require_once APP_PATH_DOCROOT . 'ProjectGeneral/header.php';

/**
 * @var ChangeReasonOverride $module
 */
$choices = $module->getChoices();
?>
<!DOCTYPE html>
<meta charset="utf-8">
<div style="width:98%">
    <p class="text-justify">This graph shows the number selections for each change reason specified in EM settings.
        <br>This includes <strong>all</strong> reasons chosen during the lifespan of the project.
        <br><i>(Not limited to the reasons specified in the EM settings if other reasons were chosen at an earlier date)</i>
        <br><b>Note: </b>Reasons that have not yet been chosen will not appear on this graph, as the total number of selections
        is zero.
    </p>
</div>
<div style="width: 98%; padding: 10px; ">
    <div id="error" class="alert alert-danger hidden" role="alert">
        No results were found. Please check entries on the logging page to determine if any change reasons were
        submitted.
    </div>
    <canvas id="barChart" width="200" height="75"></canvas>
</div>
<br>
<?php
    if($module->checkOther()) {
?>
<div style="width: 98%;  padding: 10px; ">
    <div id="error_other" class="alert alert-danger hidden" role="alert">
        No results were found. Please check entries on the logging page to determine if any change reasons were
        submitted.
    </div>
    <canvas id="otherChart" width="200" height="75"></canvas>
</div>
<br>
<div style="width: 98%; padding: 10px; ">
    <pre id="code_display" style="font-size: 12px;">
    </pre>
</div>
<?php
    }
?>
<script type="text/javascript">const choices = <?php echo $choices; ?>;</script>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.5.1/chart.min.js"></script>
<script type="text/javascript" src="<?php echo($module->getUrl('js/visualization.js')); ?>"></script>

