Ext.form.field.ComboBox.override({
	getSelectedData: function () {
		return Ext.isArray(this.displayTplData) ? this.displayTplData[0] : displayTplData;
	},
	maxLength: 500,
	load: function (cfg, scope) {
		this.setLoading(false);

		if (!cfg) {
			cfg = {
				callback: Ext.emptyFn,
				params: {}
			};
		} else {
			if (!cfg.params) {
				Ext.apply(cfg, {
					params: {}
				});
			};
		};

		var cb = cfg.callback;

		cfg.callback = function (response, request) {
			var result = Ext.decode(response.responseText);

			if (this.store) {
				this.store.loadData(result);
			};

			if (Ext.isFunction(cb)) {
				Ext.bind(cb, scope !== undefined ? scope : this, [result])();
			};
		};

		Ext.Ajax.request({
			url: this.store.proxy.url,
			params: cfg.params,
			success: Ext.bind(cfg.callback, this)
		});
	},
	getModelData: function () {
		var me = this,
			data = {};
		data[me.refId ? me.refId : me.getName()] = me.getValue();
		return data;
	},
	getSubmitData: function () {
		var me = this,
            data = null;

		if (me.submitValue) {
			data = {};
			data[me.refId ? me.refId : me.getName()] = '' + me.getValue();
		};

		return data;
	},
	getParams: function (queryString) {
		var params = {};

		if (this.storeParams != null) {
			var params = this.storeParams;
		};

		params[this.queryParam] = queryString;

		return params;
	},
	getValue: function () {
		var me = this,
			val = me.getRawValue();

		if (me.store && (typeof val == 'string')) {
			for (var i = 0; i < me.store.data.items.length; i++) {
				var rec = me.store.data.items[i];

				if (val != undefined && rec.data[me.displayField].toString().toUpperCase() == val.toString().toUpperCase()) {
					val = rec.data[me.valueField];
					break;
				};
			};
		};

		if (
			!Ext.isNumeric(val) && this.emptyText != null &&
				(
					(this.hideTrigger == true && this.emptyText.toString().toUpperCase() == 'DIGITE PARA PESQUISAR')
						||
					(this.emptyText.toString().toUpperCase() == val.toString().toUpperCase())
				)
			) {
			val = '';
		};

		if (Ext.isNumeric(val)) {
			val = parseFloat(val);
		};

		//me.value = val;

		return val;
	},
	getRawValue: function () {
		var me = this,
            v = me.callParent();

		if (v === me.emptyText) {
			v = '';
		};

		return v;
	},
	initComponent: function () {
		var me = this,
            isDefined = Ext.isDefined,
            store = me.store,
            transform = me.transform,
            transformSelect, isLocalMode;

		Ext.applyIf(me.renderSelectors, {
			hiddenDataEl: '.' + me.hiddenDataCls.split(' ').join('.')
		});

		//<debug>
		if (me.typeAhead && me.multiSelect) {
			Ext.Error.raise('typeAhead and multiSelect are mutually exclusive options -- please remove one of them.');
		}
		if (me.typeAhead && !me.editable) {
			Ext.Error.raise('If typeAhead is enabled the combo must be editable: true -- please change one of those settings.');
		}
		if (me.selectOnFocus && !me.editable) {
			Ext.Error.raise('If selectOnFocus is enabled the combo must be editable: true -- please change one of those settings.');
		}
		//</debug>

		this.addEvents(
            'beforequery',
            'select',
            'beforeselect',
            'beforedeselect'
        );

		if (transform) {
			transformSelect = Ext.getDom(transform);
			if (transformSelect) {
				store = Ext.Array.map(Ext.Array.from(transformSelect.options), function (option) {
					return [option.value, option.text];
				});
				if (!me.name) {
					me.name = transformSelect.name;
				}
				if (!('value' in me)) {
					me.value = transformSelect.value;
				}
			}
		}

		me.bindStore(store || 'ext-empty-store', true);

		store = me.store;

		if (store.autoCreated) {
			me.queryMode = 'local';
			me.valueField = me.displayField = 'field1';
			if (!store.expanded) {
				me.displayField = 'field2';
			}
		}

		if (!isDefined(me.valueField)) {
			me.valueField = me.displayField;
		}

		isLocalMode = me.queryMode === 'local';
		if (!isDefined(me.queryDelay)) {
			me.queryDelay = isLocalMode ? 10 : 500;
		}
		if (!isDefined(me.minChars)) {
			me.minChars = isLocalMode ? 0 : 4;
		}

		if (!me.displayTpl) {
			me.displayTpl = Ext.create('Ext.XTemplate',
			    '<tpl for=".">' +
			        '{[typeof values === "string" ? values : values["' + me.displayField + '"]]}' +
			        '<tpl if="xindex < xcount">' + me.delimiter + '</tpl>' +
			    '</tpl>'
			);
		} else if (Ext.isString(me.displayTpl)) {
			me.displayTpl = Ext.create('Ext.XTemplate', me.displayTpl);
		};

		me.callParent();

		me.doQueryTask = Ext.create('Ext.util.DelayedTask', me.doRawQuery, me);

		if (me.store.getCount() > 0) {
			me.setValue(me.value);
		}

		if (transformSelect) {
			me.render(transformSelect.parentNode, transformSelect);
			Ext.removeNode(transformSelect);
			delete me.renderTo;
		}

		if (this.hideTrigger == true) {
			this.emptyText = this.emptyText != undefined ? this.emptyText : 'DIGITE PARA PESQUISAR';
		};
	}
});

Ext.define('Ext.form.field.XComboBox', {
	extend: 'Ext.form.field.ComboBox',
	alternateClassName: 'Ext.form.XComboBox',
	alias: ['widget.xcombobox', 'widget.xcombo'],
	trigger1Class: 'x-form-select-trigger',
	trigger2Class: 'x-form-clear-trigger',
	onRender: function (ct, position) {
		this.callParent(arguments);
		this.addEvents('xreset');

		var id = this.getId();

		this.triggerEl.replaceWith({
			tag: 'div',
			cls: 'x-form-twin-triggers',
			style: 'display:block;width:46px;',
			cn: [
				{
					tag: "img",
					style: Ext.isIE ? 'margin-left:-3;height:19px' : '',
					src: Ext.BLANK_IMAGE_URL,
					id: "trigger1" + id,
					name: "trigger1" + id,
					cls: "x-form-trigger " + this.trigger1Class
				},
				{
					tag: "img",
					style: Ext.isIE ? 'margin-left:-6;height:19px' : '',
					src: Ext.BLANK_IMAGE_URL,
					id: "trigger2" + id,
					name: "trigger2" + id,
					cls: "x-form-trigger " + this.trigger2Class
				}
			]
		});

		this.triggerEl.on('mouseup', function (e) {
			if (e.target.name == "trigger1" + id) {
				this.onTriggerClick();
			} else if (e.target.name == "trigger2" + id) {
				this.reset();
				this.fireEvent('xreset', this);
			};
		}, this);

		Ext.get("trigger1" + id).addClsOnOver('x-form-trigger-over');
		Ext.get("trigger2" + id).addClsOnOver('x-form-trigger-over');
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