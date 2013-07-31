Ext.override(Ext.form.field.Number, {
	maxLength: 10,
	submitSeparator: ',',
	processRawValue: function (value) {
		value = this.callParent(arguments);

		if (this.isSubmit && this.submitSeparator) {
			value = value.toString().replace(this.decimalSeparator, this.submitSeparator);
		};

		return value;
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
	},
	processRawValue: function (value) {
		var me = this,
		stripRe = me.stripCharsRe,
		newValue;

		if (stripRe) {
			newValue = value.replace(stripRe, '');
			if (newValue !== value) {
				me.setRawValue(newValue);
				value = newValue;
			}
		}
		return value;
	},
	rawToValue: function (rawValue) {
		if (this.isSubmit) {
			return rawValue;
		};

		var value = this.fixPrecision(this.parseValue(rawValue));
		if (value === null) {
			value = rawValue || null;
		}
		return value;
	}
});