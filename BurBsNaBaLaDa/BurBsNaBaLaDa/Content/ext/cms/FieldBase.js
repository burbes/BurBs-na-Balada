Ext.form.field.Base.override({
	originalDisabled: false,
	initValue: function () {
		var me = this;

		me.originalValue = me.lastValue = me.value;
		me.originalDisabled = me.disabled;

		me.suspendCheckChange++;
		me.setValue(me.value);
		me.suspendCheckChange--;
	},
	reset: function () {
		var me = this;

		me.setDisabled(me.originalDisabled);
		me.setValue(me.originalValue);
		me.clearInvalid();

		delete me.wasValid;
	},
	checkChangeEvents: Ext.isIE && (!document.documentMode || document.documentMode < 9) ?
                        ['changefilter', 'change', 'propertychange'] :
                        ['changefilter', 'change', 'input', 'textInput', 'keyup', 'dragdrop']
});

Ext.form.field.Field.override({
	initField: function () {
		this.addEvents(
			'changefilter',
            'change',
            'validitychange',
            'dirtychange'
        );

		this.initValue();
	},
	checkChange: function () {
		if (!this.suspendCheckChange) {
			var me = this,
                newVal = me.getValue(),
                oldVal = me.lastValue;
			if (!me.isEqual(newVal, oldVal) && !me.isDestroyed) {
				me.lastValue = newVal;
				me.fireEvent('changefilter', me, newVal, oldVal);
				me.fireEvent('change', me, newVal, oldVal);
				me.onChange(newVal, oldVal);
			}
		}
	}
});