const modUI = {
    baseModal: $('#change_reason_popup').get(0),
    /**
     * override_choices variable injected via backend before page load
     */
    alterHTML() {
        this.hideFormElements();

        const html_options = override_choices.map((val) => `<option id="override_${encodeURI(val)}" value="ro_${encodeURI(val)}">${val}</option>`).join('');
        const dropdown = `
            <select id="change_reason_override" class="form-group form-control" aria-label="change_reason">
               <option selected disabled hidden>Select ...</option>
               ${html_options}
            </select>`;
        const p_info = `<div id="other_reason" hidden class="other_functionality">
            <p>Please provide a brief description of your reasoning:</p>
            <textarea maxlength="100" id="other_input" class="form-group form-control"></textarea>
            </div>`;
        $('#change_reason_popup').append(dropdown + p_info);

        modUI.bindOtherEvents();
        modUI.overrideSelectionValue();
    },

    hideFormElements(){
        let elements = $('#change_reason_popup').children();
        for (let a of elements) {
            $(a).addClass('inv');
        }
    },

    bindOtherEvents() {
        $('#change_reason_override').on("change", function () {
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
        let decode;
        $("#change_reason_override").on("change", function(){
            if($(this).val() === "ro_Other") {
                $("#change_reason").val("oth_");
            }else{
                decode = decodeURI($(this).val());
                $("#change_reason").val(decode);
            }


        });

        $('#other_input').on("input", function () {
            $("#change_reason").val("oth_" + $(this).val());
        });
    }
}

export {modUI}
