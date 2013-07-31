Ext.define('Ext.ux.ColorField', {
	extend: 'Ext.form.field.Trigger',
	alias: 'widget.colorfield',
	requires: ['Ext.form.field.VTypes', 'Ext.layout.component.field.Text'],
	lengthText: 'O tamanho máximo para este campo é 6',
	blankText: 'Este campo é obrigatório',
	maxLength: 6,
	regex: /^[0-9a-f]{6}$/i,
	validateValue: function (value) {
		if (!this.getEl()) {
			return true;
		};

		if (!this.allowBlank && !value) {
			this.markInvalid(Ext.String.format(this.blankText, value));

			return false;
		};

		if (value.length != 6) {
			this.markInvalid(Ext.String.format(this.lengthText, value));

			return false;
		};

		if ((value.length < 1 && !this.allowBlank) || !this.regex.test(value)) {
			this.markInvalid(Ext.String.format(this.blankText, value));

			return false;
		};

		this.markInvalid();
		this.setColor(value);

		return true;
	},
	markInvalid: function (msg) {
		Ext.ux.ColorField.superclass.markInvalid.call(this, msg);

		this.inputEl.setStyle({
			'background-image': 'url(../Content/ext/resources/themes/images/default/grid/invalid_line.gif)'
		});
	},
	setValue: function (hex) {
		Ext.ux.ColorField.superclass.setValue.call(this, hex);

		this.setColor(hex);
	},
	setColor: function (hex) {
		Ext.ux.ColorField.superclass.setFieldStyle.call(this, {
			'background-color': hex ? ('#' + hex) : '',
			'background-image': 'none'
		});
	},
	menuListeners: {
		select: function (m, d) {
			this.setValue(d);
		},
		show: function () {
			this.onFocus();
		},
		hide: function () {
			this.focus();

			this.menu.un('select', this.menuListeners.select, this);
			this.menu.un('show', this.menuListeners.show, this);
			this.menu.un('hide', this.menuListeners.hide, this);
		}
	},
	onTriggerClick: function (e) {
		if (this.disabled) {
			return;
		};

		this.menu = new Ext.menu.ColorPicker({
			shadow: true,
			autoShow: true
		});

		this.menu.alignTo(this.inputEl, 'tl-bl?');
		this.menu.doLayout();
		this.menu.on(Ext.apply({}, this.menuListeners, {
			scope: this
		}));

		this.menu.show(this.inputEl);
	}
});