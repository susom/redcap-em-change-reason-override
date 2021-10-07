<?php

namespace Stanford\ChangeReasonOverride;

require_once("emLoggerTrait.php");

use ExternalModules\AbstractExternalModule;
use ExternalModules\ExternalModules;

class ChangeReasonOverride extends AbstractExternalModule
{

    use emLoggerTrait;

    /**
     * @throws \Exception
     */
    public function redcap_data_entry_form() //Triggers on new records as well
    {
        $this->override();
    }

    /**
     * Checks whether the external module setting for other is true or false
     * @return Boolean
     */
    public function checkOther()
    {
        try {
            $settings = ExternalModules::getProjectSettingsAsArray($this->PREFIX, PROJECT_ID, false);
            if ($settings['enable_other']['value'])
                return true;
            return false;
        } catch (\Exception $e) {
            $this->emError($e);
            return;
        }
    }

    /**
     * Function that injects necessary info into the client before render
     * @throws \Exception
     */
    public function override()
    {
        try {
            $settings = ExternalModules::getProjectSettingsAsArray($this->PREFIX, PROJECT_ID, false);

            if (!empty($settings['choices']['value'])) {
                $parsedChoices = $this->parseChoices($settings['choices']['value']);
                if ($settings['enable_other']['value']) //Either 0/1
                    array_push($parsedChoices, 'Other');

                $parsedChoices = json_encode($parsedChoices);
                $jsFilePath = $this->getUrl('js/script.js'); //Override js file

                print "<script type='text/javascript'>var override_choices = $parsedChoices; </script>";
                print "<script type='module' src=$jsFilePath></script>";

            } else {
                throw new \Exception('Error: choices is empty on project settings');
            }

        } catch (\Exception $e) {
            $this->emError($e);
            return;
        }
    }

    /**
     * Parses users choices into legible select format
     * @param $choices
     * @return array
     */
    public function parseChoices($choices): array
    {
        $parsedChoices = explode(",", $choices);

        return array_filter(array_map(function ($string) {
            return trim($string);
        }, $parsedChoices));
    }

    /**
     * Fetches enumerated list of choices
     * @return array
     */
    public function getChoices(): string
    {
        $pid = PROJECT_ID;
        $log_event_table = method_exists('\REDCap', 'getLogEventTable') ? \REDCap::getLogEventTable(PROJECT_ID) : "redcap_log_event";
        $sql = "SELECT change_reason FROM $log_event_table WHERE project_id = $pid";
        $q = db_query($sql);
        $ret = [];
        if (db_num_rows($q) > 0) {
            while ($row = db_fetch_assoc($q)) {
                if (empty($row['change_reason']))
                    continue;

                if (array_key_exists($row['change_reason'], $ret))
                    $ret[$row['change_reason']] += 1;
                else
                    $ret[$row['change_reason']] = 1;
            }
        } else {
            $this->emError('No data was found for change reason choices');
        }
        return json_encode($ret);
    }
}

