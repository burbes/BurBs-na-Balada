Ext.form.field.Picker.override({
	initEvents: function () {
		var me = this;
		me.callParent();

		me.keyNav = Ext.create('Ext.util.KeyNav', me.inputEl, {
			down: function () {
				if (!me.isExpanded && me.hideTrigger !== true) {
					me.onTriggerClick();
				}
			},
			esc: me.collapse,
			scope: me,
			forceKeyDown: true
		});

		if (!me.editable) {
			me.mon(me.inputEl, 'click', me.onTriggerClick, me);
		}

		if (Ext.isGecko) {
			me.inputEl.dom.setAttribute('autocomplete', 'off');
		}
	}
});