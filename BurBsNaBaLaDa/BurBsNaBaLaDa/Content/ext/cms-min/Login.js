App=Ext.create("_Base.App",{id_incorporador_grupo_item:null,novaSenha:null,login:function(n,t){n&&(this.id_incorporador_grupo_item=n),t&&(this.novaSenha=t);var r=Ext.get("txtLogin").getValue(),i=Ext.get("txtSenha").getValue();if(!r)return App.ALERT("Favor informar o login","",function(){Ext.get("txtLogin").focus()}),!1;if(!i)return App.ALERT("Favor informar a senha","",function(){Ext.get("txtSenha").focus()}),!1;App.loading.show(),Ext.Ajax.request({url:this.baseUrl+"Login/Auth",method:"POST",params:{login:r,senha:i,novaSenha:this.novaSenha,id_incorporador_grupo_item:this.id_incorporador_grupo_item,ReturnUrl:Ext.Object.fromQueryString(window.location.search.substring(1)).ReturnUrl},success:function(n){var i=Ext.decode(n.responseText);i.success&&i.temIncorporadorDefault?window.location.href=i.url:i.mensagem?Ext.Msg.alert("",i.mensagem):(App.loading.close(),i.troca_senha_usuario_pessoa?(App.window=Ext.create("Ext.Window",{title:"Autentica&ccedil;&atilde;o - Troca de Senha",layout:"fit",width:350,closable:!1,modal:!0,items:[{xtype:"form",border:!1,items:[{xtype:"textfield",id:"nova-senha",inputType:"password",width:330,labelWidth:130,labelSeparator:"",labelAlign:"right",fieldLabel:"Nova Senha",minLength:6,allowBlank:!1},{xtype:"textfield",id:"confirma-nova-senha",inputType:"password",width:330,labelWidth:130,labelSeparator:"",labelAlign:"right",fieldLabel:"Confirma Nova Senha",minLength:6,allowBlank:!1}],buttons:[{xtype:"button",text:"Confirmar",handler:function(){var t=App.get("nova-senha"),n=App.get("confirma-nova-senha");if(!t.isValid()||!n.isValid())return!1;if(t.getValue()!=n.getValue())return n.markInvalid("As senhas s&atilde;o diferentes"),!1;App.window.hide(),App.login(App.id_incorporador_grupo_item,n.getValue())}}]}]}),App.window.show(undefined,function(){Ext.Function.defer(function(){App.get("nova-senha").focus()},500)})):(App.window=Ext.create("Ext.Window",{title:"Autentica&ccedil;&atilde;o - Sele&ccedil;&atilde;o de Empreendimento",layout:"fit",width:400,closable:!1,modal:!0,items:[{xtype:"combo",emptyText:"Selecione um Empreendimento",editable:!1,forceSelection:!0,store:Ext.create("Ext.data.Store",{fields:["nome_empreendimento","id_empreendimento","descricao_incorporador_grupo","id_incorporador_grupo","id_incorporador_grupo_item"],data:i.lstEmpree}),queryMode:"local",displayField:"nome_empreendimento",valueField:"id_incorporador_grupo_item",listConfig:Ext.Templates.ComboIncorporador,listeners:{select:function(n,t){App.window.hide(),App.login(t[0].data.id_incorporador_grupo_item)}}}]}),App.window.show()))},failure:function(){Ext.Msg.alert("Erro","Erro de conex&atilde;o com o servidor")}})},_base:!1,_initApp:function(){Ext.create("Ext.Button",{text:"Acessar",renderTo:"div-login",handler:function(){App.login()}});this.get("txtLogin").on("keyup",function(n){n.getKey()==13&&this.login()},this);this.get("txtSenha").on("keyup",function(n){n.getKey()==13&&this.login()},this)}});App.on("load",function(){this.get("txtLogin").focus(),Ext.isGecko||Ext.isIE8||Ext.isIE9||Ext.isChrome||(this.login=Ext.emptyFn,this.ALERT("Este navegador n\u00e3o est\u00e1 homologado para usar o sistema.","Aten\u00e7\u00e3o"))})