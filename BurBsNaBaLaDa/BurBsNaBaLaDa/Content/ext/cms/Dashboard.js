App = Ext.create('_Base.App', {
	_disableValueSession: _ocultaMenu,
	_base: false,
	_initApp: function () {
		var cfg = {
			border: false,
			renderTo: 'div-main'
		};

		if (!_ocultaMenu) {
			cfg.buttons = [
				{
					xtype: 'button',
					text: 'Ver todos os incorporadores',
					handler: function () {
						window.open(App.baseUrl + 'Dashboard?ocultaMenu=true&ignoraIncorporador=true', 'Dashboard', 'menubar=no,status=no,titlebar=no,toolbar=no,scrollbars=yes');
					}
				}
			];
		};

		this.form = Ext.create('Ext.Panel', cfg);

	}
});

App.on('load', function () {
	//fnAddFilters();

	fnFACChart();

	fnLoadCharts();
});

var fnAddFilters = function () {
	var frm = {
		xtype: 'form',
		border: false,
		fieldDefaults: {
			padding: '5px',
			labelAlign: 'top',
			labelSeparator: ''
		},
		items: [
			{
				xtype: 'container',
				layout: 'hbox',
				items: [
					{
						id: 'dtInicio',
						xtype: 'datefield',
						fieldLabel: 'Data Início',
						width: 100
					},
					{
						id: 'hrInicio',
						xtype: 'textfield',
						mask: '99:99',
						fieldLabel: 'Hora Início',
						width: 70
					},
					{
						id: 'dtFim',
						xtype: 'datefield',
						fieldLabel: 'Data Fim',
						width: 100
					},
					{
						id: 'hrFim',
						xtype: 'textfield',
						mask: '99:99',
						fieldLabel: 'Hora Fim',
						width: 70
					},
					{
						xtype: 'button',
						text: 'Filtrar',
						style: 'margin-top:26px;',
						handler: function () {
							var ids = ['dtInicio', 'hrInicio', 'dtFim', 'hrFim'];

							for (var id in ids) {
								App.query.set(ids[id], App.get(ids[id]).getValue());
							};

							var url = App.query.get();

							if (url) {
								window.location.href = App.baseUrl + 'Dashboard' + url;
							} else {
								App.ALERT('Preencha os filtros.');
							};
						}
					}
				]
			}
		]
	};

	App._handlerItems(frm.items);

	App.form.add(frm);
};

var fnFACChart = function () {
	var nomeModel = 'FACChat';

	var model = Ext.define(nomeModel, {
		extend: 'Ext.data.Model',
		fields: [
			{ name: 'nome_empreendimento' },
			{ name: 'quantidade', type: 'int' },
			{ name: 'porcentagem', type: 'decimal' }
		],
		proxy: {
			type: 'ajax',
			url: ''
		}
	});

	var store = Ext.create('Ext.data.Store', {
		model: nomeModel
	});

	store.loadData(_fnFACChart);

	var grid = Ext.create('Ext.grid.Panel', {
		title: 'Quantidade de Atendimento ao Cliente (FAC) por Empreendimento',
		store: store,
		enableColumnHide: false,
		enableColumnMove: false,
		enableColumnResize: false,
		columns: [
            {
            	dataIndex: 'nome_empreendimento',
            	text: 'Nome Empreendimento',
            	flex: 1
            },
            {
            	dataIndex: 'quantidade',
            	text: 'Quantidade',
            	align: 'right',
            	width: 100
            },
            {
            	dataIndex: 'porcentagem',
            	text: 'Porcentagem',
            	align: 'right',
            	width: 100,
            	renderer: function (v) {
            		return v + ' %';
            	}
            }
        ]
	});

	App.form.add({
		xtype: 'form',
		border: false,
		items: [
			grid
		]
	});

	App.form.add({ xtype: 'label', html: '<br/>' });
};

