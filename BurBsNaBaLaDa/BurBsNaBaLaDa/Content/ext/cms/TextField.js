Ext.form.field.Text.override({
	isSubmit: false,
	upperCase: true,
	setValue: function () {
		var me = this;
		var args = arguments;
		var v = args[0];

		var mask = this.getMask();

		if (mask && this.xtype === 'textfield' && v && v.length != mask.viewMask.length) {
			var value = mask.viewMask;

			if (Ext.isIE) {
				var valueIE = new String();

				var c = 0;

				for (var i = 0; i < value.toString().length; i++) {
					if (value.charAt(i) == '_') {
						valueIE = valueIE.concat(v.charAt(c++));
					} else {
						valueIE = valueIE.concat(value.charAt(i));
					};
				};

				value = valueIE;
			} else {
				for (var i = 0; i < v.toString().length; i++) {
					value = value.replace('_', v[i]);
				};
			};

			if (value.length == mask.rawMask.length) {
				args[0] = value;
			};
		};

		me.callParent(arguments);

		if (this._cep) {
			this._cepValue = me.getValue();
		};

		return me;
	},
	postBlur: function () {
		this.applyEmptyText();
		this.getCep();
	},
	getCep: function () {
		if (this._cep && this.inputEl.dom.value != '' && this._cepValue != this.getValue()) {
			Ext.Ajax.request({
				url: App._form._actions._cep,
				params: { cep: this.getValue() },
				method: 'POST',
				success: function (form, action) {
					var result = Ext.decode(form.responseText);

					this._cepValue = this.getValue();

					var fnGet = App.get

					if (result.success != false) {
						result = result[0];

						fnGet(this._cep.bairro).setValue(result.bairro);
						fnGet(this._cep.endereco).setValue(result.endereco);

						var ddlEstado = fnGet(this._cep.estado);
						ddlEstado.setValue(result.id_estado);
						ddlEstado.setDisabled(true);

						var ddlCidade = fnGet(this._cep.cidade);
						ddlCidade.reset();
						ddlCidade.load({
							params: { id_estado: result.id_estado },
							callback: function () {
								this.setValue(result.id_cidade)
								this.setDisabled(true);
							}
						});
					}
					else {
						fnGet(this._cep.bairro).setValue('');
						fnGet(this._cep.endereco).setValue('');

						var ddlEstado = fnGet(this._cep.estado);
						ddlEstado.setDisabled(false);
						ddlEstado.reset();

						var ddlCidade = fnGet(this._cep.cidade);
						ddlCidade.setDisabled(true);
						ddlCidade.reset();
					}
				},
				failure: function (form, action) {
				},
				scope: this
			})
		}
	},
	getMask: function () {
		if (this.plugins) {
			var mask = null;

			for (var i = 0; i < this.plugins.length; i++) {
				if (this.plugins[i].$className === 'CMS.mask') {
					mask = this.plugins[i];
				};
			};

			return mask;
		};

		return undefined;
	},
	changeMask: function (newMask) {
		if (this.mask) {
			this.mask.removeMask();
		};

		this.mask = new CMS.mask(newMask);

		if (!this.plugins) {
			this.plugins = [];
		};

		this.plugins.push(this.mask);
		this.mask.init(this);
	},
	removeMask: function () {
		if (this.mask) {
			this.mask.removeMask();
		};
	},
	getValueMask: function (v, force) {
		if (this.plugins) {
			var mask = this.getMask();

			if (mask && v && v != mask.viewMask && (this.isSubmit || force === true)) {
				v = mask.getValue(v, this);
				v = v == mask.viewMask ? '' : v;

				if (Ext.isIE) {
					var chars = mask.specialChars + '_';

					for (var j = 0; j < chars.length; j++) {
						for (var i = 0; i < v.toString().length; i++) {
							if (v.charAt(i) == chars.charAt(j)) {
								v = v.replace(chars.charAt(j), '');

								i--;
							};
						};
					};
				};
			} else if (mask && mask.viewMask === v) {
				v = '';
			};
		};

		return v;
	},
	getValue: function (force) {
		var me = this;
		var v = me.callParent(arguments);

		if (me.xtype == 'textfield' && me.plugins) {
			v = me.getValueMask(v, force);
		};

		if (typeof v == 'string' && me.upperCase === true) {
			return v.toString().toUpperCase();
		};

		return v;
	},
	getRawValue: function (force) {
		var me = this;
		var v = me.callParent(arguments);

		if (me.xtype == 'textfield' && me.plugins) {
			v = me.getValueMask(v, force);
		};

		if (typeof v == 'string' && me.upperCase === true) {
			return v.toString().toUpperCase();
		};

		return v;
	},
	setFieldLabel: function (text) {
		if (this.rendered) {
			this.labelEl.update(text + this.labelSeparator);
		} else {
			this.fieldLabel = text;
		};
	},
	getSubmitData: function () {
		var me = this,
            data = null;
		if (me.submitValue && !me.isFileUpload()) {
			data = {};
			data[me.getName()] = '' + me.getValue();
		}
		return data;
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