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
        <br><b>Note: </b>Reasons that have not yet been chosen will not on this graph, as the total number of selections
        is zero.
    </p>
</div>
<div style="width: 98%; border:solid 1px; padding: 10px; ">
    <div id="error" class="alert alert-danger hidden" role="alert">
        No results were found. Please check entries on the logging page to determine if any change reasons were
        submitted.
    </div>
    <canvas id="barChart" width="200" height="100"></canvas>
</div>


<script type="text/javascript">const choices = <?php echo $choices; ?>;</script>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.5.1/chart.min.js"></script>
<script type="text/javascript" src="<?php echo($module->getUrl('js/visualization.js')); ?>"></script>

