Ext.define('_Base.App', {
	extend: 'Ext.util.Observable',
	constructor: function (cfg) {
		this.addEvents({
			'load': true,
			'edit': true,
			'new': true,
			'beforeremove': true,
			'afterremove': true,
			'beforesave': true,
			'aftersave': true,
			'storeload': true,
			'beforecancel': true,
			'aftercancel': true
		});

		if (cfg.listeners) {
			this.listeners = cfg.listeners;
		};

		Ext.apply(this, cfg);

		Ext.onReady(this._initBase, this);

		return this;
	},
	initComponent: function () {
		return this.callParent(arguments);
	},
	query: {},
	queryMASTER: function () {
		var data = {};

		return {
			reset: function () {
				data = {};
			},
			all: function () {
				return data;
			},
			get: function (id) {
				if (id) {
					return data[id];
				};

				var url = '';

				for (var name in data) {
					var value = data[name];

					if (value.length != 0) {
						url += '&' + name + '=' + value;
					};
				};

				if (url) {
					return '?' + url.substring(1);
				};

				return null;
			},
			set: function (id, obj) {
				if (id && obj) {
					data[id] = obj;
				};

				return data[id];
			}
		};
	},
	_menu: function () {
		Ext.select('.cmsMenuApp').each(function (el, ce) {
			el.on('click', function () {
				this.maskLoading.show()
			}, this);
		}, this);

		Ext.select('.submenu').hover(
			function () {
				var s = Ext.get(this.id).addCls('mark').child('ul').show().select('.subPai');

				s.setStyle('background', '#456690');
				s.setStyle('color', '#0c356b');
			},
			function () {
				var s = Ext.get(this.id).removeCls('mark').child('ul').hide().select('.subPai');

				s.setStyle('background', 'transparent');
				s.setStyle('color', '#ffffff');
			}
		);
	},
	_toolTip: function () {
		Ext.tip.QuickTipManager.init();

		Ext.apply(Ext.tip.QuickTipManager.getQuickTip(), {
			showDelay: 1,
			trackMouse: true
		});
	},
	loading: {
		show: function (msg) {
			Ext.MessageBox.wait(msg ? msg : 'Aguarde carregando..');
		},
		close: function () {
			Ext.MessageBox.hide();
		}
	},
	get: function (id) {
		return Ext.getCmp(id) || Ext.get(id);
	},
	getInForm: function (id) {
		return this._form.getForm().getFields().get(id)
	},
	getInChild: function (id, n) {
		if (n != undefined) {
			return this._tab.items.items[n]._form.getForm().getFields().get(id);
		};

		return this._tab.activeTab._form.getForm().getFields().get(id);
	},
	QUERY: window['_queryString'],
	baseUrl: window['_baseUrl'],
	permissoes: window['_permissoes'],
	sessao: window['_sessao'],
	_disableValueSession: false,
	_disableRemove: false,
	_disableEdit: false,
	_primaryKey: null,
	_className: null,
	_hasFilter: false,
	_autoLoad: true,
	_autoFilter: true,
	_btnAdiciona: true,
	_child: false,
	_base: true,
	_baseBuilder: true,
	_buttons: [],
	_searchItems: [],
	_gridColumns: [],
	_formItems: [],
	_childApp: [],
	_buttonsGrid: [],
	_search: {},
	_store: {},
	_grid: {},
	_form: {},
	_tab: {},
	_btn: {},
	_msgCodBase: {
		1: 'Cadastrado',
		2: 'Alterado',
		3: 'Removido',
		4: 'FKError',
		5: 'RegistroExistente',
		6: 'RegistroAtivo'
	},
	_msgCod: {},
	_initApp: Ext.emptyFn,
	_setSearchFocus: Ext.emptyFn,
	_setFormFocus: Ext.emptyFn,
	ALERT: function (msg, title, cb) {
		Ext.Msg.alert(title ? title : '', msg, cb);
	},
	SETDATE: function (id, disable) {
		Ext.Ajax.request({
			url: Ext.String.format('{0}{1}', this.baseUrl, 'Util/GetDate'),
			method: 'POST',
			success: function (form, action) {
				var result = Ext.decode(form.responseText);

				if (result.success && result.Data && result.Data.date) {
					var v = Ext.Date.parseFunctions['MS'](result.Data.date);

					if (Ext.isFunction(id)) {
						id(v);

						return false;
					};

					id = this.get(id);

					if (id && id.setValue && v) {
						id.setValue(v);

						if (disable != false) {
							id.setDisabled(true);
						}
					};
				};
			},
			scope: this
		});
	},
	SETTIME: function (id, disable) {
		Ext.Ajax.request({
			url: Ext.String.format('{0}{1}', this.baseUrl, 'Util/GetTime'),
			method: 'POST',
			success: function (form, action) {
				var result = Ext.decode(form.responseText);

				if (result.success && result.Data && result.Data.time) {
					if (Ext.isFunction(id)) {
						id(result.Data.time);

						return false;
					};

					id = this.get(id);

					if (id && id.setValue) {
						id.setValue(result.Data.time);

						if (disable != false) {
							id.setDisabled(true);
						};
					}
				}
			},
			scope: this
		})
	},
	SETTIMERESERVA: function (id) {
		Ext.Ajax.request({
			url: Ext.String.format('{0}{1}', this.baseUrl, 'Util/GetTimeReserva'),
			method: 'POST',
			success: function (form, action) {
				var result = Ext.decode(form.responseText);

				if (result.success && result.Data && result.Data.time) {
					id = this.get(id)

					if (id && id.setValue) {
						id.setValue(result.Data.time)
					}
				}
			},
			scope: this
		})
	},
	_buildComboLogin: function (cb) {
		var renderToIncorporador = 'div-combo-incorporador';
		var renderToEmpreendimento = 'div-combo-empreendimento';

		if (!Ext.get(renderToIncorporador) || !Ext.get(renderToEmpreendimento)) {
			if (Ext.isFunction(cb)) {
				cb();

				return false;
			};
		};

		var ajax = function (id) {
			var params = {
				id_incorporador_grupo: this._comboIncorporador.getValue()
			};

			if (id == '_comboEmpreendimento') {
				params.id_empreendimento = this._comboEmpreendimento.getValue();
			};

			Ext.Ajax.request({
				url: Ext.String.format('{0}{1}', this.baseUrl, 'Login/MudaSessao'),
				method: 'POST',
				params: params,
				success: function (form, action) {
					var result = Ext.decode(form.responseText);

					if (result.success) {
						window.location.href = Ext.String.format('{0}{1}', this.baseUrl, 'Dashboard');
					};
				},
				scope: this
			});
		};

		var fnSelect = function (cmb, records, opts) {
			Ext.Msg.show({
				title: 'Mudar Visão de Incorporador/Empreendimento',
				msg: 'Confirma a mudança do Incorporador/Empreendimento?<br/>Você perderá qualquer informação não salva.',
				buttons: Ext.Msg.YESNO,
				icon: Ext.Msg.QUESTION,
				fn: function (r) {
					if (r == 'yes') {
						this.loading.show();

						Ext.bind(ajax, this, [cmb.id])();
					} else {
						if (cmb.id == '_comboIncorporador') {
							var id_incorporador_grupo = window['_id_incorporador_grupo'];
							this._comboIncorporador.setValue(id_incorporador_grupo);
						};

						if (cmb.id == '_comboEmpreendimento') {
							var id_empreendimento = window['_id_empreendimento'];
							this._comboEmpreendimento.setValue(id_empreendimento);
						}
					};
				},
				scope: this
			});
		};

		this._comboIncorporador = Ext.create('Ext.form.ComboBox', {
			id: '_comboIncorporador',
			width: 250,
			renderTo: renderToIncorporador,
			emptyText: 'TODOS INCORPORADORES',
			editable: false,
			forceSelection: true,
			store: this._createStore('Login', [
				{ dataIndex: 'id_incorporador_grupo', dataType: 'int' },
				{ dataIndex: 'descricao_incorporador_grupo', dataType: 'string' }
			], 'ListaIncorporador'),
			queryMode: 'local',
			triggerAction: 'all',
			displayField: 'descricao_incorporador_grupo',
			valueField: 'id_incorporador_grupo',
			listeners: {
				'select': Ext.bind(fnSelect, this)
			}
		});

		this._comboEmpreendimento = Ext.create('Ext.form.XComboBox', {
			id: '_comboEmpreendimento',
			width: 250,
			renderTo: renderToEmpreendimento,
			emptyText: 'TODOS EMPREENDIMENTOS',
			editable: false,
			forceSelection: true,
			store: this._createStore('Login', [
				{ dataIndex: 'id_empreendimento', dataType: 'int' },
				{ dataIndex: 'nome_empreendimento', dataType: 'string' }
			], 'ListaEmpreendimento'),
			queryMode: 'local',
			triggerAction: 'all',
			displayField: 'nome_empreendimento',
			valueField: 'id_empreendimento',
			listeners: {
				'xreset': function (cmb) {
					Ext.bind(fnSelect, this, [cmb])();
				},
				'select': Ext.bind(fnSelect, this),
				scope: this
			}
		});

		if (this._disableValueSession !== true) {
			this._comboIncorporador.store.load({
				callback: function () {
					this._reloadComboEmpreendimento(cb);
				},
				scope: this
			});
		} else {
			if (Ext.isFunction(cb)) {
				cb();

				return false;
			};
		};
	},
	_reloadComboEmpreendimento: function (cb) {
		var id_incorporador_grupo = window['_id_incorporador_grupo'];

		this._comboIncorporador.setValue(id_incorporador_grupo);

		this._comboEmpreendimento.load({
			params: {
				id_incorporador_grupo: id_incorporador_grupo
			},
			callback: function () {
				var id_empreendimento = window['_id_empreendimento'];

				this._comboEmpreendimento.setValue(id_empreendimento);

				if (Ext.isFunction(cb)) {
					cb();

					return false;
				};
			}
		}, this);
	},
	_initBase: function () {
		Ext.Ajax.timeout = Ext.Ajax.timeout * 100;

		this.query = new this.queryMASTER();

		this._menu();
		this._toolTip();
		this._initApp();

		var fnInit = Ext.emptyFn;

		if (this._base === true) {
			fnInit = function () {
				if (this._baseBuilder === true) {
					this._buttonBuilder();
					this._searchBuilder();
					this._formBuilder();
					this._gridBuilder();
					this._childBuilder();
					this._childLayout();
					this._setVisible(true);

					this._filterParams = Ext.encode([]);

					this._fnRecursive(this._form.getForm().getFields().items, function (cfg) {
						this._form._fields[cfg.id] = cfg
					}, this)
				};

				this.fireEvent('load', this);

				if (this._searchFocus) {
					this._setSearchFocus = function () {
						var cmp = this.get(this._searchFocus);

						if (cmp) {
							cmp.focus();
						};
					};

					this._setSearchFocus();
				};

				if (this._formFocus) {
					this._setFormFocus = function () {
						var cmp = this.get(this._formFocus);

						if (cmp) {
							cmp.focus();
						};
					};

					this._setFormFocus();
				};

				this.maskLoading.hide();
			};
		} else {
			fnInit = function () {
				this.maskLoading.hide();
				this.fireEvent('load', this);
			};
		};

		this._buildComboLogin(Ext.bind(fnInit, this));
	},
	maskLoading: {
		show: function () {
			Ext.select('#loading').setStyle('display', 'block');

			Ext.select('#loading').fadeIn({
				easing: 'easeOut',
				opacity: 1,
				duration: 500
			});
		},
		hide: function () {
			Ext.Function.defer(function () {
				Ext.select('#loading').fadeOut({
					easing: 'easeOut',
					opacity: 0,
					duration: 500,
					callback: function () {
						Ext.select('#loading').setStyle('display', 'none');
					}
				});
			}, 500);
		}
	},
	_baseAction: {
		_list: 'Lista',
		_manager: 'InsereAltera',
		_remove: 'Remove'
	},
	_getActions: function (baseUrl, className) {
		return {
			_list: Ext.String.format('{0}{1}/{2}', baseUrl, className, this._baseAction._list),
			_manager: Ext.String.format('{0}{1}/{2}', baseUrl, className, this._baseAction._manager),
			_remove: Ext.String.format('{0}{1}/{2}', baseUrl, className, this._baseAction._remove),
			_cep: Ext.String.format('{0}CEP/Get', baseUrl)
		};
	},
	_getParams: function (cfg) {
		return {
			_className: cfg._className,
			_primaryKey: cfg._primaryKey,
			_foreignKey: cfg._foreignKey
		};
	},
	_childAdd: function (cfg) {
		this._childApp.push(cfg);
	},
	_fnRecursive: function (cfg, fn, scope) {
		var fnSearch = function (_cfg, _scope) {
			if (_cfg.items && _cfg.items.length) {
				fnSearch(_cfg.items, _scope);
			} else {
				if (!Ext.isArray(_cfg)) {
					_cfg = [_cfg];
				};

				for (var i = 0; i < _cfg.length; i++) {
					var c = _cfg[i];

					if (c == undefined || c == null) {
						continue;
					};

					if (c.items && c.items.length && c.xtype && c.xtype != 'grid') {
						fnSearch(c.items, _scope);
					} else {
						(Ext.bind(fn, _scope, [c]))();
					};
				};
			};
		};

		for (var j = 0; j < cfg.length; j++) {
			fnSearch(cfg[j], scope);
		};
	},
	_columnsBuilder: function (_cfg) {
		var cfg = {
			name: _cfg.dataIndex,
			type: _cfg.dataType
		};

		if (!cfg.type) {
			cfg.type = 'string';
		} else if (cfg.type === 'datetime' || cfg.type === 'date') {
			cfg.type = 'date';
			cfg.dateFormat = _cfg.dateFormat ? _cfg.dateFormat : 'd/m/Y';
			cfg.convert = function (value) {
				if (Ext.isDate(value)) {
					return Ext.util.Format.dateRenderer(this.dateFormat)(value);
				};

				return Ext.util.Format.dateRenderer(this.dateFormat)(Ext.Date.parseFunctions['MS'](value));
			};
			cfg.renderer = function (value, metaData, record, rowIndex, colIndex, store, view) {
				if (Ext.isDate(value)) {
					return Ext.util.Format.dateRenderer(this.columns[colIndex].dateFormat)(value);
				};

				return value;
			};
		} else if (cfg.type === 'decimal' || cfg.type === 'int') {
			cfg.type = 'float';
			cfg.align = cfg.align ? cfg.align : 'right';
		} else if (cfg.type === 'bool') {
			cfg.type = 'boolean';

			if (!cfg.renderer && !_cfg.renderer && _cfg.xtype != 'checkcolumn' && _cfg.xtype != 'actioncolumn') {
				cfg.renderer = Ext.util.Format.renderBoolean;
			};
		};

		if (!cfg.renderer && !_cfg.renderer && _cfg.xtype != 'checkcolumn' && _cfg.xtype != 'actioncolumn') {
			cfg.renderer = Ext.util.Format.tooltip;
		};

		return cfg;
	},
	_createStore: function (controller, fields, urlList, autoLoad, groupField, params) {
		for (var i = 0; i < fields.length; i++) {
			fields[i] = Ext.applyIf(fields[i], this._columnsBuilder(fields[i]));
		};

		var modelName = Ext.String.format('{0}{1}DataModel', controller, new Date().getTime().toString());

		var model = Ext.define(modelName, {
			extend: 'Ext.data.Model',
			fields: fields,
			proxy: {
				type: 'ajax',
				url: Ext.String.format('{0}{1}/{2}', this.baseUrl, controller, urlList ? urlList : this._baseAction._list)
			}
		});

		return Ext.create('Ext.data.Store', {
			_dynamic: false,
			_modelName: modelName,
			model: modelName,
			autoLoad: autoLoad != undefined ? autoLoad : false,
			groupField: groupField != undefined ? groupField : undefined
		});
	},
	_createStoreDynamic: function (controller, fields, urlList) {
		for (var i = 0; i < fields.length; i++) {
			fields[i] = Ext.applyIf(fields[i], this._columnsBuilder(fields[i]));
		};

		var modelName = Ext.String.format('{0}{1}DataModel', controller, new Date().getTime().toString());

		var model = Ext.define(modelName, {
			extend: 'Ext.data.Model',
			fields: fields,
			proxy: {
				type: 'ajax',
				url: Ext.String.format('{0}{1}/{2}', this.baseUrl, controller, urlList ? urlList : this._baseAction._list),
				reader: {
					type: 'json',
					root: 'root',
					totalProperty: 'totalProperty'
				}
			}
		});

		return Ext.create('Ext.data.Store', {
			_dynamic: true,
			_modelName: modelName,
			pageSize: 10,
			model: modelName
		});
	},
	_getChildValues: function (fkName, fkValue) {
		var _childs = {};

		if (fkName && fkValue) {
			_childs[fkName] = fkValue;
		};

		if (this._childApp.length != 0) {
			for (var i = 0; i < this._tab.items.items.length; i++) {
				var _tab = this._tab.items.items[i];

				_childs['_JSON_' + _tab._className] = this._getJSON(_tab._grid, fkName, fkValue);
				_childs['_PK_' + _tab._className] = this._tab.items.items[i]._primaryKey;
				_childs['_FK_' + _tab._className] = this._tab.items.items[i]._foreignKey;
			};
		};

		return _childs;
	},
	_getJSON: function (_grid, fkName, fkValue) {
		var _json = '';

		for (var i = 0; i < _grid.store.data.items.length; i++) {
			var d = _grid.store.data.items[i].data;

			if (fkName && fkValue) {
				d[fkName] = fkValue;
			};

			_json += Ext.encode(d) + ',';
		};

		if (_json.length != 0) {
			return '[' + _json.substring(0, _json.length - 1) + ']';
		};

		return '';
	},
	_gridColumnsBuilder: function (columns, scope, child) {
		var _columns = [];

		var disableRemove = undefined;
		var disableEdit = undefined;

		if (!scope._child) {
			disableRemove = scope._disableRemove;
			disableEdit = scope._disableEdit;
		} else {
			disableRemove = child._disableRemove;
			disableEdit = child._disableEdit;
		};

		if (this.permissoes.exclui_perfil_aplicacao === false) {
			disableRemove = true;
		};

		if (!disableRemove) {
			_columns.push([
				{
					xtype: 'actioncolumn',
					align: 'center',
					header: 'Remover',
					width: 60,
					sortable: false,
					items: [
						{
							tooltip: 'Remover',
							iconCls: 'iconsGrid',
							icon: Ext.String.format('{0}Content/img/icons/bgBtnDelete.png', this.baseUrl),
							handler: function (g, rowIndex, colIndex) {
								(Ext.bind(this._fnRemove, this, [g, rowIndex, colIndex, scope]))();
							},
							scope: this
						}
					]
				}
			]);
		};

		if (!disableEdit) {
			_columns.push([
				{
					xtype: 'actioncolumn',
					align: 'center',
					header: 'Editar',
					width: 60,
					sortable: false,
					items: [
						{
							tooltip: 'Editar',
							iconCls: 'iconsGrid',
							icon: Ext.String.format('{0}Content/img/icons/bgBtnEditar.png', this.baseUrl),
							handler: function (g, rowIndex, colIndex, column, e) {
								(Ext.bind(this._fnEdit, this, [g.store.getAt(rowIndex), scope]))();
							},
							scope: this
						}
					]
				}
			]);
		};

		for (var i = 0; i < columns.length; i++) {
			var c = columns[i];

			Ext.apply(c, this._columnsBuilder(c));

			_columns.push(c);
		};

		return _columns;
	},
	_buttonBuilder: function () {
		this._btn = Ext.create('Ext.Button', {
			text: 'Adicionar novo elemento',
			renderTo: 'ext-btn',
			handler: Ext.bind(this._fnNew, this, [true, this]),
			tooltip: 'Adicionar novo elemento'
		});

		if (this.permissoes.insere_perfil_aplicacao === false) {
			this._btn.setDisabled(true);
		};

		if (this._btnAdiciona === false) {
			this._btn.setVisible(false);
		}
	},
	_gridBuilder: function () {
		var _fields = [];

		for (var i = 0; i < this._gridColumns.length; i++) {
			_fields.push(this._columnsBuilder(this._gridColumns[i]));
		};

		var _storeUrl = this._form._actions._list;

		if (this._classNameGrid !== undefined) {
			_storeUrl = this._getActions(this.baseUrl, this._classNameGrid)._list
		};

		this._store = Ext.create('Ext.data.Store', {
			ignoraFiltroAtivo: true,
			isGrid: true,
			pageSize: 10,
			model: Ext.define(this._className + 'DataModel', {
				extend: 'Ext.data.Model',
				idProperty: this._primaryKey,
				fields: _fields
			}),
			proxy: {
				type: 'ajax',
				url: _storeUrl,
				extraParams: this._getParams(this),
				reader: {
					root: 'root',
					totalProperty: 'totalProperty'
				}
			}
		});

		this._gridColumns = this._gridColumnsBuilder(this._gridColumns, this);

		this._paging = Ext.create('Ext.PagingToolbar', {
			store: this._store,
			displayInfo: true,
			displayMsg: 'Mostrando {0} de {1} - Total {2}',
			emptyMsg: 'Nenhum registro encontrado'
		});

		this._paging.on('beforechange', function (paging) {
			paging.store.proxy.extraParams._filterParams = this._filterParams;
		}, this);

		this._grid = Ext.create('Ext.grid.Panel', {
			height: 292,
			loadMask: true,
			viewConfig: {
				loadMask: {
					msg: 'Carregando...'
				}
			},
			enableColumnHide: false,
			enableColumnMove: false,
			enableColumnResize: false,
			store: this._store,
			columns: this._gridColumns,
			bbar: this._paging
		});

		this._formGrid = Ext.create('Ext.form.FormPanel', {
			renderTo: 'ext-grid',
			buttonAlign: 'left',
			border: false,
			items: [this._grid],
			buttons: this._buttonsGrid
		});

		if (this._autoLoad === true) {
			this._store.load();
		};
	},
	_handlerItems: function (items, isSearch, childId) {
		this._fnRecursive(items, function (cfg) {
			if (cfg.plugins) {
				cfg.mask = cfg.plugins[0].rawMask;
			};

			if (cfg.mask) {
				cfg.plugins = [new CMS.mask(cfg.mask, (isSearch === true ? false : true))];
				cfg.saveMask = cfg.saveMask !== undefined ? cfg.saveMask : false;
			};

			var fieldStyle = '';
			var upperCase = cfg.upperCase === undefined ? true : cfg.upperCase;

			if (upperCase) {
				fieldStyle += 'text-transform: uppercase;';
			};

			if (cfg.xtype && (cfg.xtype.indexOf('number') != -1 || cfg.xtype.indexOf('currency') != -1)) {
				fieldStyle += ' text-align: right;';
			};

			var listeners = {};

			Ext.apply(listeners, cfg.listeners);

			if (isSearch === true) {
				var listener = 'changefilter';

				if (cfg.xtype == 'combo') {
					cfg.xtype = 'xcombo';
					cfg.editable = false;
				} else if (cfg.xtype == 'checkbox') {
					listener = 'change';
				};

				if (childId) {
					listeners[listener] = Ext.bind(this._fnFilter, this, [childId]);

					cfg.childId = cfg.id;
				} else {
					listeners[listener] = Ext.bind(this._fnFilter, this, []);
				};
			};

			Ext.apply(cfg, {
				_upperCase: upperCase,
				fieldStyle: fieldStyle,
				enforceMaxLength: cfg.enforceMaxLength === undefined ? true : cfg.enforceMaxLength,
				name: cfg.name ? cfg.name : cfg.id,
				margins: cfg.margins ? cfg.margins : '5',
				enableKeyEvents: true,
				listeners: listeners
			});
		}, this);
	},
	_formButtons: function (scope, app) {
		var salvar = !scope._child ? '_btnSalvar' : '_btnSalvarChild';

		this[salvar] = Ext.create('Ext.Button', {
			xtype: 'button',
			text: 'Salvar',
			handler: Ext.bind(this._fnSave, scope, [app]),
			tooltip: 'Salvar'
		});

		var cancelar = !scope._child ? '_btnCancel' : '_btnCancelChild';

		this[cancelar] = Ext.create('Ext.Button', {
			xtype: 'button',
			text: 'Cancelar',
			handler: Ext.bind(this._fnCancel, scope, [app, false]),
			tooltip: 'Cancelar'
		});

		var arr = [this[salvar], this[cancelar]];

		if (scope._child === false) {
			for (var i = 0; i < app._buttons.length; i++) {
				arr.push(app._buttons[i]);
			};
		};

		return arr;
	},
	_formBuilder: function () {
		var _formFields = {}

		this._handlerItems(this._formItems);

		this._form = Ext.create('Ext.form.FormPanel', {
			renderTo: 'ext-form',
			buttonAlign: 'left',
			border: false,
			items: this._formItems,
			buttons: this._formButtons(this, this),
			_actions: this._getActions(this.baseUrl, this._className),
			_postParams: this._getParams(this),
			_fields: {},
			fieldDefaults: {
				labelAlign: 'top',
				labelSeparator: ''
			}
		});
	},
	_searchBuilder: function () {
		var buttons = [];

		if (!this._autoFilter) {
			buttons = [
				{
					id: 'btnFiltrar',
					xtype: 'button',
					width: 100,
					margin: '0 10 0 0',
					text: 'Filtrar',
					handler: Ext.bind(this._fnFilter, this, [undefined, true])
				}
			];
		};

		this._handlerItems(this._searchItems, true);

		if (this._searchItems.length != 0) {
			this._search = Ext.create('Ext.form.FormPanel', {
				renderTo: 'ext-search',
				fieldDefaults: {
					padding: '5px',
					labelAlign: 'top',
					labelSeparator: ''
				},
				title: this._searchTitle === undefined ? 'Filtros' : this._searchTitle,
				collapsible: this._searchCollapsible === undefined ? true : this._searchCollapsible,
				border: this._searchBorder === undefined ? true : this._searchBorder,
				items: this._searchItems,
				buttons: buttons
			});
		};
	},
	_fnSave: function (app, childs) {
		var post = function (_form, app, childs, scope, fireEvent) {
			_form._values = Ext.apply(Ext.apply({}, _form._postParams), childs);

			var scopeResult = scope;
			var eventResult = undefined;

			if (fireEvent === true) {
				if (scopeResult._child) {
					eventResult = scopeResult.activeTab._win.fireEvent('beforesave', scopeResult.activeTab, _form._values);
				} else {
					eventResult = scopeResult.fireEvent('beforesave', scopeResult, _form._values);
				};
			};

			if (eventResult === false) {
				if (scopeResult._child) {
					scopeResult.activeTab._win.close();

					app._btnSalvarChild.setDisabled(false);
				} else {
					app._btnSalvar.setDisabled(false);
				};

				return false;
			};

			_form.getForm().submit({
				url: _form._actions._manager,
				params: _form._values,
				waitMsg: 'Aguarde..',
				waitTitle: '',
				_fn: function (form, action) {
					switch (action.failureType) {
						case Ext.form.action.Action.CLIENT_INVALID:
							Ext.Msg.alert('Aviso', 'Formulário contém campos preenchidos incorretamente');
							break;

						case Ext.form.action.Action.CONNECT_FAILURE:
							Ext.Msg.alert('Aviso', 'Erro de conexão com o servidor');
							break;

						default:
							var scopeResult = scope;
							var result = action.result;
							var values = null;
							var resultAfterSave = null;

							if (scopeResult._child) {
								var codName = scopeResult.activeTab._msgCodBase[result.msgCod];

								if (scopeResult.activeTab._msgCod && scopeResult.activeTab._msgCod[codName]) {
									result.msg = scopeResult.activeTab._msgCod[codName];
								};

								values = scopeResult.activeTab._form.getForm().getValues(undefined, undefined, undefined, true);

								resultAfterSave = scopeResult.activeTab._win.fireEvent('aftersave', scopeResult.activeTab, values);

								app._btnSalvarChild.setDisabled(false);
							} else {
								var codName = scopeResult._msgCodBase[result.msgCod];

								if (scopeResult._msgCod && scopeResult._msgCod[codName]) {
									result.msg = scopeResult._msgCod[codName];
								};

								values = scopeResult._form.getForm().getValues(undefined, undefined, undefined, true);

								resultAfterSave = scopeResult.fireEvent('aftersave', scopeResult, values);

								app._btnSalvar.setDisabled(false);
							};

							if (result.values) {
								if (result.values.pkName && result.values.pkValue) {
									values[result.values.pkName] = result.values.pkValue;
								};
							};

							if (resultAfterSave !== false) {
								if (result.success) {
									Ext.Msg.alert('Sucesso', result.msg, Ext.bind(this._fnCancel, scope, [app, true, values]));
								} else {
									Ext.Msg.alert('Erro', result.msg);
								};
							};
							break;
					}
				},
				success: function (form, action) {
					Ext.bind(this._fn, app, [form, action])();
				},
				failure: function (form, action) {
					Ext.bind(this._fn, app, [form, action])();
				}
			});
		};

		var isValid = function (_form) {
			if (_form.getForm().isValid()) {
				return true;
			} else {
				Ext.Msg.show({
					title: 'Aviso',
					msg: 'Existem campos inválidos',
					buttons: Ext.Msg.OK,
					icon: Ext.Msg.WARNING
				});

				return false;
			};
		};

		if (!this._child) {
			if (isValid(this._form)) {
				app._btnSalvar.setDisabled(true);

				var fnDefer = function () {
					var _pk = parseInt(this._form.getForm().getValues()[this._form._postParams._primaryKey]);

					(Ext.bind(post, this, [this._form, app, (Ext.isNumber(_pk) && _pk != 0) ? {} : app._getChildValues(), app, true]))();
				};

				if (this._form.useDefer === true) {
					Ext.Function.defer(fnDefer, 500, this);
				} else {
					Ext.bind(fnDefer, this)();
				};
			};
		} else {
			if (isValid(this.activeTab._form)) {
				app._btnSalvarChild.setDisabled(true);

				var fnDefer = function () {
					var _grid = this.activeTab._grid;
					var _form = this.activeTab._form;
					var _win = this.activeTab._win;

					_form._values = _form.getForm().getValues(undefined, undefined, undefined, true);
					_form._skipInsert = false;

					var _pk = parseInt(_form._values[_form._postParams._primaryKey]);
					var _fk = parseInt(app.get(_form._postParams._foreignKey).getValue());

					if (_win.fireEvent('beforesave', this.activeTab, _form._values) === false) {
						return false;
					};

					var _record = new window[this.activeTab._className + 'DataModel'](_form._values);

					for (var p in _record.data) {
						if (!_record.data[p]) {
							delete _record.data[p];
						};
					};

					for (var i = 0; i < _grid.columns.length; i++) {
						var _c = _grid.columns[i];

						if (_c.dataFormat) {
							_record.data[_c.dataIndex] = new Ext.XTemplate(_c.dataFormat).applyTemplate(_record.data);
						};
					};

					if (Ext.isNumber(_fk) && _fk != 0) {
						(Ext.bind(post, this, [_form, app, app._getChildValues(_form._postParams._foreignKey, _fk), app._tab, false]))();
					} else if (Ext.isNumber(_pk) && _pk != 0) {
						(Ext.bind(post, this, [_form, app, app._getChildValues(), app._tab, false]))();
					} else {
						if (_form._record) {
							_grid.store.remove(_form._record);
						};

						if (_form._skipInsert === false) {
							_grid.store.insert(_grid.store.getCount(), _record);
						};

						if (_win.fireEvent('aftersave', this.activeTab, this.activeTab._form.getForm().getValues(undefined, undefined, undefined, true)) !== false) {
							if (_win.isVisible()) {
								_win.close();
							};
						};
					};
				};

				if (this.activeTab._form.useDefer === true) {
					Ext.Function.defer(fnDefer, 500, this);
				} else {
					Ext.bind(fnDefer, this)();
				};
			};
		};
	},
	_fnCancel: function (app, update, values) {
		if (!this._child) {
			app._btnSalvar.setDisabled(false);

			if (this.fireEvent('beforecancel', this, values) === false) {
				return false;
			};

			this._form.getForm().reset();
			this._setVisible(true);

			if (update) {
				this._grid.store.load({
					scope: this,
					callback: function () {
						this.fireEvent('storeload', values);
					}
				});
			};

			this._setSearchFocus();

			this.fireEvent('aftercancel', this, values);
		} else {
			var _tab = this.activeTab;
			var _grid = _tab._grid;
			var _form = _tab._form;
			var _win = _tab._win;

			app._btnSalvarChild.setDisabled(false);

			if (_win.fireEvent('beforecancel', _tab, values) === false) {

				return false;
			};

			_form.getForm().reset();

			if (_win.isVisible()) {
				_win.close();
			};

			if (update) {
				var params = {};

				if (app && app.get && app._form) {
					var c = app._form.getForm().getFields().get(this.activeTab._foreignKey);

					if (c && c.getValue) {
						params[this.activeTab._foreignKey] = c.getValue();
					};

					if (this.activeTab._foreignKeyExtra) {
						var fks = this.activeTab._foreignKeyExtra.split(',');

						for (var fk in fks) {
							c = app._form.getForm().getFields().get(fks[fk]);

							if (c && c.getValue) {
								params[fks[fk]] = c.getValue();
							};
						};
					};
				};

				_grid.store.load({
					scope: _win,
					callback: function () {
						this.fireEvent('storeload', values);
					},
					params: params
				});
			};

			_win.fireEvent('aftercancel', _tab, values);
		};
	},
	_fnNew: function (fireEvent, scope) {
		if (!scope._child) {
			scope._form.getForm().reset();
			scope._fnDisableForm(this._form, false);
			scope._setVisible(false);

			if (fireEvent !== false) {
				scope._childLayout();
			};

			delete scope._form._record;

			if (fireEvent !== false) {
				scope.fireEvent('new', scope);

				scope._form.getForm().isValid();
			};

			if (scope._childApp.length != 0) {
				for (var i = 0; i < scope._tab.items.items.length; i++) {
					scope._tab.items.items[i]._grid.store.removeAll();
				};
			};

			if (scope.permissoes.insere_perfil_aplicacao === false) {
				scope._btnSalvar.setDisabled(true);
			} else {
				scope._btnSalvar.setDisabled(false);
			};

			scope._setFormFocus();
		} else {
			var _tab = scope.activeTab;
			_tab._form.getForm().reset();
			this._fnDisableForm(_tab._form, false);
			_tab._win.show(undefined, function () {
				Ext.Function.defer(this._setFormFocus, 500);
			}, _tab);

			delete _tab._form._record;

			if (fireEvent !== false) {
				_tab._win.fireEvent('new', scope);

				_tab._form.getForm().isValid();
			};

			if (this.permissoes.insere_perfil_aplicacao === false) {
				this._btnSalvarChild.setDisabled(true);
			} else {
				this._btnSalvarChild.setDisabled(false);
			};
		};
	},
	_setVisible: function (b) {
		Ext.get('div-main').setStyle('display', b ? 'block' : 'none');

		this._form.setVisible(!b);
	},
	_fnRemove: function (g, rowIndex, colIndex, scope) {
		if (!scope._child) {
			if (this.fireEvent('beforeremove', g.store.getAt(rowIndex).data) === false) {
				return false;
			};
		} else {
			if (scope.activeTab._win.fireEvent('beforeremove', g.store.getAt(rowIndex).data) === false) {
				return false;
			};
		};

		var ajax = function (_url, _params, _scope) {
			Ext.Ajax.request({
				url: _url,
				params: _params,
				method: 'POST',
				success: function (form, action) {
					var scopeResult = this == scope ? this : scope;
					var result = Ext.decode(form.responseText);

					if (scopeResult._child) {
						var codName = scopeResult.activeTab._msgCodBase[result.msgCod];

						if (scopeResult.activeTab._msgCod && scopeResult.activeTab._msgCod[codName]) {
							result.msg = scopeResult.activeTab._msgCod[codName];
						};
					} else {
						var codName = scopeResult._msgCodBase[result.msgCod];

						if (scopeResult._msgCod && scopeResult._msgCod[codName]) {
							result.msg = scopeResult._msgCod[codName];
						};
					};

					var fn = Ext.Function.createSequence(this._fnCancel, function () {
						if (this._child) {
							this.activeTab._win.fireEvent('afterremove');
						} else {
							this.fireEvent('afterremove');
						}
					}, scopeResult);

					Ext.Msg.alert(result.success ? 'Sucesso' : 'Erro', result.msg, Ext.bind(fn, scopeResult, [this, true]));
				},
				failure: function (form, action) {
					Ext.Msg.alert('Erro', 'Erro de conexão com o servidor');
				},
				scope: _scope
			});
		};

		var fnRemove = function (r) {
			if (r != "yes") {
				return false;
			};

			this.loading.show();

			var _params = {};

			if (!scope._child) {
				_params['_primaryKey'] = this._primaryKey;
				_params[this._primaryKey] = g.store.getAt(rowIndex).data[this._primaryKey];

				ajax(this._form._actions._remove, _params, this);
			} else {
				var _grid = scope.activeTab._grid;
				var _form = scope.activeTab._form;
				var _values = _form.getForm().getValues();
				var _pk = parseInt(_values[_form._postParams._primaryKey]);
				var _fk = parseInt(this.get(_form._postParams._foreignKey).getValue());

				if ((Ext.isNumber(_fk) && _fk != 0) || (Ext.isNumber(_pk) && _pk != 0)) {
					_pk = scope.activeTab._form._postParams._primaryKey;

					_params['_primaryKey'] = _pk;
					_params[_pk] = g.store.getAt(rowIndex).data[_pk];

					ajax(scope.activeTab._form._actions._remove, _params, this);
				} else {
					g.store.remove(g.store.getAt(rowIndex));

					scope.activeTab._win.fireEvent('afterremove');

					this.loading.close();
				};
			};
		};

		Ext.Msg.show({
			title: 'Confirmação de remoção',
			msg: 'Deseja realmente excluir este registro?',
			buttons: Ext.Msg.YESNO,
			icon: Ext.MessageBox.QUESTION,
			fn: fnRemove,
			scope: this
		});
	},
	_fnDisableForm: function (form, b) {
		this._fnRecursive(form.items.items, function (cfg) {
			if (cfg.disabled) {
				return;
			};

			var c = this.get(cfg.id);

			if (c && c.setDisabled) {
				c.setDisabled(b);
			};
		}, this);
	},
	_setValues: function (scope, data) {
		/* scope é onde contem o _form*/
		var fields = scope._form.getForm().getFields().items;

		for (i = 0; i < fields.length; i++) {
			var f = fields[i];

			f.isSystemEdit = true;

			if (f.refId) {
				f.setValue(data[f.refId])
			} else {
				f.setValue(data[f.id])
			};

			f.isSystemEdit = false;
		};
	},
	_fnEdit: function (record, scope) {
		if (!scope._child) {
			this._fnNew(false, scope);
			this._form._record = record;

			this._setValues(this, record.data);

			this._childLayout();

			if (this.permissoes.altera_perfil_aplicacao === false) {
				this._fnDisableForm(this._form, true);
			};

			this._loadChilds();

			this.fireEvent('edit', record.data, this);

			this._form.getForm().isValid();

			if (this.permissoes.altera_perfil_aplicacao === false) {
				this._btnSalvar.setDisabled(true);
			} else {
				this._btnSalvar.setDisabled(this._btnSalvar.disabled);
			};
		} else {
			var _tab = scope.activeTab;

			_tab._form.getForm().reset();
			_tab._form._record = record;
			_tab._win.show(undefined, function () {
				Ext.Function.defer(this._setFormFocus, 500);
			}, _tab);

			this._setValues(_tab, record.data);

			if (this.permissoes.altera_perfil_aplicacao === false) {
				this._fnDisableForm(_tab._form, true);
			};

			_tab._win.fireEvent('edit', record.data, this);

			_tab._form.getForm().isValid();

			if (this.permissoes.altera_perfil_aplicacao === false) {
				this._btnSalvarChild.setDisabled(true);
			} else {
				this._btnSalvarChild.setDisabled(false);
			};
		};
	},
	_loadChilds: function (removeAll) {
		if (this._childApp.length != 0) {
			for (var i = 0; i < this._tab.items.items.length; i++) {
				Ext.bind(this.fnActivateTab, this._tab.items.items[i], [])();

				var params = {};

				var c = this._form.getForm().getFields().get(this._tab.items.items[i]._foreignKey);

				if (c && c.getValue) {
					params[this._tab.items.items[i]._foreignKey] = c.getValue();
				};

				if (this._tab.items.items[i]._foreignKeyExtra) {
					var fks = this._tab.items.items[i]._foreignKeyExtra.split(',');

					for (var fk in fks) {
						c = this._form.getForm().getFields().get(fks[fk]);

						if (c && c.getValue) {
							params[fks[fk]] = c.getValue();
						};
					};
				};

				var tab = this._tab.items.items[i];

				if (tab._autoLoad === true && removeAll !== false) {
					tab._grid.store.load({
						scope: tab._win,
						params: params,
						callback: function () {
							this.fireEvent('storeload');
						}
					});
				} else if (removeAll === false) {
					tab._grid.store.removeAll();
				}
			};
		};
	},
	fnActivateTab: function (_disabledTabNew, _disabledTabNewMsg, _disabledTabForce) {
		this._label.setText('&nbsp;', false);
		this._btn.setDisabled(false);

		if (this._disabledTabNew !== true) {
			return false;
		};

		var fk = Ext.getCmp(this._foreignKey);

		if (fk) {
			fk = fk.getValue();

			if (isNaN(parseFloat(fk)) || _disabledTabForce === true) {
				if (this._disabledTabNew === true && this._disabledTabNewMsg) {
					this._btn.setDisabled(_disabledTabNew ? _disabledTabNew : true);
					this._label.setText(_disabledTabNewMsg ? _disabledTabNewMsg : this._disabledTabNewMsg, false);
				};
			};
		};
	},
	_childBuilder: function () {
		if (this._childApp.length == 0) {
			return false;
		};

		this._tab = Ext.create('Ext.tab.Panel', {
			_child: true,
			plain: true,
			activeTab: 0
		});

		this._form.add(this._tab);

		for (var j = 0; j < this._childApp.length; j++) {
			var c = this._childApp[j];

			c._disableEdit = c._disableEdit !== undefined ? c._disableEdit : false;
			c._disableRemove = c._disableRemove !== undefined ? c._disableRemove : false;

			var _fields = [];
			var _id = Ext.String.format('childTab_{0}', c._className);

			for (var i = 0; i < c._gridColumns.length; i++) {
				_fields.push(this._columnsBuilder(c._gridColumns[i]));
			};

			var _gridColumns = this._gridColumnsBuilder(c._gridColumns, this._tab, c);
			var _actions = this._getActions(this.baseUrl, c._className);
			var _search = undefined;

			if (c._searchItems && c._searchItems.length != 0) {
				this._handlerItems(c._searchItems, true, _id);

				if (c._searchItems.length != 0) {
					_search = Ext.create('Ext.form.FormPanel', {
						title: 'Filtros',
						fieldDefaults: {
							padding: '5px',
							labelAlign: 'top',
							labelSeparator: ''
						},
						collapsible: true,
						items: c._searchItems
					});
				};
			};

			var _storeUrl = _actions._list;

			if (c._classNameGrid !== undefined) {
				_storeUrl = this._getActions(this.baseUrl, c._classNameGrid)._list
			};

			if (c._urlGrid !== undefined) {
				_storeUrl = this.baseUrl + c._className + '/' + c._urlGrid;
			};

			var _store = Ext.create('Ext.data.Store', {
				ignoraFiltroAtivo: true,
				pageSize: 10,
				model: Ext.define(c._className + 'DataModel', {
					extend: 'Ext.data.Model',
					idProperty: c._primaryKey,
					fields: _fields
				}),
				proxy: {
					type: 'ajax',
					url: _storeUrl,
					extraParams: this._getParams(c),
					reader: {
						root: 'root',
						totalProperty: 'totalProperty'
					}
				}
			});

			var _grid = Ext.create('Ext.grid.Panel', {
				height: 292,
				loadMask: true,
				viewConfig: {
					loadMask: {
						msg: 'Carregando...'
					}
				},
				enableColumnHide: false,
				enableColumnMove: false,
				enableColumnResize: false,
				title: c._gridTitle ? c._gridTitle : undefined,
				store: _store,
				columns: _gridColumns
			});

			var _label = Ext.create('Ext.form.Label', {
				html: '&nbsp;',
				style: 'padding: 5px;'
			});

			var _btn = Ext.create('Ext.Button', {
				text: 'Adicionar novo elemento',
				handler: Ext.bind(this._fnNew, this, [true, this._tab]),
				tooltip: 'Adicionar novo elemento'
			});

			if (this.permissoes.insere_perfil_aplicacao === false) {
				_btn.setDisabled(true);
			};

			var _panelItems = [];

			if (c._extraItems) {
				this._handlerItems(c._extraItems);

				_panelItems.push(c._extraItems);
			};

			var _btnCfg = {
				xtype: 'container',
				items: [_label, _btn]
			};

			if (_search) {
				_panelItems.push(_search);

				_btnCfg.style = 'text-align: right; margin-bottom: 5px; margin-top: 5px;';
			} else {
				_btnCfg.style = 'text-align: right; margin-bottom: 5px;';
			};

			if (c._removeAdd !== true) {
				_panelItems.push(_btnCfg);
			};

			_panelItems.push(_grid);

			var _panel = Ext.create('Ext.form.FormPanel', {
				border: false,
				buttonAlign: 'left',
				padding: '5px',
				fieldDefaults: {
					padding: '5px',
					labelAlign: 'top',
					labelSeparator: ''
				},
				items: _panelItems
			});

			this._handlerItems(c._formItems);

			var _form = Ext.create('Ext.form.FormPanel', {
				border: true,
				buttonAlign: 'left',
				items: c._formItems,
				_actions: _actions,
				_postParams: this._getParams(c),
				_fields: {},
				buttons: this._formButtons(this._tab, this),
				fieldDefaults: {
					padding: '5px',
					labelAlign: 'top',
					labelSeparator: ''
				}
			});

			this._fnRecursive(_form.getForm().getFields().items, function (cfg) {
				cfg.childId = cfg.id;

				_form._fields[cfg.childId] = cfg;
			});

			var _listeners = {};

			if (c.listeners) {
				_listeners = c.listeners;
			};

			var _win = Ext.create('widget.window', {
				width: c._width ? c._width : 400,
				height: c._height ? c._height : undefined,
				modal: true,
				closable: false,
				closeAction: 'hide',
				title: c._tabName,
				items: [_form],
				listeners: _listeners
			});

			_win.addEvents({
				'winshow': true,
				'edit': true,
				'new': true,
				'beforeremove': true,
				'afterremove': true,
				'beforesave': true,
				'aftersave': true,
				'storeload': true,
				'beforecancel': true,
				'aftercancel': true
			});

			_win.on('show', function () {
				this.fireEvent('winshow', this);
			});

			if (c._formFocus) {
				c._setFormFocus = Ext.bind(function () {
					var cmp = App.get(this._formFocus);

					if (cmp) {
						cmp.focus();
					};
				}, c);
			} else {
				c._setFormFocus = Ext.emptyFn;
			};

			var listeners = {};

			Ext.apply(listeners, c.listeners);

			var me = this;

			var _fnActivateTab = function (tabAtual) {
				tabAtual._grid.getView().refresh();
			};

			listeners.activate = Ext.bind(_fnActivateTab, this);

			this._tab.add({
				id: _id,
				title: c._tabName,
				items: [_panel],
				_searchItems: c._searchItems,
				_primaryKey: c._primaryKey,
				_foreignKey: c._foreignKey,
				_className: c._className,
				_foreignKeyExtra: c._foreignKeyExtra,
				_store: _store,
				_panel: _panel,
				_label: _label,
				_form: _form,
				_grid: _grid,
				_btn: _btn,
				_win: _win,
				_msgCodBase: this._msgCodBase,
				_msgCod: c._msgCod !== undefined ? c._msgCod : {},
				_formFocus: c._formFocus,
				_setFormFocus: c._setFormFocus,
				_disableEdit: c._disableEdit,
				_disableRemove: c._disableRemove,
				_disabledTabNew: c._disabledTabNew !== undefined ? c._disabledTabNew : false,
				_disabledTabNewMsg: c._disabledTabNewMsg ? c._disabledTabNewMsg : '',
				_autoLoad: c._autoLoad !== undefined ? c._autoLoad : true,
				listeners: listeners
			});
		};
	},
	_childLayout: function () {
		if (this._childApp.length == 0) {
			return false;
		};

		for (var i = 0; i < this._tab.items.items.length; i++) {
			this._tab.setActiveTab(i);

			Ext.bind(this.fnActivateTab, this._tab.items.items[i], [])();

			this._tab.items.items[i].doLayout();
		};

		this._tab.setActiveTab(0);
	},
	_fnFilter: function (tabId, btnHandler) {
		var _store = !tabId ? this._paging : this.get(tabId)._grid.store;
		var _grid = !tabId ? this._grid : this.get(tabId)._grid;
		var _searchItems = !tabId ? this._searchItems : this.get(tabId)._searchItems;
		var _filterParams = [];

		this._fnRecursive(_searchItems, function (cfg) {
			var c = this.get(cfg.id);
			var v = undefined;

			if (c && cfg.refId && c.getValue) {
				c.isSubmit = true;
				c.isSearch = true;

				if (v = c.getValue(true)) {
					if (c.plugins && c.plugins[0].viewMask == v) {
						return;
					};

					_filterParams.push({
						_ref: cfg.refId,
						_value: v.toString().toUpperCase()
					});
				};

				c.isSubmit = false;
				c.isSearch = false;
			};
		}, this);

		if (btnHandler) {
			this._hasFilter = true
		}

		this._filterParams = Ext.encode(_filterParams);

		if (_filterParams.length == 0) {
			if (this._hasFilter === true) {
				if (!tabId) {
					if (this._autoFilter || btnHandler) {
						_store.doRefresh();
					}
				} else {
					var params = {};

					params[this.get(tabId)._foreignKey] = this.get(this.get(tabId)._foreignKey).getValue();

					_store.load({
						params: params
					});
				};
			};

			this._hasFilter = false;

			return false;
		};

		this._hasFilter = true;

		if (!tabId) {
			if (this._autoFilter || btnHandler) {
				_store.moveFirst();
			}
		} else {
			var params = {};

			params[this.get(tabId)._foreignKey] = this.get(this.get(tabId)._foreignKey).getValue();
			params['_filterParams'] = this._filterParams;

			_store.load({
				params: params
			});
		};
	}
});