Ext.Templates = {
	EspelhoVendaItemFAC: {
		loadingText: 'Carregando..',
		getInnerTpl: function () {
			return '<b>Unidade</b>: {numero_unidade_autonoma} - <b>Pavimento</b>: {numero_pavimento_unidade_autonoma}<br/>' +
				'<b>Bloco Urbano</b>: {descricao_bloco_urbano} - <b>Situação</b>: {descricao_situacao_unidade}<hr>';
		}
	},

	ComboIncorporador: {
		loadingText: 'Carregando..',
		getInnerTpl: function () {
			return '{nome_empreendimento}<br /><i>{descricao_incorporador_grupo}</i>';
		}
	},

	Agencia: {
		loadingText: 'Buscando...',
		emptyText: 'Nenhuma \"Agencia\" encontrada.',
		getInnerTpl: function () {
			return '<b>Nome </b>: {nome_agencia}.<br/><b>Endereço </b>:{endereco_agencia}<br/><b>Cidade </b>:{descricao_cidade}.<br/><b>Bairro </b>:{bairro_agencia}.<br/><b>Numero agência </b>:{numero_agencia}.<hr>';
		}
	},

	Pessoa: {
		loadingText: 'Buscando...',
		emptyText: 'Nenhuma \"Pessoa\" encontrada.',
		getInnerTpl: function () {
			return '<b>Nome</b>: {nome}.<br/>{cpfcnpj:formatCPFCNPJ}<br/><hr>';
		}
	},

	PessoaLiberacao: {
		loadingText: 'Buscando...',
		emptyText: 'Nenhuma \"Pessoa\" encontrada.',
		getInnerTpl: function () {
			return '<b>Nome</b>: {nome_pessoa_fisica}.<br/>{cpf_pessoa_fisica:formatCPFCNPJ}<br/><hr>';
		}
	},

	Incorporador2: {
		loadingText: 'Buscando...',
		emptyText: 'Nenhum \"Incorporador\" encontrado.',
		getInnerTpl: function () {
			return '<b>Nome</b>:{descricao_incorporador_grupo}';
		}
	},

	Pessoa_Razao_Social: {
		loadingText: 'Buscando...',
		emptyText: 'Nenhuma \"Pessoa\" encontrada.',
		getInnerTpl: function () {
			return '<b>Razão Social</b>: {razao_social}.<br/>{cpfcnpj:formatCPFCNPJ}<br/><hr>';
		}
	},

	Naturalidade: {
		loadingText: 'Buscando...',
		getInnerTpl: function () {
			return '{sigla_estado} - {descricao_cidade}';
		}
	},

	Empreendimento: {
		loadingText: 'Buscando...',
		emptyText: 'Nenhum \"Empreendimento\" encontrado.',
		getInnerTpl: function () {
			return '<b>Empreendimento</b>: {nome_empreendimento}. <br/><b>Cidade: </b>{descricao_cidade}<b> - </b>{sigla_estado}<hr>';
		}
	},

	EmpreendimentoPessoaJuridica: {
		loadingText: 'Buscando...',
		emptyText: 'Nenhum \"Empreendimento\" encontrado.',
		getInnerTpl: function () {
			return '<b>Empreendimento</b>: {nome_empreendimento}. <br/>{cnpj_pessoa_juridica:formatCPFCNPJ}<br/><hr>';
		}
	},

	Atendimento: {
		loadingText: 'Buscando...',
		emptyText: 'Nenhum \"Atendimento\" encontrado.',
		getInnerTpl: function () {
			return '<b>Unidade</b>: {numero_unidade_autonoma} - <b>De:</b> {data_inicio_atendimento_cliente_item} <b>Até:</b> {data_fim_atendimento_cliente_item}<br/><hr>';
		}
	},

	Incorporador: {
		loadingText: 'Buscando...',
		emptyText: 'Nenhum \"Incorporador\" encontrado.',
		getInnerTpl: function () {
			return '<b>Incorporador</b>: {nome_fantasia_pessoa_juridica}.<br/>{cnpj_pessoa_juridica:formatCPFCNPJ}<br/><hr>';
		}
	},

	TipoReserva: {
		loadingText: 'Buscando...',
		emptyText: 'Nenhum \"Incorporador\" encontrado.',
		getInnerTpl: function () {
			return '<b>Numero</b>: {numero_unidade_autonoma}.<br/><b>Tipo Reserva:</b>{descricao_situacao_unidade}<br/><hr>';
		}
	},

	EmpresaVenda: {
		loadingText: 'Buscando...',
		emptyText: 'Nenhuma \"Empresa de Venda\" encontrada.',
		getInnerTpl: function () {
			return '<b>Nome</b>: {nome}.<br/>{cpfcnpj:formatCPFCNPJ}<br/><hr>';
		}
	},

	DocumentoExtensao: {
		loadingText: 'Buscando...',
		emptyText: 'Nenhuma \"Extensão de Documento\" encontrada.',
		getInnerTpl: function () {
			return '<b>Extensão</b>: {descricao_documento_extensao}<hr>';
		}
	},

	DocumentoStatus: {
		loadingText: 'Buscando...',
		emptyText: 'Nenhuma \"Status de Documento\" encontrada.',
		getInnerTpl: function () {
			return '<b>Status</b>: {descricao_documento_status}<hr>';
		}
	},

	Evento: {
		loadingText: 'Buscando...',
		emptyText: 'Nenhum \" Evento \" encontrado.',
		getInnerTpl: function () {
			return '<b>Evento</b>: {descricao_evento} - {data_cadastro_checklist}<hr>';
		}
	},

	EventoSolicitacaoSerasa: {
		loadingText: 'Buscando...',
		emptyText: 'Nenhum \" Evento \" encontrado.',
		getInnerTpl: function () {
			return '<b>Evento</b>:{id_checklist} - {descricao_evento} - {data_cadastro_checklist}<hr>';
		}
	},

	DocumentoSubcategoria: {
		loadingText: 'Buscando...',
		emptyText: 'Nenhuma \"Subcategoria de Documento\" encontrada.',
		getInnerTpl: function () {
			return '<b>Subcategoria</b>: {descricao_documento_subcategoria}<hr>';
		}
	},

	Banco: {
		loadingText: 'Buscando...',
		emptyText: 'Nenhum \"Banco\" encontrado.',
		getInnerTpl: function () {
			return '<b>Banco</b>: {nome_banco}<hr>';
		}
	},

	TabelaVenda: {
		loadingText: 'Buscando...',
		emptyText: 'Nenhuma \"Tabela de Venda\" encontrada.',
		getInnerTpl: function () {
			return '<b>Tabela</b>: {descricao_tabela_venda}<hr>';
		}
	},

	TipoLog: {
		loadingText: 'Buscando...',
		emptyText: 'Nenhuma \"Tipo de Log\" encontrada.',
		getInnerTpl: function () {
			return '<b>Descrição: </b>: {descricao_tipo_log_contrato}<br> <b>Tipo Log: </b>{descricao_tipo_log} <hr>';
		}
	},

	UsuarioPessoa: {
		loadingText: 'Buscando...',
		emptyText: 'Nenhuma \"Usuario Pessoa\" encontrada.',
		getInnerTpl: function () {
			return '<b>Nome: </b>: {nome_usuario_pessoa}<br> <b>E-mail: </b>{login_usuario_pessoa} <hr>';
		}
	}
};
