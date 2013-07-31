Ext.util.Format.renderBoolean = function (v)
{
	return (v === true || v === 'true' || v === '1' || v === 'S' || v === 1) ? 'SIM' : 'NÃO';
};

Ext.util.Format.tooltip = function (v)
{
	if (v)
	{
		return '<span data-qtip="' + v + '">' + v + '</span>';
	} else
	{
		return '';
	}
};

Ext.util.Format.formatCPFCNPJ = function (v)
{
	if (!v)
	{
		return '';
	};

	if (v.toString().length == 11)
	{
		return "<b>CPF</b>: " + v.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, '$1.$2.$3-$4');
	} else
	{
		return "<b>CNPJ</b>: " + v.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g, '$1.$2.$3/$4-$5');
	};
};

Ext.util.Format.ApplyMask = function (value, mask)
{
	var sMask = mask;

	if (!sMask || !value)
	{
		return value;
	};

	var pReplace = '';
	var pattern = '';
	var arr = Ext.Array.toArray((new CMS.mask(sMask)).specialChars);

	var count = 0;

	for (var i = 0; i < arr.length; i++)
	{
		var item = arr[i];

		var index = sMask.indexOf(item);
		sMask = sMask.replace(sMask.substring(0, index + 1), '');
		if (index == 0)
		{
			pReplace += item;
		}
		else
		{
			pattern += '(.{' + index + '})';
			pReplace += '$' + (++count) + item;
		};
	}

	if (sMask)
	{
		pattern += '(.{' + sMask.length + '})';
		pReplace += '$' + (++count);
	};

	return value.replace(new RegExp(pattern), pReplace);
};

Ext.util.Format.RenderMask_MeioComunicacao = function (value, metaData, record)
{
	return Ext.util.Format.ApplyMask(value, record.data.mascara_tipo_meio_comunicacao);
};

Ext.util.Format.renderFnDate = function (value, format)
{
	if (value && typeof value == 'string')
	{
		var dt = value.split('/');

		if (dt.length == 3)
		{
			var ano = parseFloat(dt[2]);
			var mes = parseFloat(dt[1]) + 1;
			var dia = parseFloat(dt[0]);

			value = new Date(ano, mes, dia);
		};
	};

	return Ext.util.Format.dateRenderer(format)(value);
};

Ext.util.ValidaCNPJ = function valida_cnpj(obj)
{

	numero = obj.getValue();

	if (numero == '')
	{
		return;
	}

	var numero;
	var situacao = '';
	s = numero.replace(new RegExp('(.{2})\.(.{3})\.(.{3})\/(.{4})\-(.{2})'), '$1$2$3$4$5');

	c = s.substr(0, 12);
	var dv = s.substr(12, 2);
	var d1 = 0;

	for (var i = 0; i < 12; i++)
	{
		d1 += c.charAt(11 - i) * (2 + (i % 8));
	}

	if (d1 == 0)
	{
		var result = "falso";
	}
	d1 = 11 - (d1 % 11);

	if (d1 > 9) d1 = 0;

	if (dv.charAt(0) != d1)
	{
		var result = "falso";
	}

	d1 *= 2;
	for (var i = 0; i < 12; i++)
	{
		d1 += c.charAt(11 - i) * (2 + ((i + 1) % 8));
	}

	d1 = 11 - (d1 % 11);
	if (d1 > 9) d1 = 0;

	if (dv.charAt(1) != d1)
	{
		var result = "falso";
	}

	if (result == "falso")
	{
		App.ALERT("CNPJ Inválido. Informe o CNPJ corretamente", "Atenção");
		obj.setValue("");
		return false;
	}
	return true;
}

/* MODAL DA WINDOW */
Ext.override(Ext.ZIndexManager, {
	_showModalMask: function (comp)
	{
		var zIndex = comp.el.getStyle('zIndex') - 4,
						maskTarget = comp.floatParent ? comp.floatParent.getTargetEl() : Ext.get(comp.getEl().dom.parentNode),
						parentBox;

		if (!maskTarget)
		{
			return;
		}

		parentBox = maskTarget.getBox();

		if (!this.mask)
		{
			this.mask = Ext.getBody().createChild({
				cls: Ext.baseCSSPrefix + 'mask'
			});
			this.mask.setVisibilityMode(Ext.Element.DISPLAY);
			this.mask.on('click', this._onMaskClick, this);
		}
		if (maskTarget.dom === document.body)
		{
			parentBox.height = Ext.Element.getViewHeight(true); /*MUDOU APENAS O 'TRUE'*/
		}
		maskTarget.addCls(Ext.baseCSSPrefix + 'body-masked');
		this.mask.setBox(parentBox);
		this.mask.setStyle('zIndex', zIndex);
		this.mask.show();
	}
});