var fnLoadCharts = function () {
	for (var i = 0; i < _chart.chartDetalhe.length; i++) {
		var detalhe = _chart.chartDetalhe[i];

		var id = detalhe.id_empreendimento;
		var nome_empreendimento = detalhe.nome_empreendimento;
		var incorporador = detalhe.descricao_incorporador_grupo;
		var fac = detalhe.qtd_fac;
		var proposta = detalhe.qtd_proposta;
		var contrato = detalhe.qtd_contrato;

		var data = _chart.lstChartEspelhoVendaUnidade[i];
		var cores = [];

		for (var j = 0; j < data.length; j++) {
			cores.push('#' + data[j].hexadecimal_cor);
		};

		var pizza = getChartPizza(id + 'A', data, cores);

		var data2 = [];

		data2.push({ desc: 'FAC', total: fac });
		data2.push({ desc: 'PROPOSTA', total: proposta });
		data2.push({ desc: 'CONTRATO', total: contrato });

		var bar = getChartBar(id + 'B', data2, fac);

		App.form.add({
			xtype: 'form',
			title: incorporador + ' - ' + nome_empreendimento,
			items: [
				pizza,
				bar
			]
		});

		App.form.add({ xtype: 'label', html: '<br/>' });
	};
};

var getChartPizza = function (id, data, cores) {
	var storeId = 'store-' + id;
	var chartId = 'chart-' + id;
	var modelName = 'model-' + id;

	var model = Ext.define(modelName, {
		extend: 'Ext.data.Model',
		modelName: modelName,
		fields: ['descricao_situacao_unidade', 'total'],
		proxy: {
			type: 'ajax',
			url: ''
		}
	});

	var store = window[storeId] = Ext.create('Ext.data.Store', {
		model: modelName
	});

	store.loadData(data);

	return Ext.create('Ext.chart.Chart', {
		id: chartId,
		width: 600,
		height: 400,
		store: store,
		animate: true,
		legend: {
			position: 'right'
		},
		series: [
			{
				type: 'pie',
				angleField: 'total',
				showInLegend: true,
				colorSet: cores,
				tips: {
					trackMouse: true,
					width: 180,
					renderer: function (storeItem, item) {
						var total = 0;

						window[storeId].each(function (rec) {
							total += rec.get('total');
						});

						this.setTitle(storeItem.get('descricao_situacao_unidade') + ': ' + storeItem.get('total') + ' de ' + total + ' (' + Math.round(storeItem.get('total') / total * 100) + '%)');
					}
				},
				highlight: {
					segment: {
						margin: 10
					}
				},
				label: {
					field: 'descricao_situacao_unidade',
					display: 'rotate',
					contrast: true
				}
			}
		]
	});
};

var getChartBar = function (id, data, max) {
	var storeId = 'store-' + id;
	var chartId = 'chart-' + id;
	var modelName = 'model-' + id;

	var model = Ext.define(modelName, {
		extend: 'Ext.data.Model',
		modelName: modelName,
		fields: ['desc', 'total'],
		proxy: {
			type: 'ajax',
			url: ''
		}
	});

	var store = window[storeId] = Ext.create('Ext.data.Store', {
		model: modelName
	});

	store.loadData(data);

	return Ext.create('Ext.chart.Chart', {
		xtype: 'chart',
		animate: true,
		shadow: true,
		width: 260,
		height: 320,
		store: store,
		axes: [
			{
				type: 'Numeric',
				position: 'left',
				fields: ['total'],
				grid: true,
				minimum: 0,
				maximum: (max + 10)
			},
			{
				type: 'Category',
				position: 'bottom',
				fields: ['desc'],
				label: {
					rotate: {
						degrees: 270
					}
				}
			}
		],
		series: [
			{
				type: 'column',
				axis: 'left',
				xField: 'desc',
				yField: ['total'],
				tips: {
					trackMouse: true,
					width: 110,
					renderer: function (storeItem, item) {
						this.setTitle(storeItem.get('desc') + ' ' + storeItem.get('total'));
					}
				},
				style: {
					fill: '#006699'
				}
			}
		]
	});
};