App = Ext.create('_Base.App', {
    id_incorporador_grupo: null,
    id_empreendimento: null,
    novaSenha: null,
    login: function (id_incorporador_grupo, id_empreendimento, novaSenha) {
        if (id_incorporador_grupo) {
            this.id_incorporador_grupo = id_incorporador_grupo;
        };

        if (id_empreendimento) {
            this.id_empreendimento = id_empreendimento;
        };

        if (novaSenha) {
            this.novaSenha = novaSenha;
        };

        var login = Ext.get('txtLogin').getValue();
        var senha = Ext.get('txtSenha').getValue();

        if (!login) {
            App.ALERT('Favor informar o login', '', function () {
                Ext.get('txtLogin').focus();
            });
            return false;
        };

        if (!senha) {
            App.ALERT('Favor informar a senha', '', function () {
                Ext.get('txtSenha').focus();
            });
            return false;
        };

        App.loading.show();

        Ext.Ajax.request({
            url: this.baseUrl + 'Login/Auth',
            method: 'POST',
            params: {
                login: login,
                senha: senha,
                novaSenha: this.novaSenha,
                id_incorporador_grupo: this.id_incorporador_grupo,
                id_empreendimento: this.id_empreendimento,
                ReturnUrl: Ext.Object.fromQueryString(window.location.search.substring(1)).ReturnUrl
            },
            success: function (form, action) {
                var r = Ext.decode(form.responseText);
               
                if (r.success && r.temIncorporadorGrupoDefault && !r.troca_senha_usuario_pessoa) {
                    window.location.href = r.url;
                } else {
                    if (r.mensagem) {
                        Ext.Msg.alert('', r.mensagem);
                    } else {
                        App.loading.close();

                        if (r.troca_senha_usuario_pessoa) {
                            App.window = Ext.create('Ext.Window', {
                                title: 'Autenticação - Troca de Senha',
                                layout: 'fit',
                                width: 350,
                                closable: false,
                                modal: true,
                                items: [
									{
									    xtype: 'form',
									    border: false,
									    items: [
											{
											    xtype: 'textfield',
											    id: 'nova-senha',
											    inputType: 'password',
											    width: 330,
											    labelWidth: 130,
											    labelSeparator: '',
											    labelAlign: 'right',
											    fieldLabel: 'Nova Senha',
											    minLength: 6,
											    allowBlank: false
											},
											{
											    xtype: 'textfield',
											    id: 'confirma-nova-senha',
											    inputType: 'password',
											    width: 330,
											    labelWidth: 130,
											    labelSeparator: '',
											    labelAlign: 'right',
											    fieldLabel: 'Confirma Nova Senha',
											    minLength: 6,
											    allowBlank: false
											}
										],
									    buttons: [
											{
											    xtype: 'button',
											    text: 'Confirmar',
											    handler: function () {
											        var ns = App.get('nova-senha');
											        var cns = App.get('confirma-nova-senha');

											        if (!ns.isValid()) {
											            return false;
											        };

											        if (!cns.isValid()) {
											            return false;
											        };

											        if (ns.getValue() != cns.getValue()) {
											            cns.markInvalid('As senhas são diferentes');
											            return false;
											        };

											        App.window.hide();
											        App.login(App.id_incorporador_grupo, App.id_empreendimento, cns.getValue());
											    }
											}
										]
									}
								]
                            });

                            App.window.show(undefined, function () {
                                Ext.Function.defer(function () {
                                    App.get('nova-senha').focus();
                                }, 500);
                            });
                        } else {
                            App.window = Ext.create('Ext.Window', {
                                title: 'Autenticação - Seleção de Incorporador e Empreendimento',
                                layout: 'fit',
                                width: 400,
                                border: false,
                                closable: false,
                                modal: true,
                                items: [
									{
									    xtype: 'form',
									    border: false,
									    items: [
											{
											    id: 'cmb_incorporador',
											    anchor: '100%',
											    xtype: 'combo',
											    emptyText: 'Selecione um Incorporador',
											    editable: false,
											    forceSelection: true,
											    store: Ext.create('Ext.data.Store', {
											        fields: ['id_incorporador_grupo', 'descricao_incorporador_grupo'],
											        data: r.lstIncorporador
											    }),
											    queryMode: 'local',
											    displayField: 'descricao_incorporador_grupo',
											    valueField: 'id_incorporador_grupo',
											    listeners: {
											        select: function (cmb, records) {
											            App.get('cmb_empreendimento').reset();

											            Ext.Ajax.request({
											                url: App.baseUrl + 'Login/ListaEmpreendimento',
											                method: 'POST',
											                params: {
											                    id_usuario_pessoa: r.id_usuario_pessoa,
											                    id_incorporador_grupo: records[0].data.id_incorporador_grupo
											                },
											                success: function (form, action) {
											                    App.get('cmb_empreendimento').store.loadData(Ext.decode(form.responseText));
											                }
											            });
											        }
											    }
											},
											{
											    id: 'cmb_empreendimento',
											    anchor: '100%',
											    xtype: 'combo',
											    emptyText: 'Selecione um Empreendimento',
											    editable: false,
											    forceSelection: true,
											    store: Ext.create('Ext.data.Store', {
											        fields: ['nome_empreendimento', 'id_empreendimento']
											    }),
											    queryMode: 'local',
											    displayField: 'nome_empreendimento',
											    valueField: 'id_empreendimento'
											}
										]
									}
								],
                                buttons: [
									{
									    xtype: 'button',
									    text: 'Entrar',
									    handler: function () {
									        var inc = App.get('cmb_incorporador').getValue();
									        var emp = App.get('cmb_empreendimento').getValue()

									        if (inc) {
									            App.login(inc, emp);
									        };
									    }
									},
									{
									    xtype: 'button',
									    text: 'Cancelar',
									    handler: function () {
									        App.id_incorporador_grupo = null;
									        App.id_empreendimento = null;
									        App.novaSenha = null;

									        App.window.hide();
									    }
									}
								]
                            });

                            App.window.show();
                        }
                    };
                };
            },
            failure: function (form, action) {
                Ext.Msg.alert('Erro', 'Erro de conex&atilde;o com o servidor');
            }
        });
    },
    _base: false,
    _initApp: function () {
        Ext.create('Ext.Button', {
            text: 'Acessar',
            renderTo: 'div-login',
            handler: function () {
                App.login();
            }
        });

        this.get('txtLogin').on('keyup', function (e) {
            if (e.getKey() == 13) {
                this.login();
            };
        }, this);

        this.get('txtSenha').on('keyup', function (e) {
            if (e.getKey() == 13) {
                this.login();
            };
        }, this);
    }
});

App.on('load', function () {
	this.get('txtLogin').focus();

	if (!(Ext.isGecko || Ext.isIE8 || Ext.isIE9 || Ext.isChrome)) {
		this.login = Ext.emptyFn;

		this.ALERT('Este navegador não está homologado para usar o sistema.', 'Atenção');
	};
});