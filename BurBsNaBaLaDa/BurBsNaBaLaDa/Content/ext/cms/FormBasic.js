Ext.override(Ext.form.Basic, {
	getValues: function (asString, dirtyOnly, includeEmptyText, useDataValues) {
		var values = {};

		this.getFields().each(function (field) {
			field.isSubmit = true;

			if (!dirtyOnly || field.isDirty()) {
				var data = field[useDataValues ? 'getModelData' : 'getSubmitData'](includeEmptyText);

				if (Ext.isObject(data)) {
					if (field.refValue) {
						data[field.refValue] = field.getRawValue();
					};

					if (field.refId) {
						data[field.refId] = field.getValue();
					};

					if (field.ref && field.displayTplData.length > 0) {
						for (var i = 0; i < field.ref.length; i++) {
							var ref = field.ref[i];

							data[ref.data] = field.displayTplData[0][ref.field];
						};
					};

					Ext.iterate(data, function (name, val) {
						if (includeEmptyText && val === '') {
							val = field.emptyText || '';
						};

						if (name in values) {
							var bucket = values[name],
                                isArray = Ext.isArray;

							if (!isArray(bucket)) {
								bucket = values[name] = [bucket];
							};

							if (isArray(val)) {
								values[name] = bucket.concat(val);
							} else {
								bucket.push(val);
							};
						} else {
							values[name] = val;
						};
					});
				};
			};

			field.isSubmit = false;
		});

		if (asString) {
			values = Ext.Object.toQueryString(values);
		};

		return values;
	}
});