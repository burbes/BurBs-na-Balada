Ext.form.field.Date.override({
	format: 'd/m/Y',
	mask: '99/99/9999',
	maxLength: 10,
	getModelData: function () {
		var me = this,
            data = {},
            value = me.getValue();

		data[me.getName()] = value;

		return data;
	},
	getSubmitData: function () {
		var me = this,
            data = null,
            value = me.getValue();

		if ((me.submitValue || me.isSubmit) && Ext.isDate(value)) {
			value = Ext.Date.format(value, me.format);

			data = {};
			data[me.getName()] = value;
		};

		return data;
	},
	initComponent: function () {
		if (this.mask) {
			this.plugins = [new CMS.mask(this.mask)];
		};

		this.callParent();
	},
	getValue: function (b) {
		var me = this,
            val = me.rawToValue(me.processRawValue(me.getRawValue()));

		me.value = val;

		if (me.isSearch === true && Ext.isDate(val)) {
			val = Ext.Date.format(val, me.format);
		};

		return val;
	},
	getErrors: function (value) {
		var me = this,
            format = Ext.String.format,
            clearTime = Ext.Date.clearTime,
            errors = me.callParent(arguments),
            disabledDays = me.disabledDays,
            disabledDatesRE = me.disabledDatesRE,
            minValue = me.minValue,
            maxValue = me.maxValue,
            len = disabledDays ? disabledDays.length : 0,
            i = 0,
            svalue,
            fvalue,
            day,
            time;

		value = me.formatDate(value || me.processRawValue(me.getRawValue()));

		if (value === null || value.length < 1) { // if it's blank and textfield didn't flag it then it's valid
			return errors;
		}

		var mask = this.getMask()

		if (mask && (value == mask.viewMask || value == "__/01/____")) {
			return errors;
		};

		svalue = value;
		value = me.parseDate(value);
		if (!value) {
			errors.push(format(me.invalidText, svalue, Ext.Date.unescapeFormat(me.format)));
			return errors;
		}

		time = value.getTime();
		if (minValue && time < clearTime(minValue).getTime()) {
			errors.push(format(me.minText, me.formatDate(minValue)));
		}

		if (maxValue && time > clearTime(maxValue).getTime()) {
			errors.push(format(me.maxText, me.formatDate(maxValue)));
		}

		if (disabledDays) {
			day = value.getDay();

			for (; i < len; i++) {
				if (day === disabledDays[i]) {
					errors.push(me.disabledDaysText);
					break;
				}
			}
		}

		fvalue = me.formatDate(value);
		if (disabledDatesRE && disabledDatesRE.test(fvalue)) {
			errors.push(format(me.disabledDatesText, fvalue));
		}

		return errors;
	}
});