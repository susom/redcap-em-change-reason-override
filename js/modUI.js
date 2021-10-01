const modUI = {
    baseModal: $('#change_reason_popup').get(0),
    /**
     * override_choices variable injected via backend before page load
     */
    alterHTML() {
        const html_options = override_choices.map((val) => `<option value="${val}">${val}</option>`).join('');
        const p_info = `<p>Please select a reason for the data changes in the dropdown below.</p>`;
        const dropdown = `
            <select id="change_reason" class="form-group form-control" aria-label="change_reason">
               <option selected disabled hidden>Select ...</option>
               ${html_options}
            </select>`;

        $('#change_reason_popup').html(p_info + dropdown);
    }
}

export {modUI}
