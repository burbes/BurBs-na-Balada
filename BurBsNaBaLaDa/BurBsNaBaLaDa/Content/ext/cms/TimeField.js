Ext.form.field.Time.override({
	getModelData: function () {
		var me = this,
					data = null;
		if (!me.isFileUpload()) {
			data = {};
			var v = me.getValue();

			if (Ext.isDate(v) && me.format) {
				v = Ext.Date.format(v, me.format);
			};

			data[me.getName()] = v;
		}
		return data;
	},
	getSubmitData: function () {
		var me = this,
					data = null,
					val;
		if (me.submitValue && !me.isFileUpload()) {
			val = me.getSubmitValue();

			if (Ext.isDate(val) && me.format) {
				val = Ext.Date.format(val, me.format);
			};

			if (val !== null) {
				data = {};
				data[me.getName()] = val;
			}
		}
		return data;
	}
});