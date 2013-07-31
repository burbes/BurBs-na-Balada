<html>
    <head>
        <!-- INCLUDES API CKEDITOR -->
        <script type="text/javascript" src="../ckeditor.js"></script>
        <!-- FIM INCLUDES CKEDITOR-->

    </head>
    <body>
        <div id="dialogContentDelete" style="display: none;">
            <h3>Excluir registro?</h3>
            <p>Deseja realmente excluir este registro?</p>
        </div>
        <div id="dialogGenericMessage" style="display: none;">
            <p>
                <span id="dialogGenericMessageInner"></span>
            </p>
        </div>
        <div class="paginaFormulario">
            <div class="paginaFormulario_titulo">
                <h1>Cadastro de Canais</h1>
            </div>
            <div class="form uniform">
                <div class="field">                              
                    <label Class="label" ID="lblTituloMenu">T&iacute;tulo</label><br>
                    <input type="text" ID="txtTituloMenu"  class="medium" MaxLength="200"/>      
                </div>
                <div class="field">          
                    <label Class="label" ID="lblUrl">URL</label><br>
                    <input type="text" ID="txtUrl"  class="medium" MaxLength="200" value="http://"/>
                </div>
                <div class="field">
                    <label class="label"><input type="checkbox" style="" id="ddlNovaJanela"/></label>
                    <label class="label" ID="lblNovaJanela">Abrir URL em nova janela/aba</label>
                    <div class="field">
                        <label ID="lblOrdemMenu"  class="label" >Ordem</label><br>
                        <input type="text" ID="txtOrdemMenu"  class="medium order" />                        
                    </div>

                    <div class="field">
                        <label class="label"><input type="checkbox" style="" id="ddlStatus"/></label>
                        <label class="label" ID="chkStatus">Ativo</label>
                    </div>
                    <div style="clear: both"></div>
                    <div class="field">
                        <label ID="lblTexto"  class="label" >Texto</label>
                        <div class="wrapCKEditorForm">
                            <textarea class="ckeditor" cols="80" id="editor1" name="editor1" rows="10">&lt;p&gt;This is some &lt;strong&gt;sample text&lt;/strong&gt;. You are using &lt;a href="http://ckeditor.com/"&gt;CKEditor&lt;/a&gt;.&lt;/p&gt;</textarea>
                        </div>
                    </div>
                    <div class="paginaFormulario_wrapBotoes">
                        <img ID="btnSalvar"   src="../Content/Images/bgBtnSalvar.png"   class="paginaFormulario_btnSalvar" onclick="//btnSalvar_Click" />
                        <img ID="btnCancelar" src="../Content/Images/bgBtnCancelar.png" class="paginaFormulario_btnCancelar" onclick="//btnCancelar_Click"    />
                    </div>
                </div>
            </div>
    </body>
</html>