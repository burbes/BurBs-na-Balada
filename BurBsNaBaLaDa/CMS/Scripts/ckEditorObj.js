var ckEditorObj = function(){
    return {
        initCKEditor: function () {
            $(document).ready(function(){
                var config = {};

                config.width = 682;
                config.height = 304;
                config.resize_enabled = false;
                config.HtmlEncodeOutput = true;
                config.toolbar = 'CustomAdmin';
                config.toolbar_CustomAdmin =
                        [
                    	    { name: 'clipboard', items: ['Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Undo', 'Redo'] },
                    	    { name: 'editing', items: ['Find', 'Replace', '-', 'SelectAll', '-', 'SpellChecker', 'Scayt'] },
                            { name: 'document', items: ['Source', '-', 'Preview'] }, { name: 'tools', items: ['Maximize', 'ShowBlocks'] },
                    	    { name: 'forms', items: ['Form', 'Checkbox', 'Radio', 'TextField', 'Textarea', 'Select', 'Button', 'ImageButton', 'HiddenField'] },
                    	    { name: 'insert', items: ['Image', 'Flash', 'Table', 'HorizontalRule', 'Smiley', 'SpecialChar', 'PageBreak', 'Iframe'] },
                            '/',
                    	    { name: 'basicstyles', items: ['Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', '-', 'RemoveFormat'] },
                    	    { name: 'paragraph', items: ['NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote', 'CreateDiv', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', '-', 'BidiLtr', 'BidiRtl'] },
                    	    { name: 'links', items: ['Link', 'Unlink', 'Anchor'] },

                    	    '/',
                    	    { name: 'styles', items: ['Styles', 'Format', 'Font', 'FontSize'] },
                    	    { name: 'colors', items: ['TextColor', 'BGColor'] }
                        ];

                /*Procura por todos os input textarea com a class transformInCKEDITOR e aplica as 
                configurações do CKEditor, transformando em editor de texto*/
                $(".transformInCKEDITOR").each(function (index, item) {
                    $(item).ckeditor(config);
                });            
            });
        },
        updateCKEditor: function () {
            /*Quando usa-se crtl+v o valor do input textarea que vai para o server não estava sendo atualizado
            **então no botão de submit pesquiso todas os editores CKEditor na página e forço a atualização do input
            **assim não dá erro de validação*/
            for (instance in CKEDITOR.instances) {
                CKEDITOR.instances[instance].updateElement();
            }
        }
    };
}();