Ext.util.ValidarCPF = function (obj)
{
	var cpf = obj.getValue();
	if (cpf.toString() == "")
	{
		return true;
	}
	var cpfvalido = true;
	cpf = cpf.toString().replace(".", "").replace(".", "").replace("-", "");

	switch (cpf)
	{
		case "11111111111":
			cpfvalido = false;
			break
		case "22222222222":
			cpfvalido = false;
			break
		case "33333333333":
			cpfvalido = false;
			break
		case "33333333333":
			cpfvalido = false;
			break
		case "44444444444":
			cpfvalido = false;
			break
		case "55555555555":
			cpfvalido = false;
			break
		case "66666666666":
			cpfvalido = false;
			break
		case "77777777777":
			cpfvalido = false;
			break
		case "88888888888":
			cpfvalido = false;
			break
		case "99999999999":
			cpfvalido = false;
		case "00000000000":
			cpfvalido = false;
			break
		case '___________':
			cpfvalido = true;
			break
		default:
			{
				var digitoDigitado = eval(cpf.charAt(9) + cpf.charAt(10));
				var soma1 = 0, soma2 = 0;
				var vlr = 11;
				for (i = 0; i < 9; i++)
				{
					soma1 += eval(cpf.charAt(i) * (vlr - 1));
					soma2 += eval(cpf.charAt(i) * vlr);
					vlr--;
				}
				soma1 = (((soma1 * 10) % 11) == 10 ? 0 : ((soma1 * 10) % 11));
				soma2 = (((soma2 + (2 * soma1)) * 10) % 11);

				var digitoGerado = (soma1 * 10) + soma2;

				if (digitoGerado != digitoDigitado)
				{
					cpfvalido = false;
				}
			}
			break;
	}

	if (!cpfvalido)
	{
		App.ALERT("CPF Invalido.Informe o cpf correto", "Atenção");
		obj.setValue("");
		return false;
	}
	return true;
}

String.prototype.ToDecimal = function (n)
{
	var valor = this.replace('.', '').replace(',', '.').replace('R$ ', '')

	if (valor == '')
	{
		valor = '0'
	}

	valor = parseFloat(valor)

	if (n != undefined)
	{
		valor = parseFloat(valor.toFixed(n))
	}

	return valor
}

String.prototype.FormatDecimal = function (n, decimal, milhar)
{
	decimal = decimal || ','
	milhar = milhar || '.'

	var valor = this.ToDecimal().toFixed(n)
	var negativo = valor.indexOf('-') != -1 ? true : false

	var numeros = valor.replace('-', '').split('.')
	valor = ''

	for (var i = numeros[0].length; i >= 1; i--)
	{
		valor = numeros[0].charAt(i - 1) + valor

		if ((numeros[0].length - i + 1) % 3 == 0 && i > 1)
		{
			valor = milhar + valor
		}
	}

	if (numeros[1] != undefined)
	{
		valor += decimal + numeros[1]
	}

	if (negativo)
	{
		valor = '-' + valor
	}

	return valor
}

Number.prototype.FormatDecimal = function (n, decimal, milhar)
{
	return this.toString().replace('.', ',').FormatDecimal(n, decimal, milhar)
}

String.prototype.ToDate = function ()
{
	var strData = this.split('/')

	return new Date(parseFloat(strData[2]), parseFloat(strData[1]) - 1, parseFloat(strData[0]))
}

String.prototype.toDecimal = function ()
{
	var v = this.toString();

	if (!v)
		return null;

	while (v.indexOf('.') != -1)
	{
		v = v.replace('.', '');
	};

	return parseFloat(v.replace(',', '.'));
};

Number.prototype.toDecimalString = function ()
{
	var v = this.toString();

	if (!v)
		return null;

	return v.replace('.', ',');
};

Ext.define('Ext.ux.SimpleIFrame', {
	extend: 'Ext.Panel',
	alias: 'widget.simpleiframe',
	src: 'about:blank',
	loadingText: 'Loading ...',
	initComponent: function ()
	{
		this.updateHTML();
		this.callParent(arguments);
	},
	updateHTML: function ()
	{
		this.html = '<iframe id="iframe-' + this.id + '"' +
        ' style="overflow:auto;width:100%;height:100%;"' +
        ' frameborder="0" ' +
        ' src="' + this.src + '"' +
        '></iframe>';
	},
	reload: function ()
	{
		this.setSrc(this.src);
	},
	reset: function ()
	{
		var iframe = this.getDOM();
		var iframeParent = iframe.parentNode;
		if (iframe && iframeParent)
		{
			iframe.src = 'about:blank';
			iframe.parentNode.removeChild(iframe);
		}

		iframe = document.createElement('iframe');
		iframe.frameBorder = 0;
		iframe.src = this.src;
		iframe.id = 'iframe-' + this.id;
		iframe.style.overflow = 'auto';
		iframe.style.width = '100%';
		iframe.style.height = '100%';
		iframeParent.appendChild(iframe);
	},
	setSrc: function (src, loadingText)
	{
		this.src = src;
		var iframe = this.getDOM();
		if (iframe)
		{
			iframe.src = src;
		}
	},
	getSrc: function ()
	{
		return this.src;
	},
	getDOM: function ()
	{
		return document.getElementById('iframe-' + this.id);
	},
	getDocument: function ()
	{
		var iframe = this.getDOM();
		iframe = (iframe.contentWindow) ? iframe.contentWindow : (iframe.contentDocument.document) ? iframe.contentDocument.document : iframe.contentDocument;
		return iframe.document;
	},
	destroy: function ()
	{
		var iframe = this.getDOM();
		if (iframe && iframe.parentNode)
		{
			iframe.src = 'about:blank';
			iframe.parentNode.removeChild(iframe);
		}
		this.callParent(arguments);
	},
	update: function (content)
	{
		this.setSrc('about:blank');
		try
		{
			var doc = this.getDocument();
			doc.open();
			doc.write(content);
			doc.close();
		} catch (err)
		{
			// reset if any permission issues
			this.reset();
			var doc = this.getDocument();
			doc.open();
			doc.write(content);
			doc.close();
		}
	}
});