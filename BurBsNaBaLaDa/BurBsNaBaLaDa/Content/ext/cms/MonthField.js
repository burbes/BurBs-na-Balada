Ext.define('Ext.form.field.Month', {
	extend: 'Ext.form.field.Date',
	alias: 'widget.monthfield',
	requires: ['Ext.picker.Month'],
	alternateClassName: ['Ext.form.MonthField', 'Ext.form.Month'],
	selectMonth: null,
	mask: '99/9999',
	maxLength: 10,
	createPicker: function ()
	{
		var me = this,
		format = Ext.String.format;

		return Ext.create('Ext.picker.Month', {
			pickerField: me,
			ownerCt: me.ownerCt,
			renderTo: document.body,
			floating: true,
			hidden: true,
			focusOnShow: true,
			minDate: me.minValue,
			maxDate: me.maxValue,
			disabledDatesRE: me.disabledDatesRE,
			disabledDatesText: me.disabledDatesText,
			disabledDays: me.disabledDays,
			disabledDaysText: me.disabledDaysText,
			format: me.format,
			showToday: me.showToday,
			startDay: me.startDay,
			minText: format(me.minText, me.formatDate(me.minValue)),
			maxText: format(me.maxText, me.formatDate(me.maxValue)),
			listeners: {
				select: { scope: me, fn: me.onSelect },
				monthdblclick: { scope: me, fn: me.onOKClick },
				yeardblclick: { scope: me, fn: me.onOKClick },
				OkClick: { scope: me, fn: me.onOKClick },
				CancelClick: { scope: me, fn: me.onCancelClick }
			},
			keyNavConfig: {
				esc: function ()
				{
					me.collapse();
				}
			}
		});
	},
	onCancelClick: function ()
	{
		var me = this;
		me.selectMonth = null;
		me.collapse();
	},
	onOKClick: function ()
	{
		var me = this;

		if (me.selectMonth)
		{
			me.setValue(me.selectMonth);
			me.fireEvent('select', me, me.selectMonth);
		};

		me.collapse();
	},
	onSelect: function (m, d)
	{
		var me = this;
		me.selectMonth = new Date(parseFloat(d[1]), parseFloat(d[0]), 1);
	},
	getRawValue: function ()
	{
		var me = this;
		var v = me.callParent(arguments);
		if (v == '')
		{
			return ''
		}
		var s = (v).split('/')
		var v = s[0] + '/01/' + s[1]
		return v
	},
	getValue: function ()
	{
		var me = this, val = me.rawToValue(me.processRawValue(me.getRawValue()));
		me.value = val;
		return val;
	},
	setValue: function (value)
	{
		if (value && typeof value == 'string')
		{
			var dt = value.split('/');

			if (dt.length == 2)
			{
				var ano = parseFloat(dt[1]);
				var mes = parseFloat(dt[0]) - 1;
				var dia = 1;

				value = new Date(ano, mes, dia);
			} else
			{
				var ano = parseFloat(dt[2]);
				var mes = parseFloat(dt[1]) - 1;
				var dia = 1;

				value = new Date(ano, mes, dia);
			}
		};

		var args = arguments;

		args[0] = value;

		this.callParent(args);

		return this;
	}
});