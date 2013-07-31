/// <reference path="jquery/jquery-1.6.2.js" />

var objForm = function () {
    return {
        jqueryValidateRules: {},
        btnSalvarId: "",
        fnBlockTela: function () {
            $.blockUI({
                message: '<h1>Aguarde enviando o seus dados..</h1>'
            });
        },
        SomenteNumero: function (e) {
            var tecla = (window.event) ? event.keyCode : e.which;
            if ((tecla > 47 && tecla < 58)) return true;
            else {
                if (tecla == 8 || tecla == 0) return true;
                else return false;
            }
        },
        fnInitJQueryValidate: function () {
            $("#aspnetForm").validate({
                onsubmit: false,
                rules: this.jqueryValidateRules,
                ignore: ":hidden",
                errorPlacement: function (error, element) {
                    if (element.is("select")) {
                        error.insertAfter(element.parent("div.selector").get(0));
                    } else if (element.is("input[type=file]")) {
                        error.insertAfter(element.parent("div.uploader").get(0));
                    }
                    else {
                        error.insertAfter(element);
                    }
                }
            });

            $("#" + this.btnSalvarId).click(function (event) {
                if ($("#aspnetForm").valid()) {
                    objForm.fnBlockTela();
                } else {
                    $("#aspnetForm").validate().focusInvalid();

                    event.preventDefault();

                    $('#aspnetForm').find('select').each(function () {
                        var $this = $(this);
                        var id = $this.attr('id') + '-button';

                        if ($this.hasClass('required') && $this.val() == '') {
                            $('a#' + id).css('border', '1px solid red');
                        }
                        else {
                            $('a#' + id).css('border', '1px solid #D3D3D3');
                        }
                    });
                }
            });
        },
        fnMsgGenerica: function (msg, titulo) {
            $("#dialogMsg").html(msg);

            $("#dialog-modal").dialog({
                height: 140,
                modal: true,
                title: titulo,
                buttons: {
                    Ok: function () {
                        $(this).dialog("close");
                    }
                }
            });
        },
        abreJanelaModal: function (url) {
            $.fancybox({
                'padding': 0,
                'margin': 0,
                'autoScale': false,
                'showCloseButton': false,
                'hideOnOverlayClick': false,
                'enableEscapeButton': false,
                'centerOnScroll': true,
                'width': 720,
                'height': '95%',
                'href': url,
                'type': 'iframe'
            });
            return false;
        },
        fnDeleteDialog: function () {
            $('#dialogContentDelete').dialog({
                autoOpen: false,
                modal: true,
                bgiframe: true,
                draggable: false,
                resizable: false,
                title: "Confirmação de remoção",
                width: 300,
                height: 170
            });
        },
        fnOpenDeleteDialog: function (uniqueID) {
            $('#dialogContentDelete').dialog('option', 'buttons', {
                "Sim": function () {
                    __doPostBack(uniqueID, '');
                    $(this).dialog("close");
                },
                "Não": function () {
                    $(this).dialog("close");
                }
            });
            $('#dialogContentDelete').dialog('open');
            return false;
        },
        fnInitGenericMessage: function () {
            $('#dialogGenericMessage').dialog({
                autoOpen: false,
                modal: true,
                bgiframe: true,
                draggable: false,
                resizable: false
            });
        },
        Init: function () {
            $(document).ready(function () {
                // $('.uniform').find('input, select').uniform();
                $('.uniform').find('input').uniform();
                $('.uniform').find('select').selectmenu();
                objForm.fnDeleteDialog();
                objForm.fnInitGenericMessage();
                objForm.fnInitJQueryValidate();

                $('select.required').change(function () {
                    var $this = $(this);
                    var id = $this.attr('id') + '-button';

                    if ($this.hasClass('required') && $this.val() == '') {
                        $('a#' + id).css('border', '1px solid red');
                    }
                    else {
                        $('a#' + id).css('border', '1px solid #D3D3D3');
                    }
                });
            });
        },
        carregaConteudo: function (opcaoMenu, parametros, onComplete) {
            if ((onComplete != null))
                $('.corpoRight').load(opcaoMenu, parametros, onComplete);
            else
                if (parametros != null)
                    $('.corpoRight').load(opcaoMenu, parametros);
                else
                    $('.corpoRight').load(opcaoMenu);
        },
        carregaConteudo2: function (onUrl, onData, onBeforeSend, onCompleteTrue, onCompleteFalse) {
            //envia os dados por POST
            jQuery.ajax({
                type: 'POST',
                url: onUrl,
                data: onData,
                beforeSend: function () { onBeforeSend },
                dataType: 'html',
                success: function (data) {
                    //transforma a string retornada e transforma em um obj.
                    var e = eval("(" + data + ")");

                    switch (e.ok) {
                        case 'true':
                            onCompleteTrue
                            break;
                        case 'false':
                            onCompleteFalse
                            break;
                    } //fim switch
                } //fim fn success
            }); //fim POST .ajax
        },
        efeitoLoading: function (fn) {
            $("#loading").fadeIn(500, function () { });
            $("#loading").fadeOut(500, function () { fn });
        },
        //funçao que executa a pesquisa ao pressionar ENTER
        fnPressEnter: function (e, fn) {
            if (e.keyCode == 13) {
                fn();
                return false;
            }
        }
    };
} ();