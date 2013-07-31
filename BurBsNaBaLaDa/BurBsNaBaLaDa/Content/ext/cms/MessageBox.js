Ext.override(Ext.window.MessageBox, {
	rebuildButton: function () {
		var me = this;

		me.msgButtons = [];
		for (i = 0; i < 4; i++) {
			button = me.makeButton(i);
			me.msgButtons[button.itemId] = button;
			me.msgButtons.push(button);
		}
		me.bottomTb = Ext.create('Ext.toolbar.Toolbar', {
			ui: 'footer',
			dock: 'bottom',
			layout: {
				pack: 'center'
			},
			items: [
                me.msgButtons[0],
                me.msgButtons[1],
                me.msgButtons[2],
                me.msgButtons[3]
            ]
		});

		me.dockedItems = Ext.create('Ext.util.MixedCollection', false, me.getComponentId);
		me.addDocked([me.bottomTb]);

		me.rebuildButton = Ext.emptyFn;
	},
	show: function (cfg) {
		var me = this;

		me.rebuildButton();

		me.reconfigure(cfg);
		me.addCls(cfg.cls);
		if (cfg.animateTarget) {
			me.doAutoSize(true);
			me.callParent();
		} else {
			me.callParent();
			me.doAutoSize(true);
		}
		return me;
	}
});