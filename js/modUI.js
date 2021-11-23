const modUI = {
    baseModal: $('#change_reason_popup').get(0),
    /**
     * override_choices variable injected via backend before page load
     */
    alterHTML() {
        const html_options = override_choices.map((val) => `<option id="override_${encodeURI(val)}" value="ro_${encodeURI(val)}">${val}</option>`).join('');
        const dropdown = `
            <select id="change_reason" class="form-group form-control" aria-label="change_reason">
               <option selected disabled hidden>Select ...</option>
               ${html_options}
            </select>`;
        const p_info = `<div id="other_reason" hidden class="other_functionality">
            <p>Please describe your other designation:</p>
            <textarea id="other_input" class="form-group form-control"></textarea>
            </div>`;
        $('#change_reason_popup').html(dropdown + p_info);

        modUI.bindOtherEvents();
        modUI.overrideSelectionValue();
    },

    bindOtherEvents() {
        $('#change_reason').on("change", function () {
            if ($(this).val() === 'ro_Other') {
                $('#other_reason').removeAttr('hidden');
            } else {
                $('#other_reason').prop('hidden', true);
                $('#other_input').val('');
                $('#override_Other').val('ro_Other')
            }
        });
    },

    overrideSelectionValue() {
        $('#other_input').on("input", function () {
            const selected = $('#override_Other');
            let stringify = encodeURI($(this).val())
            // selected.attr('data', stringify);
            selected.val('ro_Other_' + stringify); //add to value
        });
    }
}

export {modUI}
