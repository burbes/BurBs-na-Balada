Ext.override(Ext.form.field.Checkbox, {
    valueString: false,
    inputValue: true,
    uncheckedValue: false,
    setRawValue: function (value) {
        var me = this,
            inputEl = me.inputEl,
            inputValue = me.inputValue,
            checked = (value === true || value === 'true' || value === '1' || value === 'S' || value === 1 ||
                (((Ext.isString(value) || Ext.isNumber(value)) && inputValue) ? value == inputValue : me.onRe.test(value)));

        if (inputEl) {
            inputEl.dom.setAttribute('aria-checked', checked);
            me[checked ? 'addCls' : 'removeCls'](me.checkedCls);
        }

        me.checked = me.rawValue = checked;
        return checked;
    },
    setValue: function (checked) {
        checked = (checked === true || checked === 'true' || checked === '1' || checked === 'S' || checked === 1) ? true : false;

        var me = this;

        if (Ext.isArray(checked)) {
            me.getManager().getByName(me.name).each(function (cb) {
                cb.setValue(Ext.Array.contains(checked, cb.inputValue));
            });
        } else {
            me.callParent(arguments);
        };

        return me;
    },
    getValue: function () {
        return this.valueString ? (this.checked ? 'S' : 'N') : (this.checked);
    },
    getRawValue: function () {
        return this.valueString ? (this.checked ? 'S' : 'N') : (this.checked);
    },
    getModelData: function () {
        var me = this,
					data = null;
        if (!me.isFileUpload()) {
            data = {};
            data[me.getName()] = me.getValue();
        }
        return data;
    },
    getSubmitData: function () {
        var me = this,
            data = null;
        if (me.submitValue && !me.isFileUpload()) {
            data = {};
            data[me.getName()] = '' + me.getValue();
        }
        return data;
    }
});