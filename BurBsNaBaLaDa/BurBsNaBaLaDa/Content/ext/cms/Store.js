Ext.data.Store.override({
	load: function (options) {
		var me = this;

		options = options || {};

		if (Ext.isFunction(options)) {
			options = {
				callback: options
			};
		};

		Ext.applyIf(options, {
			groupers: me.groupers.items,
			page: me.currentPage,
			start: (me.currentPage - 1) * me.pageSize,
			limit: me.pageSize,
			addRecords: false
		});

		Ext.applyIf(options, {
			params: {}
		});

		if (me.ignoraFiltroAtivo !== undefined) {
			options.params.ignoraFiltroAtivo = me.ignoraFiltroAtivo;
		};

		if (me.isGrid !== true) {
			delete options.page;
			delete options.start;
			delete options.limit;
		};

		return me.callParent([options]);
	},
	loadPage: function (page, options) {
		var me = this;
		options = Ext.apply({}, options);

		me.currentPage = page;

		Ext.applyIf(options, {
			page: page,
			start: (page - 1) * me.pageSize,
			limit: me.pageSize,
			addRecords: !me.clearOnPageLoad
		});

		Ext.applyIf(options, {
			params: {}
		});

		if (me.ignoraFiltroAtivo !== undefined) {
			options.params.ignoraFiltroAtivo = me.ignoraFiltroAtivo;
		};

		if (me.isGrid !== true) {
			delete options.page;
			delete options.start;
			delete options.limit;
		};

		me.read(options);
	},
	prefetchPage: function (page, options) {
		var me = this,
            pageSize = me.pageSize,
            start = (page - 1) * me.pageSize,
            end = start + pageSize;

		if (Ext.Array.indexOf(me.pagesRequested, page) === -1 && !me.rangeSatisfied(start, end)) {
			options = options || {};
			me.pagesRequested.push(page);
			Ext.applyIf(options, {
				page: page,
				start: start,
				limit: pageSize,
				callback: me.onWaitForGuarantee,
				scope: me
			});

			Ext.applyIf(options, {
				params: {}
			});

			if (me.ignoraFiltroAtivo !== undefined) {
				options.params.ignoraFiltroAtivo = me.ignoraFiltroAtivo;
			};

			if (me.isGrid !== true) {
				delete options.page;
				delete options.start;
				delete options.limit;
			};

			me.prefetch(options);
		};
	},
	sumString: function (field) {
	    return this.getSumString(this.data.items, field);
	},
	getSumString: function (records, field) {
		var total = 0,
            i = 0,
            len = records.length;

		for (; i < len; ++i) {
			total += records[i].get(field).toString().toDecimal();
		}

		return total;
	}
});