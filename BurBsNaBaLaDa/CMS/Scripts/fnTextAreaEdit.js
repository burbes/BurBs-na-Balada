
jQuery.validator.addMethod("brDate", function (value, element) {
    return Date.parseExact(value, "dd/MM/yyyy");
}, "Por favor insira uma data válida no formato dd/mm/aaaa");

var obj = function () {
    return {
        initCKEditor: function () {            
            
            var config = {};
                        
            config.toolbar = 'CustomAdmin';
            config.width = 682;
            config.height = 304;
            config.resize_enabled = false;
            config.toolbar_CustomAdmin =
            [
            ['Preview', '-', 'Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord'],
            ['Undo', 'Redo', '-', 'Find', 'Replace', '-', 'SelectAll', 'RemoveFormat', '-', 'Link', 'Unlink', 'Anchor', 'Image', 'Flash', 'Table', 'HorizontalRule', 'SpecialChar', 'PageBreak'],
            '/',
            ['Bold', 'Italic', 'Underline', 'Strike', '-', 'Subscript', 'Superscript'],
            ['NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', 'Blockquote'],
            ['JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', '-', 'TextColor', 'BGColor'],
            '/',
            ['Styles', 'Format', 'Font', 'FontSize', '-', 'Source'], '/'
            ];

            /*Procura por todos os input textarea com a class transformInCKEDITOR e aplica as 
                    configurações do CKEditor, transformando em editor de texto*/
            $(".transformInCKEDITOR").each(function (index, item) {
                $(item).ckeditor(config);
            });
        },
        updateCKEditor: function () {
            /*Quando usa-se crtl+v o valor do input textarea que vai para o server não estava sendo atualizado
                    **então no botão de submit pesquiso todas os editores CKEditor na página e forço a atualização do input
                    **assim não dá erro de validação*/
            for (instance in CKEDITOR.instances) {
                CKEDITOR.instances[instance].updateElement();
            }
        },
        fnInitJQueryValidate: function () {
            $("#aspnetForm").validate({
                //focusCleanup:true,
                rules: {
                    '<%=txtData.UniqueID%>': {
                        brDate: true
                    },
                    '<%=txtTitulo.UniqueID%>': {
                        required: true
                    },
                    '<%=ddlStatus.UniqueID %>': {
                        required: true
                    },
                    '<%=txtTexto.UniqueID%>': {
                        required: true
                    },
                    '<%=fuArqRegulamento.UniqueID %>': {
                        accept: "doc|docx|pdf"
                    }
                }
            });
        },
        fnShowError: function (msg) {
            $("#dialogMessageCadastro").html('');
            $("#dialogMessageCadastro").html(msg);
            $("#dialogCadastro").attr("title", "ERRO!");
            $("#dialogCadastro").dialog({
                modal: true,
                resizable: false,
                buttons: {
                    Ok: function () {
                        $(this).dialog("close");
                    }
                }
            });
        },
        fnShowSuccess: function (msg) {
            $("#dialogMessageCadastro").html('');
            $("#dialogMessageCadastro").html(msg);
            $("#dialogCadastro").attr("title", "Cadastrado realizado com sucesso!");
            $("#dialogCadastro").dialog({
                modal: true,
                resizable: false,
                buttons: {
                    Ok: function () {
                        //$(this).dialog("close");
                        window.parent.$.fancybox.close();
                        window.parent.location.reload();
                    }
                }
            });
        }
    };
} ();
jQuery(document).ready(function () {
alert("N"); 
    obj.initCKEditor();
//    obj.fnInitJQueryValidate();
//    $("#<%=txtData.ClientID%>").datepick({
//        showTrigger: '#imgData', 
//        onSelect: function (dates) {
//            $("#<%=txtData.ClientID%>").valid();
//        }
//    });
});
