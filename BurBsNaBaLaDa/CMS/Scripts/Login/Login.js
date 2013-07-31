var objLogin = function () {
    return {
        fnShowMessage: function (message) {
            $(document).ready(function () {
                $("#dialogMessageLogin").html('');
                $("#dialogMessageLogin").html(message);
                $("#dialogLogin").attr("title", "Aviso!");
                $("#dialogLogin").dialog({
                    modal: true,
                    resizable: false,
                    buttons: {
                        Ok: function () {
                            $(this).dialog("close");
                        }
                    }
                });
            });
        },
        //função que verifica se o usuario realmente digitou o user e a senha
        fnValidaLogin: function () {
            var login = $('#txtLogin').val(); //EMAIL
            var senha = $('#txtSenha').val(); //SENHA
            var msgErro;

            if (login == "") {
                msgErro = "Insira um login.";
            } else {
                if (senha == "") {
                    msgErro = "Insira uma senha.";
                } else
                    return true;
            }

            objLogin.fnShowMessage(msgErro);
            return false;
        },
        //função que verifica se o usuario tem permissão de acesso
        fnAcessar: function () {
            jQuery('.paginaLogin_Loader').show();

            var login = $("#txtLogin").val();
            var senha = $("#txtSenha").val();

            //envia os dados por POST
            jQuery.ajax({
                type: 'POST',
                url: 'IdentificaUsuario',
                data: {
                    Login: login,
                    Senha: senha
                },
                beforeSend: function () {
                    //antes de enviar os dados, valida o formulario
                    if (objLogin.fnValidaLogin() == false)
                        return false;
                },
                dataType: 'html',
                success: function (data) {
                    //ESCONDE O "LOADER"
                    jQuery('.paginaLogin_Loader').hide()

                    //transforma a string retornada e transforma em um obj.
                    var e = eval("(" + data + ")");

                    switch (e.ok) {
                        case true:
                            //RETORNA P/ PAGINA INICIAL P/ GARANTIR QUE A SESSÃO FOI ABERTA
                            setTimeout("window.location = '../'", 500);
                            break;
                        case false:
                            var msgErro = "Usuário ou senha não encontrados.";

                            objLogin.fnShowMessage(msgErro);
                            break;
                        default:
                            var msgErro = "Erro!";

                            objLogin.fnShowMessage(msgErro);
                            break;
                    } //fim switch
                } //fim fn success
            }); //fim POST .ajax
        } //fim fnAcessar
    }; //fim return{}
} ();